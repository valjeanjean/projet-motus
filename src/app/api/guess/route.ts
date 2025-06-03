import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;


type Status = "misplaced" | "correct" | "incorrect";

export async function POST(req: NextRequest, res: NextResponse){
 
    /* 

        Envoyer dans la requête le playerID préalablement stocké dans
        le local storage (Faire la fonctionnalité)

    */

    interface Letter{

        letter: string;
        status: Status;
        color: string;
        squareIndex: number;
    }

    const cookieStored = await cookies();
    const token = cookieStored.get("token")?.value; 
    if(!token){

        return NextResponse.json({message: "Token absent"}, {status: 401});
    }

    let decoded: any;
    
    try {

        decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    } catch (error) {

        return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }

    const playerID = decoded.playerID;

    console.log("------|||| PlayerID ||||-------");
    console.log(playerID);

    if (!playerID) {

        return NextResponse.json({ message: "playerID manquant dans le token" }, { status: 401 });
    }

    /* Récupération de la tentative du joueur */
    const {letters:guess} = await req.json();

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

    if(guess.join('') === wordToFind){

        console.log("-----------Mot trouvé!--------------");

        await db.query("DELETE FROM Game WHERE playerID = ?", [playerID]);

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
                status: "correct",
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
                    status: "misplaced",
                    color: "yellow",
                    squareIndex: index,
                };
                
                console.log("lettre " + index + "présente dans le mot");
                console.log(results[index]);

            }else{

                results[index] = {
                    letter: letter,
                    status: "incorrect",
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

    return NextResponse.json({results});
    // Return un objet avec les lettres à la bonne place et leurs index
    // et celles présentes dans le mot mais pas à la bonne place, avec la
    // couleur associée (rouge pour bon, jaune pour bon mais pas à la bonne place)

}