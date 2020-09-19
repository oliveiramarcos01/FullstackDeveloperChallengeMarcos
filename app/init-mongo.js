db.createUser({
    user: "root",
    pwd: "1vacanaovoa",
    roles: [
        {
            role: "readWrite",
            db: "challengedb"
        }
    ]
})