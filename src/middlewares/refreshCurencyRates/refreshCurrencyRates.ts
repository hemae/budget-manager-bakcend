import {NextFunction, Request, Response} from 'express'
import {handle500} from '../../utils/responseHandlers'
import {CurrencyRateModel} from '../../models/CurrencyRate'
import {getCurrencyRates, mapCurrencyRatesResponseToCurrencyRateDocument} from './api'

interface Options {
    /** default: false */
    hard?: boolean
}

export function refreshCurrencyRates(options: Options = {hard: false}) {
    const {hard = false} = options
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === 'OPTIONS') return next()

            const currencyRates = await CurrencyRateModel.find().exec()

            if (!currencyRates.length) {
                const rates = mapCurrencyRatesResponseToCurrencyRateDocument(await getCurrencyRates())
                if (!rates) throw new Error('Cannot get currency rates')
                for (let rate of rates) {
                    const rateEntity = await CurrencyRateModel.create(rate)
                    await rateEntity.save()
                }
                return next()
            }

            const today = Date.now()
            // @ts-ignore
            const updatedAt = Date.parse(currencyRates[0].updatedAt)
            const updatingTimeDifference = today - updatedAt

            if (updatingTimeDifference / (1_000 * 60 * 60) > 12 || hard) {
                const rates = mapCurrencyRatesResponseToCurrencyRateDocument(await getCurrencyRates())
                if (!rates) return next()
                for (let rate of rates) {
                    await CurrencyRateModel.findOneAndUpdate({rateCode: rate.rateCode}, {value: rate.value})
                }
            }

            next()
        } catch (e) {
            handle500(e, res)
        }
    }
}
