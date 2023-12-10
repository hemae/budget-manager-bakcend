import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {MainIncomeModel} from '../../models/MainIncome'
import {validate} from '../../middlewares/validate'
import {validateId} from '../../middlewares/validateId'
import {auth} from '../../middlewares/auth'
import {putRateValuesToBody} from '../../middlewares/putRateValuesToBody'
import {refreshCurrencyRates} from '../../middlewares/refreshCurencyRates'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    mainIncomePostValidationRules,
    mainIncomePutValidationRules,
    mainIncomeGetListValidationRules,
} from './validationRules'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {ProjectModel} from '../../models/Project'

const router = Router()

router.get(
    '/main-income',
    auth(),
    validatePaginationQuery,
    validate('query', mainIncomeGetListValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    CRUDController.get(MainIncomeModel),
)

router.post(
    '/main-income',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['initialRateValue', 'lastActualRateValue']),
    validate('body', mainIncomePostValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'body'),
    CRUDController.post(MainIncomeModel),
)

router.put(
    '/main-income/:id',
    auth(),
    refreshCurrencyRates(),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'body'),
    putRateValuesToBody(['lastActualRateValue']),
    validate('body', mainIncomePutValidationRules),
    CRUDController.put(MainIncomeModel, 'Main Income'),
)

router.delete(
    '/main-income/:id',
    auth(),
    CRUDController.delete(MainIncomeModel, 'Main Income'),
)

module.exports = router
