import {Request, Response, NextFunction} from 'express'
import {handle500} from '../../utils/responseHandlers'
import {CurrencyRateModel} from '../../models/CurrencyRate'

export function putCurrencyRatesToBody(rateCodes: string[] | null = null) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {

            const ratesQuery = CurrencyRateModel.find()

            if (rateCodes) {
                ratesQuery.or(rateCodes.map(rateCode => ({rateCode})))
            }

            const rates = await ratesQuery.exec()

            const ratesObject: Record<string, number> = {}

            rates.forEach(rate => {
                ratesObject[rate.rateCode] = rate.value
            })

            req.body = {...req.body, ...ratesObject}

            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}
