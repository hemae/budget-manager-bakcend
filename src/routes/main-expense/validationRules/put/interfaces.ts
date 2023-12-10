export interface MainExpensePutBody {
    value: number
    currencyId: string
    lastActualRateValue: number
    rateCode: string
    date: string
    name: string
}
