export const SUBSCRIBES_STATUS = {
    NOT_STARTED: {
        text: '미등록',
        color: 'default',
    },
    PENDING: {
        text: '유료 회원 등록중',
        color: 'gold',
    },
    APPROVED: {
        text: '유료 회원',
        color: 'green',
    },
    REJECTED: {
        text: '거절',
        color: 'red',
    },
} as const