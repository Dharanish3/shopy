import express from 'express'
import UserRouter from './UserRoutes.js'
import AdminRouter from './AdminRoutes.js'
import CategoryRouter from './CategoriesRoutes.js'
import ProductRouter from './ProductRoutes.js'
import OrderRouter from './OrderRoutes.js'

const router = express.Router()


router.get('/' , (req,res) => {
    res.send("Hello")
})

router.use('/user' , UserRouter)    
router.use('/admin' , AdminRouter)    
router.use('/category' , CategoryRouter)    
router.use('/products' , ProductRouter) 
router.use('/order', OrderRouter)   


export default router