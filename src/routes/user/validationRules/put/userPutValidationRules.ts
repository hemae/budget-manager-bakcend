import {FieldParam} from '../../../../middlewares/validate'
import {UserPutBody} from './interfaces'

export const userPutValidationRules: FieldParam<UserPutBody>[] = [
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
