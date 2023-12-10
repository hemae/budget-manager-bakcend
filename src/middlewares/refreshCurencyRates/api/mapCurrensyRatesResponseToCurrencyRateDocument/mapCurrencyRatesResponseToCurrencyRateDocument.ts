import {CurrencyRatesResponse} from '../getCurrencyRates'
import {BaseCurrencyRateDocument} from '../../../../models/CurrencyRate/currencyRate.model'

export function mapCurrencyRatesResponseToCurrencyRateDocument(response: CurrencyRatesResponse, target = 'USD'): BaseCurrencyRateDocument[] | null {

    const {rates} = response

    if (!rates) return null

    const documents: BaseCurrencyRateDocument[]  = []

    const eurTargetRate = rates[target]

    if (!eurTargetRate) return null

    Object
        .keys(rates)
        .forEach(rateCode => {
            documents.push({
                rateCode,
                value: rates[rateCode] / eurTargetRate,
                base: target,
            })
        })

    return documents
}
