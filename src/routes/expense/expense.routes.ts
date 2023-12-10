import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {ExpenseModel} from '../../models/Expense'
import {ExpenseCategoryModel} from '../../models/ExpenseCategory'
import {validate} from '../../middlewares/validate'
import {validateId} from '../../middlewares/validateId'
import {auth} from '../../middlewares/auth'
import {putRateValuesToBody} from '../../middlewares/putRateValuesToBody'
import {refreshCurrencyRates} from '../../middlewares/refreshCurencyRates'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    expensePostValidationRules,
    expensePutValidationRules,
    expenseGetListValidationRules,
} from './validationRules'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {ProjectModel} from '../../models/Project'

const router = Router()

router.get(
    '/expense',
    auth(),
    validatePaginationQuery,
    validate('query', expenseGetListValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    CRUDController.get(ExpenseModel),
)

router.post(
    '/expense',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['initialRateValue', 'lastActualRateValue']),
    validate('body', expensePostValidationRules),
    validateId(ExpenseCategoryModel, 'Expense Category', 'expenseCategoryId', 'body', true),
    validateId(ProjectModel, 'Project', 'projectId', 'body'),
    CRUDController.post(ExpenseModel),
)

router.put(
    '/expense/:id',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['lastActualRateValue']),
    validate('body', expensePutValidationRules),
    validateId(ExpenseCategoryModel, 'Expense Category', 'expenseCategoryId', 'body', true),
    CRUDController.put(ExpenseModel, 'Expense'),
)

router.delete(
    '/expense/:id',
    auth(),
    CRUDController.delete(ExpenseModel, 'Expense'),
)

module.exports = router
