const tableName = "user_table"

module.exports = {
    tableCreationSql: `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT NOT NULL,
            password TEXT,
            bio TEXT,
            phone_number TEXT,
            profile_picture_path TEXT
        )
    `
}