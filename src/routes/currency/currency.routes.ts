import {Router} from 'express'
import {auth} from '../../middlewares/auth'
import {refreshCurrencyRates} from '../../middlewares/refreshCurencyRates'
import {CRUDController} from '../../CRUDController'
import {CurrencyController} from './currency.controller'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {validate} from '../../middlewares/validate'
import {
    conversionCurrencyValidationRules,
} from './validationRules'
import {validateId} from '../../middlewares/validateId'

const router = Router()

router.get(
    '/currency',
    auth(),
    refreshCurrencyRates(),
    CRUDController.get(CurrencyRateModel),
)

router.get(
    '/currency/conversion',
    auth(),
    refreshCurrencyRates(),
    validate('query', conversionCurrencyValidationRules),
    validateId(CurrencyRateModel, 'Currency Rate', 'from', 'query'),
    validateId(CurrencyRateModel, 'Currency Rate', 'to', 'query'),
    CurrencyController.getConversion,
)

router.get(
    '/currency/refresh-hard',
    auth({admin: true}),
    refreshCurrencyRates({hard: true}),
    CurrencyController.refreshCurrencyRates,
)

module.exports = router
