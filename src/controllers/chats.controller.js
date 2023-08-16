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
            console.log(name)
            await Chat.findByNameAndDelete(name);
            res.status(200).json({ message: `Чат ${name} успешно удален` });
        } catch (error) {
            res.status(500).json({ error: 'Не получилось удалить чат' });
        }
    };

    async updateChat(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedChat = await Chat.findByIdAndUpdate(id, { name }, { new: true });
            res.status(200).json(updatedChat);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update chat' });
        }
    };

    async getAllChats(req, res) {
        try {
            console.log("+")
            const chats = await Chat.find();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get chats' });
        }
    };

}

module.exports = new ChatController()
