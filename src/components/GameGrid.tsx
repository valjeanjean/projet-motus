'use client'

import React from "react";
import { useState, useEffect } from "react";
import AttemptRow from "@/components/AttemptRow";
import "./components-styles/GameGrid.css"
import { useRouter } from "next/navigation";

export default function GameGrid(){

    // Variable contenant la valeur associée à la difficulté
    const maxAttempts = 6;
    const router = useRouter();
    /* Supprimer le fetch etc... */

    const [wordInfos, setWordInfos] = useState(null);
    const [wordLength, setWordLength] = useState(0);
    const [attemptsNumber, setAttemptsNumber] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [difficulty, setDifficulty] = useState("Easy");
    const [points, setPoints] = useState(0);

    function handleAttempts(){

        if(attemptsNumber < maxAttempts){

            setAttemptsNumber(attemptsNumber + 1);

        }else{

            setIsGameFinished(true);
        }
    }

    
    /* La difficulté ne met pas à jour */
    
    function updateDifficulty(event:any){
        
        if(difficulty == "Easy"){
            
            setDifficulty("Normal");
            
        }else if(difficulty == "Normal"){
            
            setDifficulty("Hard");
            
        }else{
            
            setDifficulty("Easy");
        }
        
    }
    
    function resetGame(){

        setAttemptsNumber(0);
        setIsGameFinished(false);
    }

    useEffect(()=>{

        async function getWord(){

            const playerID = 2;
            console.log("ID présent localStorage ? : " + playerID);
            if(!playerID){

                console.log("Erreur de récupération du playerID");
                return;
            }

            console.log("Entrée début fonction getword");

            const token = localStorage.getItem("token");

            if(!token){

                console.log("Erreur de récupération du token dans le local storage");
                router.push("/login");
                return;
            }

            const response = await fetch("/api/word", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization":"Bearer " + token,
                },
                body: JSON.stringify({

                    difficulty: difficulty
                }),
            });

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

    }, [difficulty, router]);

    console.log(isGameFinished);
    console.log("Nombre de tentatives : " + attemptsNumber);

    return(

        <div className="rows-container-grid">

        {attemptsNumber > 0 ? (

            <p className="attempts-number">Nombre de tentatives : {attemptsNumber}</p>
            
        ) : (

            <button className="difficulty-button" onClick={updateDifficulty}>{difficulty}</button>

        ) } 


            {isGameFinished ? (

                <div className="game-over-container">

                    <h1 className="game-over-title">Partie terminée !</h1>
                    <p>Nombre de points : X</p>
                    <button onClick={resetGame}>Rejouer</button>

                </div>

            ) : (

                [...Array(maxAttempts)].map((element, index) => (
                    
                    <AttemptRow key={index} wordInfos={wordInfos} onAttempt={handleAttempts}/>
                ))
            )}

        </div>
    )
}