import {FieldParam} from '../../../../middlewares/validate'
import {IncomePutBody} from './interfaces'

export const incomePutValidationRules: FieldParam<IncomePutBody>[] = [
    {
        fieldName: 'value',
        type: 'number',
        required: true,
    },
    {
        fieldName: 'currencyId',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'lastActualRateValue',
        type: 'number',
        required: true,
    },
    {
        fieldName: 'rateCode',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'date',
        type: 'string:dateOnly',
        required: true,
    },
    {
        fieldName: 'name',
        type: 'string',
    },
    {
        fieldName: 'incomeCategoryId',
        type: 'string',
    },
]
