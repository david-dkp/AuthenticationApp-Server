const path = require("path")

const getStaticUrlFromPath = (fullPath) => {
    return "http://localhost:8000/"+path.basename(fullPath)
}

module.exports = {
    getStaticUrlFromPath
}