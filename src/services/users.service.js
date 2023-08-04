const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/users")
const Role = require("../models/roles")
const { secret } = require("./config")

function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" }) //задаем время жизни токена
}

class UserServices {

    async registration({ username, password }) {
        const candidate = User.findOne({ username })
        if (!candidate) throw new Error("Пользователь с таким именем уже существует")
        const hashPassword = bcrypt.hashSync(password, 7)
        const userRole = await Role.findOne({ value: "USER" })
        const user = new User({ username, password: hashPassword, roles: [userRole.value] })
        await user.save()
        return ({ message: `пользователь ${username} успешно зарегистрирован` })

    }

    async authorisation({ username, password }) {
        const user = await User.findOne({ username })
        if (!user) throw new Error("Пользователь с таким именем не найден")
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) throw new Error("Неверный пароль")
        const token = generateAccessToken(user._id, user.roles)
        return ({
            username: username,
            token: token
        })
    }

}

module.exports = new UserServices