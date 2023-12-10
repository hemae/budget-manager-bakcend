export function getValueFromString(stringValue: string | undefined): string | number | undefined | null | boolean {
    if (stringValue === undefined) return undefined
    if (!Number.isNaN(+stringValue)) return +stringValue
    if (stringValue === 'null') return null
    if (stringValue === 'true') return true
    if (stringValue === 'false') return false
    return stringValue
}
