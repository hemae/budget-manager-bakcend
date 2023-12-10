import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {IncomeCategoryModel} from '../../models/IncomeCategory'
import {validate} from '../../middlewares/validate'
import {auth} from '../../middlewares/auth'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    incomeCategoryPostValidationRules,
    incomeCategoryPutValidationRules,
} from './validationRules'
import {validateId} from '../../middlewares/validateId'
import {ProjectModel} from '../../models/Project'
import {incomeCategoryGetListValidationRules} from './validationRules'

const router = Router()

router.get(
    '/income-category',
    auth(),
    validatePaginationQuery,
    validate('query', incomeCategoryGetListValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    CRUDController.get(IncomeCategoryModel),
)

router.post(
    '/income-category',
    auth(),
    validate('body', incomeCategoryPostValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'body'),
    CRUDController.post(IncomeCategoryModel),
)

router.put(
    '/income-category/:id',
    auth(),
    validate('body', incomeCategoryPutValidationRules),
    CRUDController.put(IncomeCategoryModel, 'Income Category'),
)

router.delete(
    '/income-category/:id',
    auth(),
    CRUDController.delete(IncomeCategoryModel, 'Income Category'),
)

module.exports = router
