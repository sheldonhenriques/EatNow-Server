require('dotenv').config()
import express from 'express'
import  * as authController from '../controllers/authController'
import  * as menuController from '../controllers/menuController'
import  * as orderController from '../controllers/orderController'
import * as middleware from '../middleware/middleware'
import cors from 'cors'
import cookieSession from 'cookie-session'

const app = express()
const port = process.env.PORT || 8080

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json())     // to support JSON-encoded bodies
app.use(express.urlencoded())

app.use(
  cookieSession({
    name: "eatnow-session",
    secret: process.env.COOKIE_SCERET,
    httpOnly: true
  })
);

app.use(middleware.setHeaders);

app.post(
  "/api/auth/signup",
  middleware.checkDuplicateUsernameOrEmail,
  authController.signup
);

app.post("/api/auth/signin", authController.signin)

app.post("/api/auth/signout", authController.signout)

// menu routes
app.get('/api/menu', menuController.getAllMenu)

app.post('/api/menu/all', menuController.postMenuItems)

app.post('/api/menu', menuController.postMenuItem)

// order routes
app.get('/api/food/total/:user_id', orderController.getTotalBill)

app.get('/api/food/:user_id', orderController.getAllOrders)

app.post('/api/food', orderController.createOrder)

app.delete('/api/food/:user_id/:food_id', orderController.deleteOrder)

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log({ level: "info", message: `Express is listening at http://localhost:${port}`})
})