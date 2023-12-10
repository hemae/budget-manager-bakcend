import {FieldParam} from '../../../../middlewares/validate'
import {ExpensePutBody} from './interfaces'

export const expensePutValidationRules: FieldParam<ExpensePutBody>[] = [
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
        fieldName: 'expenseCategoryId',
        type: 'string',
    },
]
