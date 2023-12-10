import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {ExpenseCategoryModel} from '../../models/ExpenseCategory'
import {validate} from '../../middlewares/validate'
import {auth} from '../../middlewares/auth'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    expenseCategoryPostValidationRules,
    expenseCategoryPutValidationRules,
} from './validationRules'
import {validateId} from '../../middlewares/validateId'
import {ProjectModel} from '../../models/Project'
import {expenseCategoryGetListValidationRules} from './validationRules'

const router = Router()

router.get(
    '/expense-category',
    auth(),
    validatePaginationQuery,
    validate('query', expenseCategoryGetListValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    CRUDController.get(ExpenseCategoryModel),
)

router.post(
    '/expense-category',
    auth(),
    validate('body', expenseCategoryPostValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'body'),
    CRUDController.post(ExpenseCategoryModel),
)

router.put(
    '/expense-category/:id',
    auth(),
    validate('body', expenseCategoryPutValidationRules),
    CRUDController.put(ExpenseCategoryModel, 'Expense Category'),
)

router.delete(
    '/expense-category/:id',
    auth(),
    CRUDController.delete(ExpenseCategoryModel, 'Expense Category'),
)

module.exports = router
