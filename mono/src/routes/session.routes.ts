import { Router } from 'express'
import { UserController } from '../controllers/session.controller'
import { UserToken } from '../controllers/token.controller'

const router = Router()
const controllerUser = new UserController()
const controllerToken = new UserToken()

router.post('/register', controllerUser.register)

router.post('/login', controllerUser.login)

router.get('/token', controllerToken.token)

export default router
