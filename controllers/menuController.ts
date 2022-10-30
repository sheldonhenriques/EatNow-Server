import Menu from '../models/menu'
import { Request, Response} from 'express'


const getMenu = (res: Response): void => {
    Menu.find((err, menuItems) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(menuItems); // return all Order in JSON format
    })
}



const getAllMenu = (req: Request, res: Response): void => {
// use mongoose to get all menu items from the database
    getMenu(res)
}

   

const postMenuItems = (req: Request, res: Response): void =>{
// use mongoose to post more than one Items in the database
    var menuItems=req.body
    for(var i=0;i<menuItems.length;i++){
        var item=menuItems[i]
        Menu.create({
        foodName: item.foodName,
        price:item.price,
        done: false
    }, function (err, Order) {
        if (err) res.send(err)
    })
    }
    getMenu(res)
}
  
  

const postMenuItem = (req: Request, res: Response): void => {

    // create a Order, information comes from AJAX request from Angular
    Menu.create({
        foodName: req.body.foodName,
        price:req.body.price,
        done: false
    }, function (err, Order) {
        if (err)
            res.send(err);
        getMenu(res)
    })

}

export {
    getAllMenu,
    postMenuItems,
    postMenuItem
}