import {Schema, model, Document} from 'mongoose'

export interface UserDocument extends Document {
    firstName: string | null
    lastName: string | null
    email: string
    password: string
    role: 'admin' | 'user'
    preferredCurrencyId: string | null
}

const userSchema = new Schema<UserDocument>({
    firstName: {type: String, required: false, default: null},
    lastName: {type: String, required: false, default: null},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    preferredCurrencyId: {type: String, default: null},
}, { timestamps: true})

export const UserModel = model('User', userSchema)
