import {Schema, model, Document} from 'mongoose'

export interface BaseCurrencyRateDocument {
    rateCode: string
    value: number
    base: string
}

export interface CurrencyRateDocument extends BaseCurrencyRateDocument, Document {

}

const currencyRateSchema = new Schema<CurrencyRateDocument>({
    rateCode: {type: String, required: true},
    value: {type: Number, required: true},
    base: {type: String, default: 'USD'},
}, { timestamps: true})

export const CurrencyRateModel = model('CurrencyRate', currencyRateSchema)
