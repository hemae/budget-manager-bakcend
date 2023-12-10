import {Schema, model, Document} from 'mongoose'

export interface MainExpenseDocument extends Document {
    value: number
    currencyId: string
    initialRateValue: number
    lastActualRateValue: number
    rateCode: string
    date: string
    projectId: string
    name: string
}

const mainExpenseSchema = new Schema<MainExpenseDocument>({
    value: {type: Number, required: true},
    currencyId: {type: String, required: true},
    initialRateValue: {type: Number, required: true},
    lastActualRateValue: {type: Number, required: true},
    rateCode: {type: String, required: true},
    date: {type: String, required: true},
    projectId: {type: String, required: true},
    name: {type: String, required: true},
}, { timestamps: true})

export const MainExpenseModel = model('MainExpense', mainExpenseSchema)
