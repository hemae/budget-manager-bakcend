import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {IncomeModel} from '../../models/Income'
import {IncomeCategoryModel} from '../../models/IncomeCategory'
import {validate} from '../../middlewares/validate'
import {validateId} from '../../middlewares/validateId'
import {auth} from '../../middlewares/auth'
import {refreshCurrencyRates} from '../../middlewares/refreshCurencyRates'
import {putRateValuesToBody} from '../../middlewares/putRateValuesToBody'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    incomePostValidationRules,
    incomePutValidationRules,
    incomeGetListValidationRules,
} from './validationRules'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {ProjectModel} from '../../models/Project'

const router = Router()

router.get(
    '/income',
    auth(),
    validatePaginationQuery,
    validate('query', incomeGetListValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    CRUDController.get(IncomeModel),
)

router.post(
    '/income',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['initialRateValue', 'lastActualRateValue']),
    validate('body', incomePostValidationRules),
    validateId(IncomeCategoryModel, 'Income Category', 'incomeCategoryId', 'body', true),
    validateId(ProjectModel, 'Project', 'projectId', 'body'),
    CRUDController.post(IncomeModel),
)

router.put(
    '/income/:id',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['lastActualRateValue']),
    validate('body', incomePutValidationRules),
    validateId(IncomeCategoryModel, 'Income Category', 'incomeCategoryId', 'body', true),
    CRUDController.put(IncomeModel, 'Income'),
)

router.delete(
    '/income/:id',
    auth(),
    CRUDController.delete(IncomeModel, 'Income'),
)

module.exports = router
