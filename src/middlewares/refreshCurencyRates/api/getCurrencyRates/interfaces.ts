export interface CurrencyRatesResponse {
    success: boolean
    timestamp: number
    base: string
    date: string
    rates: Record<string, number> | null
}
