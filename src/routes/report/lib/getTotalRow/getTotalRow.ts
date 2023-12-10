import {DateInfo, getInitialDateInfo} from '../getInitialDateInfo'

export function getTotalRow(byCategoryAndDate: DateInfo<any[]>[], expenseCategoryNames: string[], incomeCategoryNames: string[]): DateInfo<number> {

    const totalRow = getInitialDateInfo<number>(
        null,
        expenseCategoryNames,
        incomeCategoryNames,
        'number',
    )

    Object
        .keys(totalRow.expensesByCategory)
        .forEach(categoryName => {
            const sum = byCategoryAndDate.reduce((s, dateInfo) => {
                // @ts-ignore
                return s + dateInfo.expensesByCategory[categoryName]
            }, 0)
            totalRow.expensesByCategory[categoryName] += sum
        })

    Object
        .keys(totalRow.incomesByCategory)
        .forEach(categoryName => {
            const sum = byCategoryAndDate.reduce((s, dateInfo) => {
                // @ts-ignore
                return s + dateInfo.incomesByCategory[categoryName]
            }, 0)
            totalRow.incomesByCategory[categoryName] += sum
        })

    return totalRow
}
