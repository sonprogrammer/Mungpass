import { ScheduleRow, VacationSubmitData } from "@/features/owner/my-store/model";
import { endOfDay, isBefore, isWithinInterval, parse, startOfDay } from "date-fns";

export const getCurrentStoreStatus =(schedules: ScheduleRow[], vacation?: VacationSubmitData, tempStatus?: { status_type: 'SHUTDOWN' | 'EARLY_CLOSE', reason?: string}, now: Date = new Date()) => {

    const todayNum = now.getDay()
    

    if (tempStatus?.status_type === 'SHUTDOWN') {
        return {
            status: '오늘 즉시 휴무',
            schedule: undefined,
            reason: tempStatus.reason || '개인사정으로 휴무하게 되었습니다'
        };
    }

    

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

    if (tempStatus?.status_type === 'EARLY_CLOSE') {
        return {
            status: '조기 마감',
            schedule: todaySchedule, 
            reason: tempStatus.reason || '개인사정으로 조기 마감되었습니다.'
        }
    }

    if(!todaySchedule)return {status: '정보 없음', schedule: undefined}
    if(todaySchedule.is_closed) return {status: '휴무', schedule: todaySchedule}

    // * date형태로 만들기
    const openTime = parse(todaySchedule.open_time, 'HH:mm:ss', now)
    const closeTime = parse(todaySchedule.close_time, 'HH:mm:ss', now)

    let status = '영업 종료'
    if(isBefore(now, openTime)){
        status = '영업 전'
    }
    if(isWithinInterval(now, {start: openTime, end: closeTime})){
        status = '영업 중'
    }


    return {status, schedule: todaySchedule}
    
}