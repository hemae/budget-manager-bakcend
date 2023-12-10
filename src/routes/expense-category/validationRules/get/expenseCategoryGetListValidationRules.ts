import {FieldParam} from '../../../../middlewares/validate'
import {ExpenseCategoryGetListQuery} from './interfaces'

export const expenseCategoryGetListValidationRules: FieldParam<ExpenseCategoryGetListQuery>[] = [
    {
        fieldName: 'projectId',
        type: 'string',
    },
]
