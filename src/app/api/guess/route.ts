import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
 
    /* 
    
        Envoyer dans la requête le playerID préalablement stocké dans
        le local storage (Faire la fonctionnalité)
    
    */

    const fakePlayerID = 2;

    /* Récupération de la tentative du joueur */
    const guess = await req.json();

    console.log("Proposition du joueur : " + guess);

    /* Récupération du mot à trouver dans la BDD */

    // db.execute('INSERT ?')

    const [words]: any = await db.execute(

        'SELECT wordToGuess FROM Game WHERE playerID = ?', [fakePlayerID]
    );

    // Faire vérification pour être sûr que words contient bien le mot désiré
    // Si ça contient bien un mot, supprimer le mot présent dans la table Game pour le playerID du joueur
    // Sinon, juste faire un INSERT

    console.log("Mot à deviner : " , words);
    if(words.length <= 0){
        
        return NextResponse.json({msg : "No word in BDD"});
    }

    const wordToFind = words[0].wordToGuess;
    const wordToFindArray = wordToFind.split("");

    if(guess === wordToFind){

        return NextResponse.json({
            
            isCorrect: true,
            // Faire un objet plus complet ?

        });

        // On renvoie un objet pour dire que le mot trouvé est le bon
    }

    const results[];

    guess.forEach((letter: any, index:number) => {        
        
        if(letter == wordToFindArray[index]){

            console.log("Bonne lettre pour la " + index + "ème case de la ligne");

            results[index] = {

                letter: letter,
                status: "correct",
                color: "red",
                squareIndex: index,
            };
        
            /*

                Pour lorsque la lettre est présente mais pas au bon index :

                    {
                        letter: X
                        status: correct
                        color: yellow
                        squareIndex:
                    }

            */


        }else{

            console.log("Mauvaise lettre pour la " + index + "ème case de la ligne");

        }

    });

    return NextResponse.json("salut");
    // Return un objet avec les lettres à la bonne place et leurs index
    // et celles présentes dans le mot mais pas à la bonne place, avec la
    // couleur associée (rouge pour bon, jaune pour bon mais pas à la bonne place)

}