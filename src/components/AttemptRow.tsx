'use client'

import React from "react";
import { useState, useEffect } from "react";
import "./components-styles/AttemptRow.css";

type Status = "misplaced" | "correct" | "incorrect";

export default function AttemptRow({wordInfos, onAttempt, onSuccess, onPointsUpdate}: any){

    /* -------------------- Typage ------------------- */

    interface Letter{

      letter: string;
      status: Status;
      color: string;
      squareIndex: number;
    }

    interface WordInfos {
    
      wordLength: number;
      firstLetter: string;
    }

    interface AttemptRowProps {

      wordInfos: WordInfos | null;
      onAttempt: () => void;
      onSuccess: () => void;
    }

    /* ---------------------------------------------- */

    if(!wordInfos){

        return null;
    }

    const wordLength = wordInfos.wordLength;
    const firstLetter = wordInfos.firstLetter;

    const [results, setResults] = useState<Letter[]>([]);
    const [isLineLocked, setIsLineLocked] = useState(false);

    async function guessHandler(event: React.FormEvent<HTMLFormElement>){

      event.preventDefault();

      /* Récupération des données présentes dans le form */
      const formData = new FormData(event.currentTarget);
      console.log("formData = " + formData);
      const letters = [];

      /* Initialisation du tableau avec les valeurs des inputs */
      for (let i = 0; i < wordLength; i++) {
          
          letters[i] = formData.get("letter-" + i);
          console.log(letters[i]);
      }

      const token = localStorage.getItem("token");
      console.log("-----------Token AttemptRow---------");
      console.log(token);

      if(!token){

        return;
      }

      /* Envoi du mot vers le backend pour la vérification */
      /* À déplacer plutôt dans GameGrid ? */

      console.log("Proposition : " + letters);

      const response = await fetch("/api/guess", {

          method: "POST",
          headers:{ 
              "Content-Type": "application/json",
              "Authorization": "Bearer" + token,
          },
          body: JSON.stringify({

              letters,
          })
      });

      const data = await response.json();
      const totalPoints = data.totalPoints;

      console.log("---------totalPoints-------------");
      console.log(totalPoints);

      console.log("----------DATA TABLEAU----------");
      console.log(data);
      
      if(data.isCorrect === true){

          onSuccess();
          onPointsUpdate(totalPoints);
          return;
      }
      
      setResults(data.results);
      setIsLineLocked(true);
  
      onAttempt();
    }

  return (

    <form className="single-row-container" onSubmit={guessHandler}>
      {[...Array(wordLength)].map((_, index) => {
        // Récupérer le résultat pour cette lettre dans results (tableau d’objets)
        const letterResult = results.find((r) => r.squareIndex === index);

        // Définir la couleur de fond selon le statut
        const backgroundColor = letterResult ? letterResult.color : undefined;

        /* 
          Placeholder : si première lettre, afficher la lettre initiale,
          sinon si lettre correcte, afficher la lettre,
          sinon afficher un point.
        */ 
       
        const placeholder =
          index === 0
            ? firstLetter
            : letterResult?.status === "correct"
            ? letterResult.letter
            : ".";

            console.log(`Case ${index} :`, {
                letterResult,
                backgroundColor,
            });

        return (
          <input
            key={index}
            className={`myText ${letterResult?.status ?? ""}`}
            name={`letter-${index}`}
            type="text"
            maxLength={1}
            placeholder={placeholder}
            autoComplete="off"
            disabled={isLineLocked}
          />
        );
      })}
      <input type="submit" hidden />
    </form>
  );
}