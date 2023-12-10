import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {MainExpenseModel} from '../../models/MainExpense'
import {validate} from '../../middlewares/validate'
import {validateId} from '../../middlewares/validateId'
import {auth} from '../../middlewares/auth'
import {putRateValuesToBody} from '../../middlewares/putRateValuesToBody'
import {refreshCurrencyRates} from '../../middlewares/refreshCurencyRates'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    mainExpensePostValidationRules,
    mainExpensePutValidationRules,
    mainExpenseGetListValidationRules,
} from './validationRules'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {ProjectModel} from '../../models/Project'

const router = Router()

router.get(
    '/main-expense',
    auth(),
    validatePaginationQuery,
    validate('query', mainExpenseGetListValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    CRUDController.get(MainExpenseModel),
)

router.post(
    '/main-expense',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['initialRateValue', 'lastActualRateValue']),
    validate('body', mainExpensePostValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'body'),
    CRUDController.post(MainExpenseModel),
)

router.put(
    '/main-expense/:id',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['lastActualRateValue']),
    validate('body', mainExpensePutValidationRules),
    CRUDController.put(MainExpenseModel, 'Main Expense'),
)

router.delete(
    '/main-expense/:id',
    auth(),
    CRUDController.delete(MainExpenseModel, 'Main Expense'),
)

module.exports = router
