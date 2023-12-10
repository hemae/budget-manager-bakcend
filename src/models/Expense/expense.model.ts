import {Schema, model, Document} from 'mongoose'

export interface ExpenseDocument extends Document {
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

const expenseSchema = new Schema<ExpenseDocument>({
    value: {type: Number, required: true},
    currencyId: {type: String, required: true},
    initialRateValue: {type: Number, required: true},
    lastActualRateValue: {type: Number, required: true},
    rateCode: {type: String, required: true},
    date: {type: String, required: true},
    projectId: {type: String, required: true},
    name: {type: String, default: null},
    expenseCategoryId: {type: String, default: null},
}, { timestamps: true})

export const ExpenseModel = model('Expense', expenseSchema)
