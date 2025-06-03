import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET non défini dans le fichier .env");
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    // console.log("-------authHeader----------");
    // console.log(authHeader);

    // Vérification que le header est présent et commence bien par "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Token invalide ou non présent" },
        { status: 401 }
      );
    }

    // Récupération du token : après "Bearer "
    const token = authHeader.split(" ")[1];
    // console.log("---------token---------------");
    // console.log(token);

    if (!token) {
      return NextResponse.json(
        { message: "Token manquant après Bearer" },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    } catch (error) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }

    const playerID = decoded.playerID;
    console.log("----------------PlayerID-----------------");
    console.log(playerID);

    if (!playerID) {
      return NextResponse.json(
        { message: "PlayerID non présent dans le token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("Contenu body : ", body);
    const difficulty = body.difficulty;

    let chosenDifficulty: number;

    if (difficulty == "Easy") {
      chosenDifficulty = 5;
    } else if (difficulty == "Normal") {
      chosenDifficulty = 7;
    } else if (difficulty == "Hard") {
      chosenDifficulty = 9;
    } else {
      return NextResponse.json(
        { message: "Erreur récupération difficulté" },
        { status: 401 }
      );
    }

    // Récupération d'un mot aléatoire en fonction de la taille choisie
    const urlToFetch = "https://trouve-mot.fr/api/size/" + chosenDifficulty;
    console.log(urlToFetch);
    const response = await fetch(urlToFetch);
    const data = await response.json();
    const fetchedWord = data[0].name;

    console.log("------------- Mot fetch : ----------------")
    console.log(fetchedWord);

    const wordLength = fetchedWord.length;
    console.log("Taille du mot : " + wordLength);
    const firstLetter = fetchedWord[0];

    const [rows]: any = await db.query(
      "SELECT wordToGuess FROM Game WHERE playerID=?",
      [playerID]
    );

    if (rows.length == 0 || !rows[0].wordToGuess) {
      await db.query("INSERT INTO Game (wordToGuess, playerID) VALUES (?, ?)", [
        fetchedWord,
        playerID,
      ]);
    } else {
      // On retourne seulement la première lettre et la longueur pour éviter la triche
      return NextResponse.json({ firstLetter: firstLetter, wordLength: wordLength });
    }

    return NextResponse.json({ firstLetter: firstLetter, wordLength: wordLength });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
