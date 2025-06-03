// Faire la route pour update les points
import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){

    console.log("Réponse route /points");
    const response = await req.json();

    const pointsEarned = response.points;
    if(!pointsEarned || pointsEarned < 1){

    

        console.log("Erreur de récupération des points gagnés");
        return NextResponse.json({message: "Erreur de récupération des points gagnés"}, {status: 401});
    }

    

    



}