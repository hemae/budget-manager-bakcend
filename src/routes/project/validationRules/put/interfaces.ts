export interface ProjectPutBody {
    name: string
    description?: string | null
    color?: string | null
    assignedUserIds: string[]
    adminUserIds: string[]
    settlementDate: string
}
