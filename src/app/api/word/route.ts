/* Route pour récupérer le mot */

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){

    /* Récupérer/Passer en props la difficulté choisie par le joueur ? */

    /* Variable simulant la taille du mot (En fonction de la difficulté, faire la fonctionnalité) */
    const temporaryTestNumber = 6;

    /* Récupération d'un mot aléatoire en fonction d'une taille */
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


    /* 
    
        On insère le mot récupéré dans le champ wordToGuess 
        Il faudra faire un INSERT mais il faut le playerID pour l'associé à la bonne ligne 
        Ou faire une api route qui centralise plus de choses, SPR
    
    */
    await db.query("INSERT INTO Game (wordToGuess)  VALUES (?)", [fetchedWord]);

    console.log(data);

    /* On retourne seulement la première lettre du mot à trouver et sa taille pour éviter la triche */
    return NextResponse.json({firstLetter: firstLetter, wordLength: wordLength});
}