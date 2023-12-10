import {DateInfo} from './interfaces'

export function getInitialDateInfo<V = any[]>(date: string | null, expenseCategoryNames: string[], incomeCategoryNames: string[], value: 'array' | 'number' = 'array'): DateInfo<V> {
    // @ts-ignore
    let expenseCategoryObj: Record<string, V> = {other: value === 'array' ? [] : 0, total: value === 'array' ? [] : 0}
    expenseCategoryNames.forEach(expenseCategoryName => {
        // @ts-ignore
        expenseCategoryObj[expenseCategoryName] = value === 'array' ? [] : 0
    })

    // @ts-ignore
    let incomeCategoryObj: Record<string, V> = {other: value === 'array' ? [] : 0, total: value === 'array' ? [] : 0}
    incomeCategoryNames.forEach(incomeCategoryName => {
        // @ts-ignore
        incomeCategoryObj[incomeCategoryName] = value === 'array' ? [] : 0
    })

    // @ts-ignore
    return {
        date,
        expensesByCategory: expenseCategoryObj,
        incomesByCategory: incomeCategoryObj,
    }
}
