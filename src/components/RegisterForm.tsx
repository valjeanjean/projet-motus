'use client'

import React from "react";
import "./components-styles/RegisterForm.css";
import { emailRegex, passwordRegex, usernameRegex } from "@/utils/validation";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* Composant inscription */
export default function RegisterForm(){

    const router = useRouter();

    async function Register(event: React.FormEvent<HTMLFormElement>){
    
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget)
        
        const username = formData.get("username-input") as string;
        console.log("Pseudo choisi : " + username);

        const userPassword = formData.get("user-password") as string;
        console.log("Mot de passe choisi : " + userPassword);

        const userEmail = formData.get("user-email") as string;
        console.log("Email choisie : " + userEmail);

        /* Utilisation de regex pour la sécurité utilisateur */
        if(!usernameRegex.test(username)){

            alert("Le pseudo doit contenir entre 3 et 20 caractères, lettres/chiffres uniquement.");
            return;
        }

        if(!emailRegex.test(userEmail)){

            alert("Adresse e-mail invalide");
            return;
        }

        if(!passwordRegex.test(userPassword)){

            alert("Le mot de passe doit faire au moins 8 caractères, avec au moins une majuscule, une minuscule et un chiffre.");
            return;
        }

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

        /* Stockage du playerID + pseudo dans le localstorage */
        localStorage.setItem("playerID", data.playerID);
        localStorage.setItem("username", data.username);

        router.push("/login");
    }

    return(

        <>
            <div className="register-titles-container">
                <h1>S'inscrire</h1>
                <h3>Vous avez déjà un compte ? <br/><Link href="/login" className="go-connect">Se connecter</Link></h3>
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