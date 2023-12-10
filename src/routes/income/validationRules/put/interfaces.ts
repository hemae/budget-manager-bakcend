export interface IncomePutBody {
    value: number
    currencyId: string
    lastActualRateValue: number
    rateCode: string
    date: string
    name: string | null
    incomeCategoryId: string | null
}
