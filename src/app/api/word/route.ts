/* Route pour récupérer le mot */

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){

    /* Récupérer/Passer en props la difficulté choisie par le joueur ? */

    const temporaryTestNumber = 6;

    const urlToFetch = "https://trouve-mot.fr/api/size/" + temporaryTestNumber;
    console.log(urlToFetch);
    
    const response = await fetch(urlToFetch);
    const data = await response.json();
    const fetchedWord = data[0].name; 
    console.log("Mot récupéré : ");
    console.log(fetchedWord);

    const wordLength = fetchedWord.length;
    console.log("Taille du mot : " + wordLength);
    
    const firstLetter = fetchedWord[0];
    
    console.log("Première lettre du mot : ");
    console.log(firstLetter);

    await (await db).query("INSERT INTO Game (wordToGuess)  VALUES (?)", [fetchedWord]);

    console.log(data);

    return NextResponse.json({firstLetter: firstLetter, wordLength: wordLength});
}