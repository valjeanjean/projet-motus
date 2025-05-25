/* Route pour récupérer le mot */

import db from "/home/ilian/Documents/projet-motus/src/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(){

    const fakeRandomNumber = 6;

    const response = await fetch("https://trouve-mot.fr/api/size/6");
    const data = await response.json();

    console.log(data.name);

    return NextResponse.json({mot: data.name});
}