import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2"

export default async function handleGuess(req: NextApiRequest, res: NextApiResponse){
 
    /* 
    
    Envoyer dans la requête le playerID préalablement stocké dans
    le local storage (Faire la fonctionnalité)
    
    */

   const fakePlayerID = 1;

   const guess = req.body;

    const [allRows]: any = await db.execute(

        'SELECT word FROM Game WHERE playerID = ?', [fakePlayerID]
    );

    const wordToFind = allRows[0].word;
    const wordToFindArray = wordToFind.split("");

    if(guess === wordToFind){

        res.json({isCorrect: true}); 
        // On renvoie un objet pour dire que le mot trouvé est le bon
    }

    guess.forEach((letter: any, index:number) => {
        
        if(letter == wordToFindArray[index]){

            console.log("Bonne lettre pour la position " + index + " de la ligne");
        
        }else{

            console.log("Mauvaise lettre pour la position " + index + " de la ligne");

        }

    });

}