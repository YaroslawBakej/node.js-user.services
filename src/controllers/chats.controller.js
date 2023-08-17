const Chat = require('../models/chats');
const chatServices = require("../services/chats.service")

class ChatController {
    async createChat(req, res) {
        try {
            const { name, password } = req.body;
            console.log({ name, password })
            res.status(200).send(await chatServices.createChat({ name, password }))
        } catch (error) {
            res.status(500).json({ error: 'Не получилось создать чат' });
        }
    }

    async deleteChat(req, res) {
        try {
            const { name } = req.params;
            await Chat.findOneAndDelete(name);
            res.status(200).json({ message: `Чат ${name} успешно удален` });
        } catch (error) {
            res.status(500).json({ error: 'Не получилось удалить чат' });
        }
    };

    async updateChat(req, res) {
        try {
            const { name } = req.params;
            const { setname } = req.body
            await Chat.findOneAndUpdate({ name }, { name: setname });
            res.status(200).json(`Чат ${name} сменил название на ${setname}`);
        } catch (error) {
            res.status(500).json({ error: "Не удалось изменить имя чата" });
        }
    };

    async getAllChats(req, res) {
        try {
            const chats = await Chat.find();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось получить список чатов' });
        }
    };

}

module.exports = new ChatController()
