import {Request, Response, NextFunction} from 'express'
import {handle500, handleClientError} from '../../utils/responseHandlers'
import {UserModel} from '../../models/User'

export function checkUser(skipIf: 'exists' | 'not-exists') {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === 'OPTIONS') return next()
            const {email} = req.body
            const user = await UserModel.findOne({email})

            if (skipIf === 'exists') {
                if (!user) {
                    return handleClientError(res, {
                        errors: [{fieldName: null, message: 'Invalid email or password'}],
                        message: 'Authentication occurs 1 error',
                    })
                }
                req.body = {...req.body, user}
            } else {
                if (!!user) {
                    return handleClientError(res, {
                        errors: [{fieldName: 'email', message: `User with email: ${email} already exists`}],
                        message: 'Registration occurs 1 error',
                    })
                }
            }
            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}
