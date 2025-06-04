'use client'

import React from "react";
import "./hero.css";
import Link from "next/link";

export default function Hero(){

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

            <div className="play-button-container">
                <Link href="/game"><button className="go-play">JOUER</button></Link>
            </div>

        </>

    )
}