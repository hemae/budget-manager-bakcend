import {Schema, model, Document} from 'mongoose'

export interface IncomeCategoryDocument extends Document {
    name: string
    projectId: string
    description: string | null
}

const incomeCategorySchema = new Schema<IncomeCategoryDocument>({
    name: {type: String, required: true},
    projectId: {type: String, required: true},
    description: {type: String, required: false, default: null}
}, { timestamps: true})

export const IncomeCategoryModel = model('IncomeCategory', incomeCategorySchema)
