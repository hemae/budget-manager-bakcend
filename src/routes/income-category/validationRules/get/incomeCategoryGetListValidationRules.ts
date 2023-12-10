import {FieldParam} from '../../../../middlewares/validate'
import {IncomeCategoryGetListQuery} from './interfaces'

export const incomeCategoryGetListValidationRules: FieldParam<IncomeCategoryGetListQuery>[] = [
    {
        fieldName: 'projectId',
        type: 'string',
        required: true,
    },
]
