import {FieldParam} from '../../../../middlewares/validate'
import {ExpenseCategoryPostBody} from './interfaces'

export const expenseCategoryPostValidationRules: FieldParam<ExpenseCategoryPostBody>[] = [
    {
        fieldName: 'name',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'projectId',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'description',
        type: 'string',
    },
]
