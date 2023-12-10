import {FieldParam} from '../../../../middlewares/validate'
import {ProjectPutBody} from './interfaces'

export const projectPutValidationRules: FieldParam<ProjectPutBody>[] = [
    {
        fieldName: 'name',
        type: 'string',
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
        fieldName: 'assignedUserIds',
        type: 'string:array',
    },
    {
        fieldName: 'adminUserIds',
        type: 'string:array',
    },
    {
        fieldName: 'settlementDate',
        type: 'string:dateOnly',
    },
]
