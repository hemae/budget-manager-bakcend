import moment from 'moment'

export function generateDates(startDate: string, endDate: string): string[] {
    const dates: string[] = []

    let currentDate = moment(startDate)
    const momentEndDate = moment(endDate)

    while (currentDate <= momentEndDate) {
        dates.push(currentDate.format('YYYY-MM-DD'))
        currentDate.date(currentDate.date() + 1)
    }

    return dates
}
