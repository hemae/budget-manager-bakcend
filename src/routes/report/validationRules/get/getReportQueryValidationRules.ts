import {FieldParam} from '../../../../middlewares/validate'
import {GetReportQuery} from './interfaces'

export const getReportQueryValidationRules: FieldParam<GetReportQuery>[] = [
    {
        fieldName: 'startDate',
        type: 'string:dateOnly',
        required: true,
    },
    {
        fieldName: 'endDate',
        type: 'string:dateOnly',
        required: true,
    },
    {
        fieldName: 'currencyId',
        type: 'string',
        required: true,
    },
    {
        fieldName: 'projectId',
        type: 'string',
        required: true,
    },
]
