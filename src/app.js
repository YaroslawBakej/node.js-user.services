const express = require("express")
const users=require("./routers/users.router")

const app = express()

app.use(express.json())

app.use("/users", users)

module.exports= app

//comit