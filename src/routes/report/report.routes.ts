import {Router} from 'express'
import {ReportController} from './report.controller'
import {auth} from '../../middlewares/auth'
import {validate} from '../../middlewares/validate'
import {
    getReportQueryValidationRules,
    getReportForCurrentDateDateQueryValidationRules,
    getReportRemainderByCurrenciesQueryValidationRules,
} from './validationRules'
import {refreshCurrencyRates} from '../../middlewares/refreshCurencyRates'
import {putCurrencyRatesToBody} from '../../middlewares/putCurrencyRatesToBody'
import {validateId} from '../../middlewares/validateId'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {ProjectModel} from '../../models/Project'

const router = Router()

router.get(
    '/report',
    auth(),
    refreshCurrencyRates(),
    putCurrencyRatesToBody(),
    validate('query', getReportQueryValidationRules),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'query'),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    ReportController.get,
)

router.get(
    '/report/for-current-date',
    auth(),
    refreshCurrencyRates(),
    putCurrencyRatesToBody(),
    validate('query', getReportForCurrentDateDateQueryValidationRules),
    validateId(CurrencyRateModel, 'Currency Rate', 'currencyId', 'query'),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    ReportController.getForCurrentDate,
)

router.get(
    '/report/remainders-by-currencies',
    auth(),
    refreshCurrencyRates(),
    putCurrencyRatesToBody(),
    validate('query', getReportRemainderByCurrenciesQueryValidationRules),
    validateId(ProjectModel, 'Project', 'projectId', 'query'),
    ReportController.getRemaindersByCurrencies,
)

module.exports = router
