import {Schema, model, Document} from 'mongoose'

export interface InviteDocument extends Document {
    accepted: boolean
    byUserId: string
    toUserId: string
    projectId: string
}

const inviteSchema = new Schema<InviteDocument>({
    accepted: {type: Boolean, required: true},
    byUserId: {type: String, required: true},
    toUserId: {type: String, required: true},
    projectId: {type: String, required: true},
}, { timestamps: true})

export const InviteModel = model('Invite', inviteSchema)
