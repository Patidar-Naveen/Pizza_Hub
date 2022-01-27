import express from 'express'
import cors from 'cors'

import postRoutes from './Routes/postRoutes.js'
const app = express()
const port = 5000; 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/posts",postRoutes)

app.listen(port,e=>{
    if(e) throw e
    else{
        console.log(`Listening on port ${port}`)
    }
})