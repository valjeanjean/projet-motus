import mysql from "mysql2/promise";

/* mysql.createConnection asynchrone ? */
const db = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "motus_user",
    password: "motus_laplateforme",
    database: "projet_motus"
});

export default db;