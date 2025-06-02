import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


type Status = "misplaced" | "correct" | "incorrect";

export async function POST(req: NextRequest, res: NextResponse){
 
    /* 

        Envoyer dans la requête le playerID préalablement stocké dans
        le local storage (Faire la fonctionnalité)

    */

    interface Letter{

        letter: string;
        Status: Status;
        color: string;
        squareIndex: number;
    }

    /* Récupération de la tentative du joueur */
    const {letters:guess, currentPlayerID:playerID} = await req.json();
    console.log("Test body : ");
    console.log(guess);
    console.log(playerID);


    console.log("Proposition du joueur : " + guess);

    /* Récupération du mot à trouver dans la BDD */

    // db.execute('INSERT ?')

    const [words]: any = await db.execute(

        'SELECT wordToGuess FROM Game WHERE playerID = ?', [playerID]
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

    let results: Letter[] = [];

    guess.forEach((letter:any, index:number) => {        
        
        console.log("Index actuel : ", index);


        if(letter == wordToFindArray[index]){


            console.log("Bonne lettre pour la " + index + "ème case de la ligne");

            results[index] = {
                letter: letter,
                Status: "correct",
                color: "red",
                squareIndex: index,
            };

            console.log("Vérif : ");
            console.log(results[index]);
        
            /*

                Pour lorsque la lettre est présente mais pas au bon index (Yellow):

                {
                    letter: X
                    Status: misplaced
                    color: yellow
                    squareIndex:
                }

            */

        }else{

                /* Vérification si une des lettres envoyées est présente dans le mot */
                
                if(wordToFindArray.includes(letter)){

                    results[index] = {
                        letter: letter,
                        Status: "misplaced",
                        color: "yellow",
                        squareIndex: index,
                    };
                    
                    console.log("lettre " + index + "présente dans le mot");
                    console.log(results[index]);

                }else{

                    results[index] = {
                        letter: letter,
                        Status: "incorrect",
                        color: "blue",
                        squareIndex: index,
                    };

                    console.log("Lettre non présente pour le mot à la case " + index);
                    console.log(results[index]);
                }


                /* 
                
                    Faire fonctionnalité pour vérifier si une lettre n'est pas à la
                    bonne place mais est tout de même présente dans le mot
                
                */

        }

    });

    return NextResponse.json(results);
    // Return un objet avec les lettres à la bonne place et leurs index
    // et celles présentes dans le mot mais pas à la bonne place, avec la
    // couleur associée (rouge pour bon, jaune pour bon mais pas à la bonne place)

}