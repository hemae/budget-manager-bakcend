export type ValidatedObject = 'query'
    | 'body'

export type FieldValueType = 'string'
    | 'number'
    | 'boolean'
    | 'string:dateOnly'
    | 'string:array'
    | 'number:array'
    | 'string:dateOnly:array'
    | 'boolean:array'
    | string

export interface FieldParam<Object> {
    /** name of request Object field */
    fieldName: keyof Object
    /** request Object field is required, default: false */
    required?: boolean
    /** type of request Object field */
    type: FieldValueType
    gt?: number
    lt?: number
}

export interface ValidationError<Object> {
    /** name of request Object field */
    field: keyof Object | string
    message: string
}
