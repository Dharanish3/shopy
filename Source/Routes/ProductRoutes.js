import express from 'express'
import ProductController from '../Controller/ProductsController.js'
const router = express.Router()
import upload from '../Utils/multer.js'


router.get('/' ,  ProductController.getProduct)
router.get('/paginate' ,  ProductController.getProductPage)
router.post('/add' , ProductController.createProduct)

router.get('/:_id' , ProductController.getProductById)
router.get('/:name' , ProductController.getProductByName)
router.put('/:_id' , ProductController. editProduct)
router.delete('/:_id' , ProductController.deletetProduct)


export default router