import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    foodName: {
        type: String,
        default: ''
    },
    price:{
    	type:Number
    	
    },
    quantity:{
        type:Number,
        default:1
    },
    total:{
        type:Number
    },
    userId: {
    	type:String	
    },
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)

export = Order