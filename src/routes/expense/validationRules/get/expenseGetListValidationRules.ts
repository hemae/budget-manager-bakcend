import {FieldParam} from '../../../../middlewares/validate'
import {ExpenseGetListQuery} from './interfaces'

export const expenseGetListValidationRules: FieldParam<ExpenseGetListQuery>[] = [
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
