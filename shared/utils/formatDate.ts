// * 시간 바꿔주는거(현재 시간, 과거 시간 등 단적인거)

import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export const formatTime =(dateStr: string | null | undefined) => {
    if(!dateStr) return
    const date = parseISO(dateStr) 
    return format(date, 'MM.dd HH:mm', {locale: ko})
}