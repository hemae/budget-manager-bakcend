import {Schema, model, Document} from 'mongoose'

export interface ProjectDocument extends Document {
    name: string
    description: string | null
    color: string | null
    founderUserId: string
    assignedUserIds: string[]
    adminUserIds: string[]
    settlementDate: string
}

const userSchema = new Schema<ProjectDocument>({
    name: {type: String, required: true},
    description: {type: String, required: false, default: null},
    color: {type: String, required: false, default: null},
    founderUserId: {type: String, required: true},
    assignedUserIds: {type: [String], required: true},
    adminUserIds: {type: [String], required: true},
    settlementDate: {type: String, required: true},
}, { timestamps: true})

export const ProjectModel = model('Project', userSchema)
