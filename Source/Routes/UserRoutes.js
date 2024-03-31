import express from 'express'
import UserController from '../Controller/UserController.js'
import Authnticate from "../Auth/Authentication.js";
const router = express.Router()


router.get('/all' ,  UserController.getUser)
router.post('/sign-up' , UserController.createUser)
router.post('/login' , UserController.login)
router.get('/:_id' , UserController.getUserID)
router.put('/:_id' , UserController.editUserID)
// router.get('/profile' , UserController.getUserByID)
router.delete('/:_id' , UserController.deleteUser)


export default router