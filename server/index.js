require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()


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
