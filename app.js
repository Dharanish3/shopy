import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Routes from './Source/Routes/Web.js'

dotenv.config() //env variable 
const port = process.env.PORT || 8000; //port listen

const app = express()  //use app



app.use(express.json())
app.use(cors())
app.use(Routes)



app.listen(port, () => {
    console.log(`App Listening on ${port}`)
})

