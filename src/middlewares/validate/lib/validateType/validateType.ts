import {FieldValueType, ValidationError} from '../../interfaces'

interface Options<Obj> {
    type?: FieldValueType
    value: string | number | undefined | null | boolean
    fieldName: keyof Obj | string
    errors: ValidationError<Obj>[]
}

export function validateType<Obj>(options: Options<Obj>) {
    const {type, value, fieldName, errors} = options
    let clearType = type
    if (clearType?.includes('number')) {
        clearType = 'number'
    }
    if (clearType?.includes('string')) {
        clearType = 'string'
    }
    if (value !== undefined && typeof value !== clearType) {
        errors.push({field: fieldName, message: `Field value must be ${clearType}, but got ${typeof value}`})
    }
}
