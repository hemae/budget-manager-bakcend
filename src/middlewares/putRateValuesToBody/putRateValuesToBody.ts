import {Request, Response, NextFunction} from 'express'
import {handle500} from '../../utils/responseHandlers'
import {CurrencyRateModel} from '../../models/CurrencyRate'

export function putRateValuesToBody(fieldNames: string[]) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {

            const {currencyId} = req.body

            const rate = await CurrencyRateModel.findById(currencyId)

            fieldNames.forEach(fieldName => {
                // @ts-ignore
                req.body = {...req.body, [fieldName]: rate.value}
            })

            // @ts-ignore
            req.body = {...req.body, rateCode: rate.rateCode}

            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}
