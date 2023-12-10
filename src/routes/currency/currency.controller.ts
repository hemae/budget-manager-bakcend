import {Request, Response} from 'express'
import {handle500, handleSuccess} from '../../utils/responseHandlers'

export class CurrencyController {

    public static getConversion(req: Request, res: Response) {
        try {
            // @ts-ignore
            const {validated: {from, to}} = req.query
            // @ts-ignore
            const convertedValue = to.value / from.value
            handleSuccess(res, {value: convertedValue})
        } catch (e) {
            handle500(e, res)
        }
    }

    public static refreshCurrencyRates(req: Request, res: Response) {
        try {
            handleSuccess(res, {message: 'Currency rates were updated successfully'})
        } catch (e) {
            handle500(e, res)
        }
    }
}
