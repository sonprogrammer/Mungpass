import { ScheduleRow, VacationSubmitData } from "@/features/owner/my-store/model/types";
import { endOfDay, isBefore, isWithinInterval, parse, startOfDay } from "date-fns";

export const getCurrentStoreStatus =(schedules: ScheduleRow[], vacation?: VacationSubmitData) => {
    const now = new Date()
    const todayNum = now.getDay()
    // console.log(todayNum)

    if(vacation && vacation.start_date && vacation.end_date){
        const vacationStart = startOfDay(new Date(vacation.start_date))
        const vacationEnd = endOfDay(new Date(vacation.end_date))

        if(isWithinInterval(now, {start: vacationStart, end: vacationEnd})){
            return{
                status: '휴가 중',
                start_date: vacation.start_date,
                end_date: vacation.end_date,
                schedule: undefined,
                reason: vacation.reason
            }
        }
    }

    const todaySchedule = schedules.find(s => s.day_of_week === todayNum)

    // console.log('todaySchedule',todaySchedule)

    if(!todaySchedule)return {status: '정보 없음', schedule: undefined}
    if(todaySchedule.is_closed) return {status: '휴무', schedule: todaySchedule}

    // * date형태로 만들기
    const openTime = parse(todaySchedule.open_time, 'HH:mm:ss', now)
    const closeTime = parse(todaySchedule.close_time, 'HH:mm:ss', now)

    // console.log('opentime',openTime)
    let status = '영업 종료'
    if(isBefore(now, openTime)){
        status = '영업 전'
    }
    if(isWithinInterval(now, {start: openTime, end: closeTime})){
        status = '영업 중'
    }


    return {status, schedule: todaySchedule}
    
}