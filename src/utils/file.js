const { unlink } = require("fs/promises")
const { dirname, join } = require("path")
const { fileURLToPath } = require("URL")

const _dirname = dirname(fileURLToPath(import.meta.url))
const fileDir = join(_dirname, '../files')

const getFilePath = (filePath) => join(fileDir, filePath)

const removeFile = async (filePath) => {
    try {
        await unlink(join(fileDir, filePath))
    } catch (error) {
        res.status(500).json({ error: 'Не получилось удалить файл' });
    }
}

module.exports = getFilePath, removeFile