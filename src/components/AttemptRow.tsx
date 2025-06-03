'use client'

import React from "react";
import { useState, useEffect } from "react";
import "./components-styles/AttemptRow.css";
import { styleText } from "util";

// wordLength: number 

type Status = "misplaced" | "correct" | "incorrect";


export default function AttemptRow({wordInfos,onAttempt}: any){

    if(!wordInfos){

        return null;
    }

    const [letters, setLetters] = useState([]);
    const [letterColor, setLetterColor] = useState("");
    const wordLength = wordInfos.wordLength;
    const firstLetter = wordInfos.firstLetter;

    // const inputArray = [];
    
    // for (let i = 0; i < ; i++) {
    //     const element = [i];
    // }

    // word.split("").map((letter,i)=>{
    //     return <input id="myText" type="text" placeholder={letter} maxLength={1} onChange={setWord()}/>
    // })

    interface Letter{

        letter: string;
        Status: Status;
        color: string;
        squareIndex: number;
    }

    function handleLetterColors(results:Letter[]){


    }

    async function guessHandler(event: React.FormEvent<HTMLFormElement>){

        event.preventDefault();

        console.log("aaaaaaaaaa");

        /* Récupération des données présents dans le form */
        const formData = new FormData(event.currentTarget);
        console.log("formData = " + formData);
        /* Modifier le nom pour playerAttempt par exemple */
        const letters = [];

        const token = localStorage.getItem("token");
        console.log("-----------Token AttemptRow---------");
        console.log(token);

        if(!token){

            return;
        }

        /* Initialisation du tableau avec les valeurs des inputs */

        for (let i = 0; i < wordLength; i++) {
            
            letters[i] = formData.get("letter-" + i);
            console.log(letters[i]);
        }

        /* Envoi du mot vers le backend pour la vérification */
        /* À déplacer plutôt dans GameGrid ? */

        console.log("Proposition : " + letters);

        const correctedWord = await fetch("/api/guess", {

            method: "POST",
            headers:{ 
                "Content-Type": "application/json",
                "Authorization": "Bearer" + token,
            },
            body: JSON.stringify({

                letters,
            })
        });

        const response = await correctedWord.json();

        const results = response.json();

        if(results.isCorrect == true){

            // Passer props au parent pour refresh ? Ou
            // reset la game ?
        }

        console.log("Résultats reçus du backend : ");
        console.log(results);
        
        // .then(res=>res.json());



        onAttempt();
    }

    /* 
    
        Utiliser useState ? const [letterColor, setLetterColor] = useState("");
        Puis faire des if/un switch, en fonction de la couleur, faire setLetterColor
        de la valeur de retour de cette fonction. Mettre la variable letterColor
        dans le "style={letterColor}";
    
    */

    return(

        <form className="single-row-container" onSubmit={guessHandler}>
            
            {/* <div className="first-letter-square"></div> */}
            {/* { inputArray } */}
            {/* Utilisation de l'opérateur ternaire pour afficher la première lettre seulement pour la première case */}
            {[...Array(wordLength)].map((element, index) =>(
                <input id="myText" key={index} name={`letter-${index}`} type="text" maxLength={1} placeholder={index == 0 ? wordInfos.firstLetter : "."}/>
                // required ?
            ))}

            <input type="submit" hidden/>

        </form>
    )
}