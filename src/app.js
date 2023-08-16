const express = require("express")
const users=require("./routers/users.router")
const chats = require("./routers/chats.router")
const app = express()

app.use(express.json())

app.use("/users", users)
app.use("/chats", chats)

module.exports= app

//comit