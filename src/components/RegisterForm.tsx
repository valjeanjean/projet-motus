'use client'

import React from "react";
import { useEffect, useState } from "react";
import "./components-styles/RegisterForm.css";

export default function RegisterForm(){

    async function Register(event: React.FormEvent<HTMLFormElement>){
    
        event.preventDefault();

        /* Stocker pseudo localstorage et faire useState composant GameGrid ? */
        
        const formData = new FormData(event.currentTarget)
        
        const username = formData.get("username-input") as string;
        console.log("Pseudo choisi : " + username);

        const userPassword = formData.get("user-password") as string;
        console.log("Mot de passe choisi : " + userPassword);

        const userEmail = formData.get("user-email") as string;
        console.log("Email choisie : " + userEmail);

        const userInfos = {
            
            username: username,
            password: userPassword,
            email: userEmail,
        }

        const response = await fetch("/api/user", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfos),

        });

        const data = await response.json();

        console.log("Réponse POST pseudo client : ")
        console.log(data);

        /* Stockage du playerID dans le localstorage */
        localStorage.setItem("playerID", data.playerID);

    }

    return(

        <>
            <div className="register-titles-container">
                <h1>S'inscrire</h1>
                <h3>Vous avez déjà un compte ? Se connecter (rajouter lien)</h3>
            </div>

            <form className="register-form" onSubmit={Register}>

                    <input className="username-input" name="username-input" type="text" placeholder="Choisissez un pseudo"/>
                    <input type="email" name="user-email" placeholder="Entrez votre e-mail" className="email-input"/>
                    <input className="password-input" name="user-password" type="password" placeholder="Choisissez un mot de passe"/>
                    <button>S'inscrire</button>

            </form>
        </>
    )
}