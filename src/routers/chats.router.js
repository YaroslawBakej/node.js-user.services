const Router = require("express")
const router = new Router()

const chatController = require("../controllers/chats.controller");

router.post('/', chatController.createChat);
router.delete('/delete/:name', chatController.deleteChat);
router.put('/update/:name', chatController.updateChat);
router.get('/', chatController.getAllChats);

module.exports = router;