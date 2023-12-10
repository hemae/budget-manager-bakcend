import {DateInfo} from '../getInitialDateInfo'
import {getValueByCurrencyRateAndBase} from '../getValueByCurrencyRateAndBase'

export function getByCategory(dateInfo: DateInfo<any[]>, kind: 'expense' | 'income', currencies: Record<string, number>, baseCurrencyValue: number) {
    let byCategory: Record<string, number> = {total: 0}
    Object
        .keys(dateInfo[`${kind}sByCategory`])
        .forEach(categoryName => {

            if (categoryName !== 'total') {

                // @ts-ignore
                const dailyByCategory = dateInfo[`${kind}sByCategory`][categoryName].reduce((categoryRes, entity) => {
                    return categoryRes + getValueByCurrencyRateAndBase(entity.value, currencies[entity.rateCode], baseCurrencyValue)
                }, 0)

                if (byCategory[categoryName]) {
                    byCategory[categoryName] += dailyByCategory
                } else {
                    byCategory[categoryName] = dailyByCategory
                }

                byCategory.total += byCategory[categoryName]
            }
        })

    return byCategory
}
