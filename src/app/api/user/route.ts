import db from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";

/* Route qui enregistre les infos lors de l'inscription du joueur */
export async function POST(req: NextRequest){

    const saltRounds = 10;

    const userInfos = await req.json();
    console.log(userInfos);
    const username = userInfos.username;
    const userPassword = userInfos.password;
    console.log(userPassword);
    const userEmail = userInfos.email;

    const hashedPassword =  await bcrypt.hash(userPassword, saltRounds);

    console.log("Mot de passe hashé : " + hashedPassword);

    /* Stock du hashed password, ajout des infos dans la BDD et initialisation des points à 0 */
    const [result] = await db.query<ResultSetHeader>("INSERT INTO Player (username, password, points, email)  VALUES (?, ?, ?, ?)", [username, hashedPassword, 0, userEmail]);
    
    const playerInfos = {

        username: username,
        playerID: result.insertId,
    }   

    console.log("Pseudo reçu backend : " + username);

    return NextResponse.json(playerInfos);
}