import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){

    const username = await req.json();

    await db.query("INSERT INTO Player (username)  VALUES (?)", [username]);

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
    return NextResponse.json(username);
}