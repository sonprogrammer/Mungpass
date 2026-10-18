import { it, describe, beforeEach, expect, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
    getUser: vi.fn(),
    from: vi.fn(),
    select: vi.fn(),
    eq: vi.fn(),
    maybeSingle: vi.fn(),
    redirect: vi.fn()
}))


vi.mock('server-only', () => ({}))
vi.mock('@/shared/api/supabase/server', () => ({
    supabaseServer: vi.fn(async () => ({
        auth: { getUser: mocks.getUser },
        from: mocks.from
    }))
}))
vi.mock('next/navigation', () => ({
    redirect: mocks.redirect
}))

import { requireRole } from './requireRole'

type Role = 'user' | 'owner' | 'admin'

const user = { id: 'user-1' }
const redirectError = new Error('TEST_REDIRECT')

describe('requireRole', () => {
    beforeEach(() => {
        vi.resetAllMocks()
        mocks.getUser.mockResolvedValue({
            data: { user },
            error: null
        })
        mocks.from.mockReturnValue({ select: mocks.select })
        mocks.select.mockReturnValue({ eq: mocks.eq })
        mocks.eq.mockReturnValue({ maybeSingle: mocks.maybeSingle })
        mocks.maybeSingle.mockResolvedValue({
            data: { id: user.id, role: 'user' },
            error: null
        })
        mocks.redirect.mockImplementation(() => {
            throw redirectError
        })
    })

    it('비로그인 사용자는 로그인 화면으로 이동한다', async () => {
        mocks.getUser.mockResolvedValue({
            data: { user: null },
            error: null
        })

        await expect(requireRole('user')).rejects.toBe(redirectError)
        expect(mocks.redirect).toHaveBeenCalledExactlyOnceWith('/')
        expect(mocks.from).not.toHaveBeenCalled()
    })

    it('인증 오류가 발생하면 로그인 화면으로 이동한다', async () => {
        mocks.getUser.mockResolvedValue({
            data: { user: null },
            error: new Error('인증 실패')
        })

        await expect(requireRole('owner')).rejects.toBe(redirectError)
        expect(mocks.redirect).toHaveBeenCalledExactlyOnceWith('/')
        expect(mocks.from).not.toHaveBeenCalled()
    })

    it('인증된 사용자 ID로 역할을 조회한다', async () => {
        await requireRole('user')

        expect(mocks.eq).toHaveBeenCalledWith('id', user.id)
    })

    it('프로필이 없으면 로그인 화면으로 이동한다', async () => {
        mocks.maybeSingle.mockResolvedValue({
            data: null,
            error: null
        })

        await expect(requireRole('user')).rejects.toBe(redirectError)
        expect(mocks.redirect).toHaveBeenCalledExactlyOnceWith('/')
    })

    it.each([null, 'unknown'])('유효하지 않은 역할 %s는 접근을 허용하지 않는다', async role => {
        mocks.maybeSingle.mockResolvedValue({
            data: { id: user.id, role },
            error: null
        })

        await expect(requireRole('user')).rejects.toBe(redirectError)
        expect(mocks.redirect).toHaveBeenCalledExactlyOnceWith('/')
    })

    it('역할 조회 실패 시 오류를 발생시킨다', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        mocks.maybeSingle.mockResolvedValue({
            data: null,
            error: new Error('DB 조회 실패')
        })

        try {
            await expect(requireRole('user')).rejects.toThrow(
                '사용자 권한을 확인하지 못했습니다.'
            )
            expect(mocks.redirect).not.toHaveBeenCalled()
        } finally {
            consoleSpy.mockRestore()
        }
    })

    it.each<Role>(['user', 'owner', 'admin'])(
        '%s 역할은 자신의 영역에 접근할 수 있다',
        async role => {
            const profile = { id: user.id, role }
            mocks.maybeSingle.mockResolvedValue({
                data: profile,
                error: null
            })

            await expect(requireRole(role)).resolves.toEqual({ user, profile })
            expect(mocks.redirect).not.toHaveBeenCalled()
        }
    )

    it.each<{ actualRole: Role; allowRole: Role; destination: string }>([
        { actualRole: 'user', allowRole: 'owner', destination: '/home' },
        { actualRole: 'user', allowRole: 'admin', destination: '/home' },
        { actualRole: 'owner', allowRole: 'user', destination: '/owner' },
        { actualRole: 'owner', allowRole: 'admin', destination: '/owner' },
        { actualRole: 'admin', allowRole: 'user', destination: '/admin' },
        { actualRole: 'admin', allowRole: 'owner', destination: '/admin' }
    ])(
        '$actualRole 역할이 $allowRole 영역에 접근하면 $destination으로 이동한다',
        async ({ actualRole, allowRole, destination }) => {
            mocks.maybeSingle.mockResolvedValue({
                data: { id: user.id, role: actualRole },
                error: null
            })

            await expect(requireRole(allowRole)).rejects.toBe(redirectError)
            expect(mocks.redirect).toHaveBeenCalledExactlyOnceWith(destination)
        }
    )
})