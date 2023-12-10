import {ValidationError} from '../../interfaces'

interface Options<Obj> {
    required?: boolean
    fieldName: keyof Obj
    requestObject: Obj
    errors: ValidationError<Obj>[]
}

export function validateRequired<Obj>(options: Options<Obj>) {
    const {required, fieldName, requestObject, errors} = options
    if (required && (requestObject[fieldName] === undefined || requestObject[fieldName] === null || requestObject[fieldName] === '')) {
        errors.push({field: fieldName, message: 'Field is required'})
    }
}
