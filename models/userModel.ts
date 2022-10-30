const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
  }, {timestamps: true})

const User = mongoose.model( "User", UserSchema)

export default User