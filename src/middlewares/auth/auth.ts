import {Request, Response, NextFunction} from 'express'
import {handle500, handleClientError} from '../../utils/responseHandlers'
import {extractToken} from './lib'
import {UserDocument, UserModel} from '../../models/User'
import jwt from 'jsonwebtoken'

interface Options {
    /** default: false */
    pushUserToBody?: boolean
    /** default: user */
    userFieldName?: string
    /** default: false */
    pushUserIdToBody?: boolean
    /** default: userId */
    userIdFieldName?: string
    /** default: false */
    admin?: boolean
}

export function auth(options: Options = {pushUserToBody: false}) {

    const {
        pushUserToBody = false,
        userFieldName = 'user',
        pushUserIdToBody = false,
        userIdFieldName = 'userId',
        admin = false,
    } = options

    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === 'OPTIONS') return next()

            const {authorization} = req.headers

            const token = extractToken(authorization)

            const handleUnauthorized = () => {
                return handleClientError(res, {
                    errors: [{message: 'User is unauthorized'}],
                    message: 'Authorization occurs 1 error',
                }, 401)
            }

            if (!token) return handleUnauthorized()

            try {
                const result = jwt.verify(token, 'test') as UserDocument
                const _id = result?._id
                if (!_id) return handleUnauthorized()
                const user = await UserModel.findById(_id)
                if (!user) return handleUnauthorized()
                if (admin) {
                    if (user.role !== 'admin') {
                        return handleClientError(res, {
                            errors: [{message: 'No Access'}],
                            message: 'Authorization occurs 1 error',
                        }, 403)
                    }
                }
                if (pushUserToBody) req.body = {...req.body, [`${userFieldName}`]: user}
                if (pushUserIdToBody) req.body = {...req.body, [`${userIdFieldName}`]: _id}
            } catch (e: any) {
                console.log(e)
                return handleUnauthorized()
            }

            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}