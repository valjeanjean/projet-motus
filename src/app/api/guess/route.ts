import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleGuess(req: NextApiRequest, res: NextApiResponse){
 
    /* 
    
    Envoyer dans la requête le playerID préalablement stocké dans
    le local storage (Faire la fonctionnalité)
    
    */

   const fakePlayerID = 1;

   /* Récupération de la tentative du joueur */
   const guess = req.body;

   /* Récupération du mot à trouver dans la BDD */

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

            console.log("Bonne lettre pour la " + index + "ème case de la ligne");
        
        }else{

            console.log("Mauvaise lettre pour la " + index + "ème case de la ligne");

        }

    });

}