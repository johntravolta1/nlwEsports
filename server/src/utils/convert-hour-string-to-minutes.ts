
export function convertHour(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);
    console.log(hours)
    console.log(minutes)
    const amount =  (hours*60) + minutes

    console.log(amount)
    return amount

}
export function convertMinutes(min: number) {
    const hours = Math.floor(min/60);
    const minutes = min % 60;

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`
}