export interface ExpensePostBody {
    value: number
    currencyId: string
    initialRateValue: number
    lastActualRateValue: number
    rateCode: string
    date: string
    projectId: string
    name: string | null
    expenseCategoryId: string | null
}
