export interface DateInfo<V> {
    date: string | null
    expensesByCategory: Record<string, V>
    incomesByCategory: Record<string, V>
}
