import { Request, Response} from 'express'
import db from '../models'
const User = db.user;

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const signup = (req: Request, res: Response): void => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    user.save((err) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        res.send({ message: "User was registered successfully!" })
    })
  })
}

const signin = (req: Request, res: Response): void => {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" })
      }

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: 86400, // 24 hours
      })

      req['session.token'] = token
      req['session.userId'] = user._id

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
      })
    })
}

const signout = (req: Request, res: Response): void => {
  try {
    req['session'] = null;
    res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

export {
    signup,
    signin,
    signout
}