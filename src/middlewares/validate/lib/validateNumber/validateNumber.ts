import {FieldValueType, ValidationError} from '../../interfaces'
import {getNumberFromCondition} from './lib'

interface Options<Obj> {
    value: number
    fieldName: keyof Obj
    type: FieldValueType
    errors: ValidationError<Obj>[]
}

export function validateNumber<Obj>(options: Options<Obj>) {

    const {value, fieldName, type, errors} = options

    const [_, condition] = type.split(':')
    if (!condition) return
    if (condition.includes('lte')) {
        const conditionNumber = getNumberFromCondition(condition, 'lte')
        if (conditionNumber === null) {
            errors.push({field: fieldName, message: 'Wrong number condition'})
            return
        }
        if (value > conditionNumber) {
            errors.push({field: fieldName, message: `Value of field must be less than ${conditionNumber} or equal, but got ${value}`})
        }
        return
    }
    if (condition.includes('gte')) {
        const conditionNumber = getNumberFromCondition(condition, 'gte')
        if (conditionNumber === null) {
            errors.push({field: fieldName, message: 'Wrong number condition'})
            return
        }
        if (value < conditionNumber) {
            errors.push({field: fieldName, message: `Value of field must be greater than ${conditionNumber} or equal, but got ${value}`})
        }
        return
    }
    if (condition.includes('lt')) {
        const conditionNumber = getNumberFromCondition(condition, 'lt')
        if (conditionNumber === null) {
            errors.push({field: fieldName, message: 'Wrong number condition'})
            return
        }
        if (value >= conditionNumber) {
            errors.push({field: fieldName, message: `Value of field must be less than ${conditionNumber}, but got ${value}`})
        }
        return
    }
    if (condition.includes('gt')) {
        const conditionNumber = getNumberFromCondition(condition, 'gt')
        if (conditionNumber === null) {
            errors.push({field: fieldName, message: 'Wrong number condition'})
            return
        }
        if (value <= conditionNumber) {
            errors.push({field: fieldName, message: `Value of field must be greater than ${conditionNumber}, but got ${value}`})
        }
        return
    }
    if (condition.includes('eq')) {
        const conditionNumber = getNumberFromCondition(condition, 'eq')
        if (conditionNumber === null) {
            errors.push({field: fieldName, message: 'Wrong number condition'})
            return
        }
        if (value !== conditionNumber) {
            errors.push({field: fieldName, message: `Value of field must be equal ${conditionNumber}, but got ${value}`})
        }
        return
    }
}
