const app = require("./src/app")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017')
        app.listen(PORT, () => console.log(`server run on ${PORT} port`))
    } catch (error) {
        console.log(error);
    }
}

start()