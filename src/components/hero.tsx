'use client'

import React from "react";
import { useState, useEffect } from "react";
import "./hero.css";
import Link from "next/link";

export default function Hero(){


    async function chooseUsername(event: React.FormEvent<HTMLFormElement>){

        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        console.log("Valeur input username = " + formData);

        const username = formData.get("username-input") as string;
        console.log("Pseudo choisi : " + username);

        const response = await fetch("/api/user", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(username),

        });

        const data = await response.json();

        console.log("Réponse POST pseudo client : ")
        console.log(data);

    }

    return(

        <>
            <div className="hero-container">
                <h1>Bienvenue sur le jeu MOTUS !</h1>
                <p>Le célèbre jeu d'une ancienne émission France 2</p>
            </div>

            <div className="rules-container">
                <p>Vous aurez une grille avec 6 essais par grille.</p>
                <p>Vous aurez à chaque début de partie la première lettre du mot à trouver.</p>
            </div>

            <form className="chose-username-form" onSubmit={chooseUsername}>

                <input placeholder="Entrez un pseudo" name="username-input" type="text" maxLength={20} className="chose-username-input"/>
                <input type="submit" hidden/>

            </form>

            <div className="play-button-container">
                <Link href="/game"><button>JOUER</button></Link>
            </div>

        </>

    )
}