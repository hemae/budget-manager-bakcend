import mongoose from 'mongoose'

const uri = 'mongodb://0.0.0.0:27017'

export async function mongooseConnectMongo() {
    await mongoose.connect(uri)
}
