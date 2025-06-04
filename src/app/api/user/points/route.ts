// Faire la route pour update les points
import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

const JWT_SECRET = process.env.JWT_SECRET!;


export async function POST(req: NextRequest){

    console.log("Réponse route /points");
    
    /* Faire en sorte d'ajouter les points puis de renvoyer le total de points */
    
    const cookieStored = await cookies();
    const token = cookieStored.get("token")?.value;
    
    if(!token){
        
        console.log("Erreur de récupération du token | Token inexistant");
        return NextResponse.json({message: "Token manquant"}, {status: 401});
    }
    
    let playerID: number;
    
    try{
        
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        playerID = decoded.playerID;
        
    }catch{
        
        return NextResponse.json({message: "Token invalide"}, {status: 401});
    }
    
    
    const response = await req.json();
    const pointsToAdd = response.pointsToAdd;
    
    if(!pointsToAdd ||pointsToAdd < 1){
        
        console.log("Erreur de récupération des points gagnés");
        return NextResponse.json({message: "Points invalides"}, {status: 400});
    }

    await db.query("UPDATE Player SET points = points + ? WHERE playerID = ?", [pointsToAdd, playerID]);

    console.log("Points ajoutés à l'utilisateur " + playerID);

    interface PlayerPointsRow extends RowDataPacket{
        points: number ;
    };

    const [rows] = await db.query<PlayerPointsRow[]>("SELECT points FROM Player WHERE playerID= ?", [playerID]);
    const userTotalPoints = rows[0]?.points ?? 0;

    return NextResponse.json({totalPoints: userTotalPoints});

}