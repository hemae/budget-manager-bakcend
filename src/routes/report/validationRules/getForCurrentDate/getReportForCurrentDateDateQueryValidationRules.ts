import {FieldParam} from '../../../../middlewares/validate'
import {GetReportForCurrentDateQuery} from './interfaces'

export const getReportForCurrentDateDateQueryValidationRules: FieldParam<GetReportForCurrentDateQuery>[] = [
    {
        fieldName: 'date',
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