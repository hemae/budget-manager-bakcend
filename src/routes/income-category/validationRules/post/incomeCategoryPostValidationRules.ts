import {FieldParam} from '../../../../middlewares/validate'
import {IncomeCategoryPostBody} from './interfaces'

export const incomeCategoryPostValidationRules: FieldParam<IncomeCategoryPostBody>[] = [
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
