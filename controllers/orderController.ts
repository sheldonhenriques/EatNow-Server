import Order from '../models/order'
import { Request, Response} from 'express'

const getTotal = (req, res) => {
    Order.find({userId : req.params.user_id},(err, Orders) => {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err)
          }
          var subTotal=0
          for (var i=0;i<Orders.length;i++){
              subTotal+=Orders[i]['total']
          }
          var taxPercent=7.5
          var tax=(taxPercent/100)*subTotal
          var estimatedTotal=subTotal+tax

         res.json({"subTotal":subTotal,"estimatedTotal":estimatedTotal,"tax":tax});// return all Order in JSON format
      });
    
  };

  const getOrder = (req, res) => {
    Order.find({userId : req.params.user_id}, (err, Orders) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err)
        }
        res.json(Orders) // return all Order in JSON format
    })
}


const getTotalBill = (req: Request, res: Response): void => {
    // use mongoose to get all Orders in the database
     getTotal(req, res)
}

// api ---------------------------------------------------------------------
// get all Orders


const getAllOrders = (req: Request, res: Response): void => {
    // use mongoose to get all Orders in the database
    getOrder(req, res)
}

// create Order and send back all Orders after creation


const createOrder = (req: Request, res: Response): void => {
    // create a Order, information comes from AJAX request from Angular
    Order.create({
        foodName: req.body.foodName,
        price:req.body.price,
        quantity:req.body.quantity,
        total:req.body.total,
        userId:req.body.userId,
        done: false
    }, (err, Order) => {
        if (err) res.send(err)
        // get and return all the Orders after you create another
        getOrder(req, res)
    })
}

// delete a Order

const deleteOrder = (req: Request, res: Response): void =>{
    Order.deleteOne({
        _id: req.params.food_id,
        userId: req.params.user_id,
    }, (err) => {
        if (err) res.send(err)
        getOrder(req, res)
    })
}

export {
    getTotalBill,
    getAllOrders,
    createOrder,
    deleteOrder
}