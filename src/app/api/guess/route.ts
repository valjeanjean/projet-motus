import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type Status = "misplaced" | "correct" | "incorrect";

export async function POST(req: NextRequest, res: NextResponse){

    /* Typage de l'objet Letter */
    interface Letter{

        letter: string;
        status: Status;
        color: string;
        squareIndex: number;
    }

    /* Récupération du token dans les cookies */
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

    const [words]: any = await db.execute(

        'SELECT wordToGuess FROM Game WHERE playerID = ?', [playerID]
    );

    console.log("Mot à deviner : " , words);
    if(words.length <= 0){
        
        return NextResponse.json({msg : "No word in BDD"});
    }

    const wordToFind = words[0].wordToGuess;
    if(!wordToFind){

        console.log("Aucun mot présent en BDD");
        return NextResponse.json({message: "Aucun mot enregistré"})
    }
    const wordToFindArray = wordToFind.split("");

    if(guess.join('') === wordToFind){

        console.log("-----------Mot trouvé!--------------");

        const pointsToAdd = 10;

        await db.query("DELETE FROM Game WHERE playerID = ?", [playerID]);
 
        const response = await fetch("http://localhost:3000/api/user/points", {

            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Cookie": `token=${token}`,
            },
            body: JSON.stringify({

                pointsToAdd: pointsToAdd,
            }),
        });

        const body = await response.json();
        const totalPoints = body.totalPoints;

        console.log("---- Le joueur a " + totalPoints + "points----");

        // On renvoie un objet pour dire que le mot trouvé est le bon + le rappel de points totaux
        return NextResponse.json({
            
            isCorrect: true,
            totalPoints: totalPoints,
        });
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
        }
    });

    // Return un objet avec les lettres à la bonne place et leurs index
    // et celles présentes dans le mot mais pas à la bonne place, avec la
    // couleur associée (rouge pour bon, jaune pour bon mais pas à la bonne place)
    return NextResponse.json({results});
}