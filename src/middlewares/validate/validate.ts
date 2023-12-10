import {Request, Response, NextFunction} from 'express'
import {FieldParam, ValidatedObject, ValidationError} from './interfaces'
import {
    getValueFromString,
    validateRequired,
    validateType,
    validateNumber,
    validateDateOnly,
    validateArray,
} from './lib'
import {handle500, handleClientError} from '../../utils/responseHandlers'

export function validate<Obj>(object: ValidatedObject, fields: FieldParam<Obj>[]) {
    return async function(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') return next()
        try {

            const requestObject = req[object]

            if (!requestObject) {
                return handleClientError(res, {message: `Request ${object} is undefined`})
            }

            const errors: ValidationError<Obj>[] = []

            fields.forEach(field => {

                const {fieldName, required, type} = field

                validateRequired({errors, fieldName, required, requestObject})

                const value = object === 'query'
                    ? getValueFromString(requestObject[fieldName] as string | undefined)
                    : requestObject[fieldName]

                if (type.includes('array')) {

                    validateArray({
                        fieldName,
                        value,
                        errors,
                        type: type.replace(':array', ''),
                    })

                } else {
                    validateType({errors, value, fieldName, type})

                    if (type.includes('number') && typeof value === 'number') {
                        validateNumber({errors, value, fieldName, type})
                    }

                    if (type.includes('dateOnly') && typeof value === 'string') {
                        validateDateOnly({errors, fieldName, value})
                    }

                }
            })

            if (errors.length) {
                return handleClientError(res, {errors, message: `${object} validation occurs ${errors.length} errors`})
            }

            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}
