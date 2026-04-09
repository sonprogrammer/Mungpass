// * 디비에서 오는 분을 ..시간..분으로 바꿔주는거

export const formatMinsToTime = (totalMins: number) => {
    if(totalMins < 60) return `${totalMins} 분` 

    const hours = Math.floor(totalMins / 60)
    const mins = totalMins % 60

    return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`
}