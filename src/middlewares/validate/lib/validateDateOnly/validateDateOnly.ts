import {ValidationError} from '../../interfaces'

interface Options<Obj> {
    value: string
    fieldName: keyof Obj
    errors: ValidationError<Obj>[]
}

export function validateDateOnly<Obj>(options: Options<Obj>) {
    const {value, fieldName, errors} = options
    try {
        const dateErrors: string[] = []
        const [year, month, day] = value.split('-')
        if (year.length !== 4) {
            dateErrors.push(`Value: ${value} - has invalid dateOnly year format, must be YYYY`)
        }
        const numberMonth = +month
        if (isNaN(numberMonth)) {
            dateErrors.push(`Value: ${value} - has invalid dateOnly month format, must be MM`)
        }
        if (numberMonth <= 0 || numberMonth > 12) {
            dateErrors.push(`Value: ${value} - has invalid dateOnly month format, must be from 1 up to 12`)
        }
        const numberDay = +day
        if (isNaN(numberDay)) {
            dateErrors.push(`Value: ${value} - has invalid dateOnly day format, must be DD`)
        }
        if (numberDay <= 0 || numberDay > 31) {
            dateErrors.push(`Value: ${value} - has invalid dateOnly day format, must be from 1 up to 31`)
        }
        for (let error of dateErrors) {
            errors.push({field: fieldName, message: error})
        }
    } catch (e) {
        errors.push({field: fieldName, message: `Value: ${value} - has invalid dateOnly format, must be YYYY-MM-DD`})
    }
}
