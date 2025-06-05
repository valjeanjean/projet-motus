'use client'

import React from "react";
import { useState, useEffect } from "react";
import AttemptRow from "@/components/AttemptRow";
import "./components-styles/GameGrid.css"
import { useRouter } from "next/navigation";

export default function GameGrid(){

    const maxAttempts = 6;
    const router = useRouter();

    const [wordInfos, setWordInfos] = useState(null);
    const [attemptsNumber, setAttemptsNumber] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [difficulty, setDifficulty] = useState("Easy");
    const [points, setPoints] = useState(0);
    const [updateWord, setUpdateWord] = useState(0);

    function handleAttempts(){

        const newAttempts = attemptsNumber + 1;
        setAttemptsNumber(newAttempts);

        if(newAttempts >= maxAttempts){

            setIsGameFinished(true);
        }
    }

    function replayGame(){

        setIsGameFinished(false);
        setAttemptsNumber(0);
    }

    function updatePoints(points: number){

        setPoints(points);
    }
    
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
        setIsGameFinished(true);
        setDifficulty("Easy");
        setUpdateWord(prev => prev + 1);
    }

    useEffect(()=>{



        async function getWord(){

            console.log("Entrée début fonction getword");

            const token = localStorage.getItem("token");

            if(!token){

                console.log("Erreur de récupération du token dans le local storage");
                router.push("/login");
                return;
            }

            try{

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
            
                if(response.status == 401){

                    localStorage.removeItem("token");
                    router.push("/login");
                    return;
                }

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
            
            }catch(error){

                console.log("Erreur sur le fetch vers /api/word " + error);
                router.push("/login");
            }
        }
        
        getWord();

    }, [difficulty, router, updateWord]);

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
                    <p>Nombre de points : {points}</p>
                    <button onClick={replayGame}>Rejouer</button>

                </div>

            ) : (

                [...Array(maxAttempts)].map((element, index) => (
                    
                    <AttemptRow key={index} wordInfos={wordInfos} onAttempt={handleAttempts} onSuccess={resetGame} onPointsUpdate={updatePoints}/>
                ))
            )}

        </div>
    )
}