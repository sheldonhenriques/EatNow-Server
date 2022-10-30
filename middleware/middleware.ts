import db from '../models'
import jwt from 'jsonwebtoken'
const User = db.user

const setHeaders = (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next()
}

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" })
        return;
      }
  
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
  
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" })
          return
        }
  
        next()
      })
    })
  }

  const verifyToken = (req, res, next) => {
    let token = req.session.token
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" })
    }
  
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" })
      }
      req.userId = decoded.id
      next()
    })
  }

export {
    setHeaders,
    checkDuplicateUsernameOrEmail,
    verifyToken
}