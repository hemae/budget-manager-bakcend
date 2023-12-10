import {FieldParam} from '../../../../middlewares/validate'
import {ConversionCurrencyQuery} from './interfaces'

export const conversionCurrencyValidationRules: FieldParam<ConversionCurrencyQuery>[] = [
    {
        fieldName: 'from',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'to',
        type: 'string',
        required: true,
    },
]
