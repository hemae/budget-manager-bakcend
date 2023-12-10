import {FieldValueType, ValidationError} from '../../interfaces'
import {validateType} from '../validateType'
import {validateNumber} from '../validateNumber'
import {validateDateOnly} from '../validateDateOnly'

interface Options<Obj> {
    value: any[]
    fieldName: keyof Obj
    type: FieldValueType
    errors: ValidationError<Obj>[]
}

export function validateArray<Obj>(options: Options<Obj>) {

    const {value, fieldName, errors, type} = options

    if (!value) {
        return
    }

    if (!Array.isArray(value)) {
        errors.push({field: fieldName, message: `Value: ${value} must be array but got ${typeof value}`})
        return
    }

    if (type.includes('array')) {

        validateArray({
            fieldName,
            value,
            errors,
            type: type.replace(':array', ''),
        })

    } else {

        value.forEach((element, index) => {
            validateType({
                fieldName: `${fieldName as string}[${index}]`,
                value: element,
                errors,
                type,
            })

            if (type.includes('number') && typeof element === 'number') {
                validateNumber({errors, value: element, fieldName, type})
            }

            if (type.includes('dateOnly') && typeof element === 'string') {
                validateDateOnly({errors, fieldName, value: element})
            }
        })

    }
}
