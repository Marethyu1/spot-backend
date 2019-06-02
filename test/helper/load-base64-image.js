const bitmap = require("./load-image")
const encodedImage = Buffer.from(bitmap).toString("base64")
module.exports = encodedImage
