const sqlite = require("sqlite3")

const user = require("../models/user")

let db = null

const initialize = () => {
    if (db) return
    db = new sqlite.Database("authapp.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
        if (err) {
            console.log("Something went wrong when oppening / creating the database: " + err.toString())
        } else {
            console.log("Database successfully opened")
        }
    })

    db.run(user.tableCreationSql, (err) => {
        if (err) console.log(err.message)
    })

}

module.exports = {
    initialize,
    getDb: () => {
        return db
    }
}