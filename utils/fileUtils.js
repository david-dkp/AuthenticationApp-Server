const path = require("path")

const getStaticUrlFromPath = (fullPath) => {
    return process.env.SERVER_URL + "/" + path.basename(fullPath)
}

module.exports = {
    getStaticUrlFromPath
}