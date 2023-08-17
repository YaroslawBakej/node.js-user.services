const { Schema, model } = require("mongoose")

const messageSchema = new Schema(
    {
        userName: { type: String, required: true },
        userId: { type: String, required: true },
        textOrPathToFile: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model('Message', messageSchema);