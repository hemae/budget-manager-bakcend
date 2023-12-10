import {FieldParam} from '../../../../middlewares/validate'
import {GetReportRemaindersByCurrenciesQuery} from './interfaces'

export const getReportRemainderByCurrenciesQueryValidationRules: FieldParam<GetReportRemaindersByCurrenciesQuery>[] = [
    {
        fieldName: 'date',
        type: 'string:dateOnly',
        required: true,
    },
    {
        fieldName: 'projectId',
        type: 'string',
        required: true,
    },
]