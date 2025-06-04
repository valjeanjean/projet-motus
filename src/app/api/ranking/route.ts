/* Route pour récupérer les infos nécessaire à l'affichage du classement des joueurs */

import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest){

    const authHeader = req.headers.get("authorization");

    if(!authHeader?.startsWith("Bearer ")){

        return NextResponse.json({message: "Token invalide/absent"}, {status: 401});
    }

    const token = authHeader.split(" ")[1];
    if(!token){

        return NextResponse.json({message: "Aucun token"}, {status: 401});
    }

    try{

        jwt.verify(token, JWT_SECRET);
        const [rows] = await db.query("SELECT username, points FROM Player ORDER BY points DESC LIMIT 10");
        console.log("Tableau pseudos + points joueurs pour classement :");
        console.log(rows);
    
        return NextResponse.json(rows);
    
    }catch(err){

        return NextResponse.json({message: "Token invalide"}, {status: 401});
    }






}