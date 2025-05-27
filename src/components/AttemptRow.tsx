'use client'

import React from "react";
import { useState, useEffect } from "react";
import "./components-styles/AttemptRow.css";

// wordLength: number 



export default function AttemptRow({wordInfos}: any){

    if(!wordInfos){

        return null;
    }

    const [letters, setLetters] = useState([]);
    const wordLength = wordInfos.wordLength;
    const firstLetter = wordInfos.firstLetter;
    // const inputArray = [];
    // for (let i = 0; i < ; i++) {
    //     const element = [i];
        
    // }
    // word.split("").map((letter,i)=>{
    //     return <input id="myText" type="text" placeholder={letter} maxLength={1} onChange={setWord()}/>
    // })

    async function guessHandler(event: React.FormEvent<HTMLFormElement>){

        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const letters = [wordLength];

        for (let i = 0; i < wordLength; i++) {
            
            letters[i] = formData.get("letter-" + i);
        }

        const response = await fetch("/api/guess", {

            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            //body: JSON.stringify()


        });

    }

    return(

        <form className="single-row-container" onSubmit={guessHandler}>
            
            {/* Changer div pour un form ? */}

            {/* <div className="first-letter-square"></div> */}
            {/* { inputArray } */}
            {/* Utilisation de l'opérateur ternaire pour afficher la première lettre seulement pour la première case */}
            {[...Array(wordLength)].map((element, index) =>(
                <input id="myText" key={index} name={`letter-${index}`} type="text" maxLength={1} placeholder={index == 0 ? wordInfos.firstLetter : "."}/>
            ))}

        </form>
    )
}