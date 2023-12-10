import {FieldParam} from '../../../../middlewares/validate'
import {ExpenseCategoryPutBody} from './interfaces'

export const expenseCategoryPutValidationRules: FieldParam<ExpenseCategoryPutBody>[] = [
    {
        fieldName: 'name',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'description',
        type: 'string',
    },
]
