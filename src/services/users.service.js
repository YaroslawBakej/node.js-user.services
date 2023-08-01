const bcrypt = require("bcryptjs")

const User = require("../models/users")
const Role = require("../models/roles")

class UserServices {

    async registration({ username, password }) {
        const candidate = User.findOne({ username })
        if (!candidate) throw new Error("this user exist")
        const hashPassword = bcrypt.hashSync(password, 7)
        const userRole = await Role.findOne({ value: "USER" })
        const user = new User({ username, password: hashPassword, roles: [userRole.value] })
        await user.save()
        return res.json({ message: `пользователь ${username} успешно зарегистрирован` })
    }

}

module.exports = new UserServices