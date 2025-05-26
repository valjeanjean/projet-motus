'use client'

import React from "react";
import { useState, useEffect } from "react";
import AttemptRow from "@/components/AttemptRow";
import "./components-styles/GameGrid.css"

export default function GameGrid(){

    const maxAttempts = 6;

    /* Supprimer le fetch etc... */

    const [word, setWord] = useState("");

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
            
        }

        getWord();

    }, []);

    return(

        <div className="rows-container-grid">
            <AttemptRow />
            <AttemptRow />
            <AttemptRow />
            <AttemptRow />
            <AttemptRow />
            <AttemptRow />
        </div>
    )

}