export function getNumberFromCondition(condition: string, onlyCondition: string): number | null {
    const number = condition.replace(onlyCondition, '')
    if (isNaN(+number)) return null
    return +number
}
