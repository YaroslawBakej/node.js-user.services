const Router = require("express")
const { check } = require("express-validator")

const router = new Router()
const userController = require("../controllers/users.controller")

router.post("/authorisation", userController.authorisation)
router.post("/registration",
    [
        check("username", "имя пользователя не может быть пустым").notEmpty(),
        check("password", "пароль должен быть более 4 символов").isLength({ min: 4 })
    ],
    userController.registration)
router.get("/", userController.getUser)

module.exports = router