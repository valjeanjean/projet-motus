import db from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest){

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const userInfos = await req.json();
    console.log(userInfos);
    const username = userInfos.username;
    const userPassword = userInfos.password;

    bcrypt.hash(userPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log();
    });

    const userEmail = userInfos.email;

    /* Ajout des infos dans la BDD et initialisation des points à 0 */
    const [result] = await db.query<ResultSetHeader>("INSERT INTO Player (username, password, points, email)  VALUES (?, ?, ?, ?)", [username, userPassword, 0, userEmail]);

    /* Ajouter une colonne email dans la table Player */
    
    const playerInfos = {

        username: username,
        playerID: result.insertId,
    }

    // Récupérer insertID ? 
    // const something = await db.query(insert...)
    // const gameID = something.insertID ?
    //
    // puis avec : 
    // INSERT INTO Game (playerID) WHERE gameID = (?), [gameID] ?

    /* 
    
        INSERT le playerID pour la table Game ici ? Après avoir select le playerID
        créer suite à l'insertion du pseudo
    
    */

    

    console.log("Pseudo reçu backend : " + username);
    /* 
    
    De l'autre côté pour le composant qui récupère la réponse,
    faire un useState pour le pseudo et faire setUsername(object.username)
    
    */
    return NextResponse.json(playerInfos);
}