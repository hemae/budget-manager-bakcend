import {FieldParam} from '../../../../middlewares/validate'
import {UserPostBody} from './interfaces'

export const userPostValidationRules: FieldParam<UserPostBody>[] = [
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
    {
        fieldName: 'firstName',
        type: 'string',
    },
    {
        fieldName: 'lastName',
        type: 'string',
    },
    {
        fieldName: 'role',
        type: 'string',
    },
    {
        fieldName: 'preferredCurrencyId',
        type: 'string',
    },
]
