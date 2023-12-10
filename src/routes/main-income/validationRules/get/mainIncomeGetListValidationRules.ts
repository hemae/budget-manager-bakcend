import {FieldParam} from '../../../../middlewares/validate'
import {MainIncomeGetListQuery} from './interfaces'

export const mainIncomeGetListValidationRules: FieldParam<MainIncomeGetListQuery>[] = [
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
