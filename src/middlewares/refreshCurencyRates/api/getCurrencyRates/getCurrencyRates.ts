import axios from 'axios'
import {CURRENCY_URI} from './lib'
import {CurrencyRatesResponse} from './interfaces'

export async function getCurrencyRates() {
    const {data} = await axios.get<CurrencyRatesResponse>(CURRENCY_URI)
    return data
}
