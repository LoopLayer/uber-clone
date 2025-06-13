import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app= express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())


import userRoutes from './routes/user.routes.js'

app.use("/api/v1/users",userRoutes)

// http://localhost:5000/api/v1/users/register

import captainRoutes from './routes/captain.routes.js'
app.use("/api/v1/captains", captainRoutes)



export {app}