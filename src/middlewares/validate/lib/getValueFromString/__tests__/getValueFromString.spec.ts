import {getValueFromString} from '../getValueFromString'

const mockNumberPositive = '5'
const expectedNumberPositive = 5

const mockNumberNegative = '-5'
const expectedNumberNegative = -5

const mockTrue = 'true'
const expectedTrue = true

const mockFalse = 'false'
const expectedFalse = false

const mockNull = 'null'
const expectedNull = null

const mockString = 'string'
const expectedString = 'string'

const mockUndefined = undefined
const expectedUndefined = undefined

describe('getValueFromString function', () => {
    it('getValueFromString works | number | negative', () => {
        expect(getValueFromString(mockNumberPositive)).toBe(expectedNumberPositive)
    })

    it('getValueFromString works | number | positive', () => {
        expect(getValueFromString(mockNumberNegative)).toBe(expectedNumberNegative)
    })

    it('getValueFromString works | true', () => {
        expect(getValueFromString(mockTrue)).toBe(expectedTrue)
    })

    it('getValueFromString works | false', () => {
        expect(getValueFromString(mockFalse)).toBe(expectedFalse)
    })

    it('getValueFromString works | null', () => {
        expect(getValueFromString(mockNull)).toBe(expectedNull)
    })

    it('getValueFromString works | string', () => {
        expect(getValueFromString(mockString)).toBe(expectedString)
    })

    it('getValueFromString works | undefined', () => {
        expect(getValueFromString(mockUndefined)).toBe(expectedUndefined)
    })
})
