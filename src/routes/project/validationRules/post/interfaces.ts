export interface ProjectPostBody {
    name: string
    description?: string | null
    color?: string | null
    founderUserId: string
    settlementDate: string
}
