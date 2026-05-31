'use client'

import { useState } from 'react'
import {  Form, message, Skeleton } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { DAYS } from '../lib/DAYS'
import { StoreTimeMainView } from '@/features/owner/my-store/ui/StoreTimeMainView'
import { StoreTimeEditView } from '@/features/owner/my-store/ui/StoreTimeEditView'
import { useUpdateSchedules } from '@/features/owner/my-store/model/useUpdateSchedules'
import { useGetSchedule } from '@/features/owner/my-store/model/useGetSchedule'
import { SaveScheduleFormData } from '@/features/owner/my-store/model/types'
import { format } from 'date-fns'
import { getCurrentStoreStatus } from '@/features/owner/my-store/lib/getCurrentStoraStatus'
import { useGetVacation } from '@/features/owner/my-store/model/useGetVacation'
import { useGetTodayTempStatus } from '@/features/owner/my-store/model/useGetTodayTempStatus'



export function StoreTimeCard({ shopId }: { shopId: string }) {
    const [viewMode, setViewMode] = useState<'main' | 'edit'>('main')
    const [form] = Form.useForm()


    // * 매장 오픈, 마감 시간 가져오기
    const { data: schedules, isPending: isGetSchedulePending } = useGetSchedule(shopId)

    //* 매장 시간 업데이트 훅
    const { mutate: updateSchedule, isPending: isUpdateSchedulePending } = useUpdateSchedules()

    // * 휴가 정보 가져오기
    const { data: vacation} = useGetVacation(shopId)

    // *조기 , 즉시 휴무 처리 정보 가져오기 되어있으면
    const { data: tempStatus} = useGetTodayTempStatus(shopId)



    // *오늘 휴무면 휴무, 시간이 지났으면 영업종료, 운영중이면 영업중
    const currentStoreStatus = getCurrentStoreStatus(schedules || [], vacation || [], tempStatus ||[])


    // * 운영시간 수정에서 보이는 운영 시간
    const handleEditClick = () => {
        const initialValues: {
            [key: number]: {
                open: Dayjs,
                close: Dayjs,
                is_closed: boolean
            }
        } = {}
        DAYS.forEach(day => {
            const schedule = schedules?.find((s) => s.day_of_week === day.value)
            
            const rawOpen = schedule?.open_time
            const rawClose = schedule?.close_time

            
            let openTime = dayjs(rawOpen, 'HH:mm')
            if (!openTime.isValid()) {
                openTime = dayjs('09:00', 'HH:mm')
            }

            let closeTime = dayjs(rawClose, 'HH:mm')
            if (!closeTime.isValid()) {
                closeTime = dayjs('22:00', 'HH:mm')
            }
            initialValues[day.value] = {
                open: dayjs(openTime),
                close: dayjs(closeTime),
                is_closed: schedule?.is_closed ?? false
            };
        })
        form.setFieldsValue(initialValues)
        setViewMode('edit')
    }

    const handleSave = async (values: SaveScheduleFormData) => {
        try {
            // * db로 넘겨줄ㄱ값
            const updatePayload = DAYS.map(day => {
                const row = values[day.value]
                return {
                    shop_id: shopId,
                    day_of_week: day.value,
                    open_time: row.open ? format(row.open, 'HH:mm') : '09:00',
                    close_time: row.close ? format(row.close, 'HH:mm') : '22:00',
                    is_closed: values[day.value].is_closed
                }
            })

            updateSchedule({shopId: shopId, schedules: updatePayload}, {
                onSuccess: () => setViewMode('main')
            })
        } catch (err) {
            console.error('handlesave error', err)
            message.error('저장에 실패했습니다.');
        }
    }

    if (isGetSchedulePending) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton.Button active block style={{ height: 100 }} />
                <Skeleton active paragraph={{ rows: 4 }} />
            </div>
        )
    }
    return (
        <div className="w-full h-full">
            {viewMode === 'main' ? (
                <StoreTimeMainView
                    onEditClick={handleEditClick}
                    shopStatus={currentStoreStatus}
                    shopId={shopId}
                    vacation={vacation}
                />
            ) : (
                <StoreTimeEditView
                    form={form}
                    onSave={handleSave}
                    onBack={() => setViewMode('main')}
                    loading={isUpdateSchedulePending}
                />
            )}
        </div>
    )
}