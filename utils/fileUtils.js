const path = require("path")

const getStaticUrlFromPath = (fullPath) => {
    return "http://localhost:" + process.env.PORT + "/" + path.basename(fullPath)
}

module.exports = {
    getStaticUrlFromPath
}