import express from 'express'
import AdminController from '../Controller/AdminController.js'
import Authnticate from "../Auth/Authentication.js";
const router = express.Router()


router.get('/all' ,  AdminController.getUser)
router.post('/sign-up' , AdminController.createUser)
router.post('/login' , AdminController.login)
router.get('/:_id' , AdminController.getUserByID)
router.delete('/:_id' , AdminController.deleteUser)


export default router