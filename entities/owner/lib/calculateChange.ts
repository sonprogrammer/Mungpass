

export const calculateChange = (current: number, last: number) => {
    if(last === 0) return current > 0 ? '+100%' : '0%'
    const percent = ((current - last) / last) * 100
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`
}