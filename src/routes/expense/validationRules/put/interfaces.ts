export interface ExpensePutBody {
    value: number
    currencyId: string
    lastActualRateValue: number
    rateCode: string
    date: string
    name: string | null
    expenseCategoryId: string | null
}
