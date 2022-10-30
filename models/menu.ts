import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
    foodName: {
        type: String,
        default: ''
    },
    price:{
    	type:Number
    }
}, {timestamps: true})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu