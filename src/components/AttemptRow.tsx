'use client'

import React from "react";
import { useState, useEffect } from "react";
import "./components-styles/AttemptRow.css";

export default function AttemptRow(){

    const letterTest = 'A';
    const [word, setWord] = useState<string>("sar");
    
    // const inputArray = [];
    // for (let i = 0; i < ; i++) {
    //     const element = [i];
        
    // }
    // word.split("").map((letter,i)=>{
    //     return <input id="myText" type="text" placeholder={letter} maxLength={1} onChange={setWord()}/>
    // })
    return(

        <form className="single-row-container">
            
            {/* Changer div pour un form ? */}

            {/* <div className="first-letter-square"></div> */}
            {/* { inputArray } */}

            <input id="myText" type="text" placeholder={letterTest} maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            
        </form>
    )

}