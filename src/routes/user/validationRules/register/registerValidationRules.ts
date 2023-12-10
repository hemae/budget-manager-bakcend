import {FieldParam} from '../../../../middlewares/validate'
import {RegisterBody} from './interfaces'

export const registerValidationRules: FieldParam<RegisterBody>[] = [
    {
        fieldName: 'email',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'password',
        type: 'string',
        required: true,
    },
]