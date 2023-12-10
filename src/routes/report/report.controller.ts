import {Request, Response} from 'express'
import {handle500, handleSuccess} from '../../utils/responseHandlers'
import {ExpenseModel} from '../../models/Expense'
import {IncomeModel} from '../../models/Income'
import {ExpenseCategoryModel} from '../../models/ExpenseCategory'
import {IncomeCategoryModel} from '../../models/IncomeCategory'
import {MainExpenseModel} from '../../models/MainExpense'
import {MainIncomeModel} from '../../models/MainIncome'
import {getByCategory, getInitialDateInfos} from './lib'
import {getTotalRow} from './lib/getTotalRow'
import {getValueByCurrencyRateAndBase} from './lib/getValueByCurrencyRateAndBase'
import moment from 'moment'
import {CurrencyRateModel} from '../../models/CurrencyRate'

export class ReportController {

    public static async get(req: Request, res: Response) {
        try {

            const {...currencies} = req.body

            // @ts-ignore
            const {startDate, endDate, projectId, validated: {currency, project}} = req.query

            const {value: baseCurrencyValue, rateCode: vaseCurrencyRateCode} = currency

            const expenses = await ExpenseModel
                .find({date: {$gte: startDate, $lte: endDate}, projectId})
                .exec()

            const incomes = await IncomeModel
                .find({date: {$gte: startDate, $lte: endDate}, projectId})
                .exec()

            const expenseCategories = await ExpenseCategoryModel.find({projectId}).exec()
            const expenseCategoryNames = expenseCategories.map(expenseCategory => expenseCategory.name)

            const incomeCategories = await IncomeCategoryModel.find({projectId}).exec()
            const incomeCategoryNames = incomeCategories.map(incomeCategory => incomeCategory.name)

            const datesInfo = getInitialDateInfos(
                startDate as string,
                endDate as string,
                expenseCategoryNames,
                incomeCategoryNames,
            )

            expenses.forEach(expense => {
                const targetDateInfo = datesInfo.find(dateInfo => dateInfo.date === expense.date)
                if (targetDateInfo) {
                    const targetCategory = expenseCategories.find(category => category._id.toString() === expense.expenseCategoryId)
                    targetDateInfo.expensesByCategory[targetCategory?.name || 'other'].push(expense)
                }
            })

            incomes.forEach(income => {
                const targetDateInfo = datesInfo.find(dateInfo => dateInfo.date === income.date)
                if (targetDateInfo) {
                    const targetCategory = incomeCategories.find(category => category._id.toString() === income.incomeCategoryId)
                    targetDateInfo.incomesByCategory[targetCategory?.name || 'other'].push(income)
                }
            })

            const byCategoryAndDate = datesInfo.map(dateInfo => {
                const expensesByCategory = getByCategory(dateInfo, 'expense', currencies, baseCurrencyValue)
                const incomesByCategory = getByCategory(dateInfo, 'income', currencies, baseCurrencyValue)
                return {
                    date: dateInfo.date,
                    expensesByCategory,
                    incomesByCategory,
                }
            })

            // @ts-ignore
            let totalRow = getTotalRow(byCategoryAndDate, expenseCategoryNames, incomeCategoryNames)

            const averageExpensePerDay: Record<string, number> = {}
            Object
                .keys(totalRow.expensesByCategory)
                .forEach(categoryName => {
                    averageExpensePerDay[categoryName] = totalRow.expensesByCategory[categoryName] / datesInfo.length
                })

            const averageIncomePerDay: Record<string, number> = {}
            Object
                .keys(totalRow.incomesByCategory)
                .forEach(categoryName => {
                    averageIncomePerDay[categoryName] = totalRow.incomesByCategory[categoryName] / datesInfo.length
                })

            // @ts-ignore
            totalRow = {...totalRow, averageExpensePerDay, averageIncomePerDay}

            const momentEndDate = moment(endDate as string)

            const firstSettlementDate = moment(project.settlementDate as string).set({month: momentEndDate.month()})
            if (momentEndDate < firstSettlementDate) {
                firstSettlementDate.set({month: firstSettlementDate.month() - 1})
            }
            const secondSettlementDate = firstSettlementDate.clone().set({month: firstSettlementDate.month() + 1})

            const mainExpenses = await MainExpenseModel
                .find({date: {$gte: firstSettlementDate.format('YYYY-MM-DD'), $lt: secondSettlementDate.format('YYYY-MM-DD')}, projectId})
                .exec()

            const mainIncomes = await MainIncomeModel
                .find({date: {$gte: firstSettlementDate.format('YYYY-MM-DD'), $lt: secondSettlementDate.format('YYYY-MM-DD')}, projectId})
                .exec()

            const gotIncomes = await IncomeModel
                .find({date: {$gte: firstSettlementDate.format('YYYY-MM-DD'), $lt: secondSettlementDate.format('YYYY-MM-DD')}, projectId})
                .exec()

            const totalMainExpenses = mainExpenses.reduce((res, mainExpense) => {
                return res + getValueByCurrencyRateAndBase(mainExpense.value, currencies[mainExpense.rateCode], baseCurrencyValue)
            }, 0)

            const totalMainIncome = mainIncomes.reduce((res, mainIncome) => {
                return res + getValueByCurrencyRateAndBase(mainIncome.value, currencies[mainIncome.rateCode], baseCurrencyValue)
            }, 0)

            const totalGotIncome = gotIncomes.reduce((res, gotIncome) => {
                return res + getValueByCurrencyRateAndBase(gotIncome.value, currencies[gotIncome.rateCode], baseCurrencyValue)
            }, 0)

            const needToGetPerMonth = (averageExpensePerDay.total - averageIncomePerDay.total) * 30.41 + totalMainExpenses

            const gotPerCurrentMonth = totalMainIncome + totalGotIncome

            handleSuccess(res, {
                results: byCategoryAndDate,
                totalRow,
                currency: vaseCurrencyRateCode,
                needToGetPerMonth,
                gotPerCurrentMonth,
            })
        } catch (e) {
            handle500(e, res)
        }
    }

    public static async getForCurrentDate(req: Request, res: Response) {
        try {

            const {...currencies} = req.body

            // @ts-ignore
            const {date, projectId, validated: {currency, project}} = req.query

            const {value: baseCurrencyValue} = currency

            const momentCurrentDate = moment(date as string)
            const momentProjectSettlementDate = moment(project.settlementDate as string)
            const monthOfStartDate = momentCurrentDate.date() < momentProjectSettlementDate.date() ? momentCurrentDate.month() - 1 : momentCurrentDate.month()
            const momentStartDate = momentProjectSettlementDate.clone().set({month: monthOfStartDate})
            const momentMainEndDate = momentStartDate.clone().set({month: momentStartDate.month() + 1})
            momentMainEndDate.set({date: momentMainEndDate.date() - 1})

            const stringStartDate = momentProjectSettlementDate.format('YYYY-MM-DD')
            const stringMainEndDate = momentMainEndDate.format('YYYY-MM-DD')
            const stringPrevCurrentDate = momentCurrentDate.clone().set({date: momentCurrentDate.date() - 1}).format('YYYY-MM-DD')

            const expenses = await ExpenseModel
                .find({date: {$gte: stringStartDate, $lte: stringPrevCurrentDate}, projectId})
                .exec()

            const incomes = await IncomeModel
                .find({date: {$gte: stringStartDate, $lte: stringPrevCurrentDate}, projectId})
                .exec()

            const expensesOfCurrentDate = await ExpenseModel
                .find({date: {$gte: date, $lte: date}, projectId})
                .exec()

            const incomesOfCurrentDate = await IncomeModel
                .find({date: {$gte: date, $lte: date}, projectId})
                .exec()

            const mainExpenses = await MainExpenseModel
                .find({date: {$gte: stringStartDate, $lte: stringMainEndDate}, projectId})
                .exec()

            const mainIncomes = await MainIncomeModel
                .find({date: {$gte: stringStartDate, $lte: stringMainEndDate}, projectId})
                .exec()

            const totalExpense = expenses.reduce((res, expense) => {
                return res + getValueByCurrencyRateAndBase(expense.value, currencies[expense.rateCode], baseCurrencyValue)
            }, 0)

            const totalIncome = incomes.reduce((res, income) => {
                return res + getValueByCurrencyRateAndBase(income.value, currencies[income.rateCode], baseCurrencyValue)
            }, 0)

            const totalMainExpense = mainExpenses.reduce((res, mainExpense) => {
                return res + getValueByCurrencyRateAndBase(mainExpense.value, currencies[mainExpense.rateCode], baseCurrencyValue)
            }, 0)

            const totalMainIncome = mainIncomes.reduce((res, mainExpense) => {
                return res + getValueByCurrencyRateAndBase(mainExpense.value, currencies[mainExpense.rateCode], baseCurrencyValue)
            }, 0)

            const totalRemainder = totalMainIncome + totalIncome - (totalMainExpense + totalExpense)

            const remainderOfCurrentDate = totalRemainder / momentMainEndDate.clone().diff(momentCurrentDate.clone().set({days: momentCurrentDate.days() - 1}), 'days')

            const totalExpenseOfCurrentDate = expensesOfCurrentDate.reduce((res, expense) => {
                return res + getValueByCurrencyRateAndBase(expense.value, currencies[expense.rateCode], baseCurrencyValue)
            }, 0)

            const totalIncomeOfCurrentDate = incomesOfCurrentDate.reduce((res, income) => {
                return res + getValueByCurrencyRateAndBase(income.value, currencies[income.rateCode], baseCurrencyValue)
            }, 0)

            const totalOfCurrentDate = totalIncomeOfCurrentDate - totalExpenseOfCurrentDate

            const totalRemainderOfCurrentDate = remainderOfCurrentDate + totalOfCurrentDate

            handleSuccess(res, {
                totalRemainder,
                remainderOfCurrentDate,
                totalExpenseOfCurrentDate,
                totalIncomeOfCurrentDate,
                totalOfCurrentDate,
                totalRemainderOfCurrentDate,
            })
        } catch (e) {
            handle500(e, res)
        }
    }

    public static async getRemaindersByCurrencies(req: Request, res: Response) {
        try {

            const {...currencies} = req.body

            // @ts-ignore
            const {date, projectId, validated: {project}} = req.query

            const mainIncomes = await MainIncomeModel
                .find({
                    projectId,
                    date: {$gte: project.settlementDate, $lte: date},
                })
                .exec()

            const mainExpenses = await MainExpenseModel
                .find({
                    projectId,
                    date: {$gte: project.settlementDate, $lte: date},
                })
                .exec()

            const incomes = await IncomeModel
                .find({
                    projectId,
                    date: {$gte: project.settlementDate, $lte: date},
                })
                .exec()

            const expenses = await ExpenseModel
                .find({
                    projectId,
                    date: {$gte: project.settlementDate, $lte: date},
                })
                .exec();

            // @ts-ignore
            const usedCurrencyIds: string[] = [
                ...mainIncomes,
                ...mainExpenses,
                ...incomes,
                ...expenses,
                // @ts-ignore
            ].reduce((res, entity) => {
                // @ts-ignore
                if (res.includes(entity.currencyId)) return res
                // @ts-ignore
                return [...res, entity.currencyId]
            }, [])

            const currencyObject: Record<string, number> = {}

            for (let currencyId of usedCurrencyIds) {
                const targetCurrency = await CurrencyRateModel.findById(currencyId).exec()
                // @ts-ignore
                const rateCode = targetCurrency.rateCode
                currencyObject[rateCode] = [
                    ...mainIncomes,
                    ...incomes,
                    // @ts-ignore
                ].reduce((res, entity) => {
                    // @ts-ignore
                    if (entity.currencyId === currencyId) {
                        // @ts-ignore
                        return res + entity.value
                    }
                    return res
                }, 0) - [
                    ...mainExpenses,
                    ...expenses,
                    // @ts-ignore
                ].reduce((res, entity) => {
                    // @ts-ignore
                    if (entity.currencyId === currencyId) {
                        // @ts-ignore
                        return res + entity.value
                    }
                    return res
                }, 0)
            }

            handleSuccess(res, currencyObject)

        } catch (e) {
            handle500(e, res)
        }
    }
}
