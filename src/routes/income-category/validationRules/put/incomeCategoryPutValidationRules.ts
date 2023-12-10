import {FieldParam} from '../../../../middlewares/validate'
import {IncomeCategoryPutBody} from './interfaces'

export const incomeCategoryPutValidationRules: FieldParam<IncomeCategoryPutBody>[] = [
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
