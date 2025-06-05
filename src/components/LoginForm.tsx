'use client'
import "./components-styles/RegisterForm.css";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoggingForm(){

    const router = useRouter();
    const [logMessage, setLogMEssage] = useState("");

    async function Login(event: React.FormEvent<HTMLFormElement>){

        event.preventDefault();

        /* Récupération inputs connexion */
        const formData = new FormData(event.currentTarget);
    
        const email = formData.get("input-email");
        console.log("email saisie : " + email);

        const password = formData.get("input-password");
        console.log("Mdp saisi : " + password);
    
        const userInfos = {

            email: email,
            sentPassword: password,
        }
    
        /* En faire une fonction et l'import ? Car utilisé dans RegisterForm & LoginForm components */
        const response = await fetch("/api/user/login", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfos),
        });

        if(!response){

            console.log("Erreur fetch vers api/user/login");

        }else{

            const body = await response.json();
            setLogMEssage(body.message);
            localStorage.setItem("token", body.token);
            window.location.href = "/game";
        }
    }

    return(

        <>
            <div className="register-titles-container">
                <h1>Connexion</h1>
                <h3>Entrez vos identifiants de connexion pour jouer</h3>
            </div>

            {logMessage && (

                <h2 className="is-connected">{logMessage}</h2>
            )}

            <form className="register-form" onSubmit={Login}>
                    <input className="email-input" type="text" placeholder="Entrez votre email" name="input-email"/>
                    <input className="password-input" type="password" placeholder="Entrez votre mot de passe" name="input-password"/>
                    <button>Se connecter</button>
            </form>

            <div className="click-to-register">Pas encore inscrit ? cliquez <Link href="/register" className="go-register">ICI</Link></div>

        
        </>
    )
}