import mysql from "mysql2/promise";

/* mysql.createConnection asynchrone ? */
/* mysql.createPool ? */

const db = await mysql.createConnection({

    host: "127.0.0.1",
    port: 3306,
    user: "motus_user",
    password: "motus_laplateforme",
    database: "projet_motus"
});

export default db;