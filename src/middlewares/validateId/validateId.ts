import {Request, Response, NextFunction} from 'express'
import {Model} from 'mongoose'
import {handle500, handleClientError} from '../../utils/responseHandlers'

export function validateId(model: Model<any>, modelName: string, fieldName: string, obj: 'body' | 'query', byUserId = false) {
    return async function(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') return next()
        try {

            const targetId = req[obj][fieldName]
            if (!targetId) return next()

            const entity = await model.findById(targetId)
            if (!entity) {
                return handleClientError(res, {
                    errors: [{fieldName, message: `${modelName} with id: ${targetId} does not exists in database`}],
                    message: 'DB validation occurs 1 error',
                })
            }

            if (byUserId) {
                const {userId} = req.body
                const entityByUserIdAndName = await model.findOne({userId, _id: entity._id})
                if (!entityByUserIdAndName) {
                    return handleClientError(res, {
                        errors: [{fieldName, message: `${modelName} with id: ${targetId} does not exists in database`}],
                        message: 'DB validation occurs 1 error',
                    })
                }
            }

            req[obj] = {
                ...req[obj],
                validated: {
                    ...req[obj]?.validated,
                    [fieldName.replace('Id', '')]: entity,
                }
            }

            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}