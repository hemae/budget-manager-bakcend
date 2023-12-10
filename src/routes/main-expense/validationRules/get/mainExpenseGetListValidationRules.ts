import {FieldParam} from '../../../../middlewares/validate'
import {MainExpenseGetListQuery} from './interfaces'

export const mainExpenseGetListValidationRules: FieldParam<MainExpenseGetListQuery>[] = [
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
