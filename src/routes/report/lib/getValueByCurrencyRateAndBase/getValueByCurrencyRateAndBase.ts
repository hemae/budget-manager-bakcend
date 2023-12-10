export function getValueByCurrencyRateAndBase(value: number, currencyRate: number, baseCurrencyValue: number) {
    return value / currencyRate * baseCurrencyValue
}
