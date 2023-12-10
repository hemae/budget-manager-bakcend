export interface UserPostBody {
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    role: string | null
    preferredCurrencyId?: string | null
}
