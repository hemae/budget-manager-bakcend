import {FieldParam} from '../../../../middlewares/validate'
import {IncomeGetListQuery} from './interfaces'

export const incomeGetListValidationRules: FieldParam<IncomeGetListQuery>[] = [
    {
        fieldName: 'date',
        type: 'string:dateOnly',
    },
    {
        fieldName: 'projectId',
        type: 'string',
        required: true,
    },
]
