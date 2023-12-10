import {FieldParam} from '../../../../middlewares/validate'
import {ProjectPostBody} from './interfaces'

export const projectPostValidationRules: FieldParam<ProjectPostBody>[] = [
    {
        fieldName: 'name',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'description',
        type: 'string',
    },
    {
        fieldName: 'color',
        type: 'string',
    },
    {
        fieldName: 'founderUserId',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'settlementDate',
        type: 'string:dateOnly',
        required: true,
    },
]
