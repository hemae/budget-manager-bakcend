import {DateInfo, getInitialDateInfo} from '../getInitialDateInfo'
import {generateDates} from '../../../../utils/generateDates'

export function getInitialDateInfos(startDate: string, endDate: string, expenseCategoryNames: string[], incomeCategoryNames: string[]): DateInfo<any[]>[] {
    return generateDates(startDate, endDate)
        .map(date => getInitialDateInfo<any[]>(date, expenseCategoryNames, incomeCategoryNames))
}
