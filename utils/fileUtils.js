const path = require("path")

const getStaticUrlFromPath = (fullPath) => {
    return "localhost:8000/"+path.basename(fullPath)
}

module.exports = {
    getStaticUrlFromPath
}