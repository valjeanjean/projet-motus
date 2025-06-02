/* Route pour récupérer le mot */

import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    /* Récupérer/Passer en props la difficulté choisie par le joueur ? */
    let chosenDifficulty:number = 0;

    const body = await req.json();
    console.log("Contenu body : " + body);
    const playerID = body.playerID;
    const difficulty = body.difficulty;
    if(difficulty == "Easy"){

        chosenDifficulty = 5;

    }else if(difficulty == "Normal"){

        chosenDifficulty = 7;
        
    }else if(difficulty == "Hard"){

        chosenDifficulty = 9;

    }else{

        return NextResponse.json({

            message: "Erreur lors du set de la difficulté",
        });
    }
    console.log(playerID);

    /* Variable simulant la taille du mot (En fonction de la difficulté, faire la fonctionnalité) */

    /* Récupération d'un mot aléatoire en fonction d'une taille */
    const urlToFetch = "https://trouve-mot.fr/api/size/" + chosenDifficulty;
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

    const [rows, fields]: any = await db.query("SELECT wordToGuess FROM Game WHERE playerID=?", [playerID]);
    
    if(rows.length == 0 || !rows[0].wordToGuess){
        
        await db.query("INSERT INTO Game (wordToGuess, playerID)  VALUES (?, ?)", [fetchedWord, playerID]);
    
    }else{


        console.log("SELECT word pour joueur X");
        console.log(rows[0].wordToGuess);

        const dbWord = rows[0].wordToGuess;
        const oneLetter = dbWord[0];
        console.log("---------------------------------");
        console.log(oneLetter);
        /* On retourne seulement la première lettre du mot à trouver et sa taille pour éviter la triche */
        return NextResponse.json({firstLetter: oneLetter, wordLength: wordLength});
    }
}