import {Request, Response} from 'express'
import {handle500, handleSuccess} from '../../utils/responseHandlers'
import jwt from 'jsonwebtoken'

export function generateTokenAndResponse(req: Request, res: Response) {
    try {
        const {user} = req.body
        // FIXME: non-standard
        const token = jwt.sign({...user._doc, password: 'secret'}, 'test', {expiresIn: '12h'})
        // FIXME: non-standard
        handleSuccess(res, {...user._doc, jwt: token})
    } catch (e) {
        handle500(e, res)
    }
}
