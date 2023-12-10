import {FieldParam} from '../../validate'
import {PaginationQuery} from './interfaces'

export const paginationQueryValidationRules: FieldParam<PaginationQuery>[] = [
    {
        fieldName: 'page',
        type: 'number:gte1',
    },
    {
        fieldName: 'pageSize',
        type: 'number:gte1',
    },
]
