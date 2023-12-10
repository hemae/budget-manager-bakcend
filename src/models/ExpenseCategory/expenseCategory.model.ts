import {Schema, model, Document} from 'mongoose'

export interface ExpenseCategoryDocument extends Document {
    name: string
    projectId: string
    description: string | null
}

const expenseCategorySchema = new Schema<ExpenseCategoryDocument>({
    name: {type: String, required: true},
    projectId: {type: String, required: true},
    description: {type: String, required: false, default: null}
}, { timestamps: true})

export const ExpenseCategoryModel = model('ExpenseCategory', expenseCategorySchema)
