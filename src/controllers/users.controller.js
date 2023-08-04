const { validationResult } = require("express-validator")

const userServices = require("../services/users.service")

class UserController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new Error("неверные имя пользователя или пароль")
            const { username, password } = req.body
            res.status(200).send(await userServices.registration({ username, password }))
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async authorisation(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new Error("неверные имя пользователя или пароль")
            const { username, password } = req.body
            res.status(200).send(await userServices.authorisation({ username, password }))
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message)
        }
    }

    async getUser(req, res) {
        try {
            res.status(200).send(await userServices.getUsers())
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

module.exports = new UserController()