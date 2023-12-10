import {FieldParam} from '../../../../middlewares/validate'
import {IncomePostBody} from './interfaces'

export const incomePostValidationRules: FieldParam<IncomePostBody>[] = [
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
        fieldName: 'initialRateValue',
        type: 'number',
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
        fieldName: 'projectId',
        type: 'string',
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
