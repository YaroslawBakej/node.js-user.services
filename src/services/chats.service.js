const Chat = require('../models/chats')


class ChatServices {
    async createChat({ name, password }) {
        console.log("в сервисы зашел")
        const findChat = Chat.findOne({ name })
        if (!findChat) throw new Error("Чат с таким именем уже существует")
        const chat = new Chat({ name, password })
        console.log(chat)
        await chat.save()
        return ({ message: `чат ${name} успешно создан` })
    }

}


module.exports = new ChatServices