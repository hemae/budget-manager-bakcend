import {FieldParam} from '../../../../middlewares/validate'
import {AuthenticateBody} from './interfaces'

export const authenticateValidationRules: FieldParam<AuthenticateBody>[] = [
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
