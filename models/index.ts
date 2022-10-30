import mongoose from 'mongoose'
import User from './userModel'
mongoose.Promise = global.Promise

const db: Record<string, any> = {
    mongoose : mongoose,
    user: User
}

export default db