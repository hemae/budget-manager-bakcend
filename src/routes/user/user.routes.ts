import {Router} from 'express'
import {CRUDController} from '../../CRUDController'
import {AuthController} from './auth.controller'
import {UserModel} from '../../models/User'
import {validate} from '../../middlewares/validate'
import {checkUser} from '../../middlewares/checkUser'
import {auth} from '../../middlewares/auth'
import {generateTokenAndResponse} from '../../middlewares/generateTokenAndResponse'
import {validatePaginationQuery} from '../../middlewares/validatePaginationQuery'
import {
    authenticateValidationRules,
    userPostValidationRules,
    userPutValidationRules,
    registerValidationRules,
} from './validationRules'
import {validateId} from '../../middlewares/validateId'
import {CurrencyRateModel} from '../../models/CurrencyRate'

const router = Router()

router.get(
    '/user',
    auth(),
    validatePaginationQuery,
    CRUDController.get(UserModel),
)

router.get(
    '/user/:id',
    auth(),
    CRUDController.getById(UserModel, 'User'),
)

router.post(
    '/user',
    auth({admin: true}),
    validate('body', userPostValidationRules),
    validateId(CurrencyRateModel, 'Currency Rate', 'preferredCurrencyId', 'body'),
    CRUDController.post(UserModel),
)

router.put(
    '/user/:id',
    auth(),
    validate('body', userPutValidationRules),
    validateId(CurrencyRateModel, 'Currency Rate', 'preferredCurrencyId', 'body'),
    CRUDController.put(UserModel, 'User'),
)

router.delete(
    '/user/:id',
    auth({admin: true}),
    CRUDController.delete(UserModel, 'User'),
)

router.get(
    '/auth/token',
    auth({pushUserToBody: true}),
    generateTokenAndResponse,
)

router.post(
    '/auth/register',
    validate('body', registerValidationRules),
    checkUser('not-exists'),
    AuthController.register,
    generateTokenAndResponse,
)

router.post(
    '/auth/authenticate',
    validate('body', authenticateValidationRules),
    checkUser('exists'),
    AuthController.authenticate,
    generateTokenAndResponse,
)

module.exports = router
