require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()


//middlewares
app.use(cors())
app.use(express.json())

//routes
const userRouter = require('./routes/userRoutes')

app.use("/api/auth",userRouter)

const start = async () => {
    const PORT = process.env.PORT || 8000
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
