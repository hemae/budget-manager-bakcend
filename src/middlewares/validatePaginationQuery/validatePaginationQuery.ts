import {validate} from '../validate'
import {paginationQueryValidationRules} from './lib'

export const validatePaginationQuery = validate('query', paginationQueryValidationRules)
