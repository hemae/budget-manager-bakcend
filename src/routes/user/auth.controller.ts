import {NextFunction, Request, Response} from 'express'
import {UserModel} from '../../models/User'
import {
    handle500,
    handleClientError,
} from '../../utils/responseHandlers'
import crypt from 'hans-cryptor'

export class AuthController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const hashedPassword = crypt.encrypt(password, 'test')
            const user = new UserModel({email, password: hashedPassword})
            await user.save()
            req.body = {...req.body, user}
            next()
        } catch (e) {
            handle500(e, res)
        }
    }

    static async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const {password, user} = req.body
            const isMatchPassword = crypt.compare(password, user.password, 'test')
            if (!isMatchPassword) {
                return handleClientError(res, {
                    errors: [{field: null, message: 'Invalid email or password'}],
                    message: 'Authentication occurs 1 error',
                })
            }
            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}
