'use client'

import React from "react";
import { useState, useEffect } from "react";
import AttemptRow from "@/components/AttemptRow";
import "./components-styles/GameGrid.css"

export default function GameGrid(){

    // Variable contenant la valeur associée à la difficulté
    const maxAttempts = 6;

    /* Supprimer le fetch etc... */

    const [wordInfos, setWordInfos] = useState(null);
    const [wordLength, setWordLength] = useState(0);
    const [attemptsNumber, setAttemptsNumber] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);

    function handleAttempts(data: any){

        setAttemptsNumber(attemptsNumber + 1);
    }

    useEffect(()=>{

        async function getWord(){

        console.log("Entrée début fonction getword");

            const response = await fetch("/api/word");
            if(!response.ok){

                console.log("Erreur lors de la récupération du mot");
                return;
            }
            const wordObject = await response.json();

            console.log("Première lettre : ");
            console.log(wordObject.firstLetter);
            console.log("Taille du mot : ");
            console.log(wordObject.wordLength);
            
            setWordInfos(wordObject);
        }
        
        getWord();

    }, []);

    console.log(isGameFinished);

    return(

        <div className="rows-container-grid">

            {isGameFinished ? (

                <div className="game-over-container">

                    <h1 className="game-over-title">Partie terminée !</h1>
                    <p>Nombre de points : X</p>

                </div>

            ) : (

                [...Array(maxAttempts)].map((element, index) => (
                    
                    <AttemptRow key={index} wordInfos={wordInfos} attemptsNumber={attemptsNumber}/>
    
                ))
            )}

        </div>
    )
}