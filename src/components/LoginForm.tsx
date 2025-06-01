'use client'

import React from "react";
import { useEffect, useState } from "react";
import "./components-styles/RegisterForm.css";

export default function RegisterForm(){

    return(

        <>
            <div className="register-titles-container">
                <h1>Connexion</h1>
                <h3>Entrez vos identifiants de connexion pour jouer</h3>
            </div>

            <form className="register-form" action="submit">

                    <input className="username-input" type="text" placeholder="Entrez votre pseudo"/>
                    <input className="password-input" type="password" placeholder="Entrez votre mot de passe"/>
                    <button>S'inscrire</button>

            </form>
{/*         
        <form className="chose-username-form" onSubmit={chooseUsername}>

            <input placeholder="Entrez un pseudo" name="username-input" type="text" maxLength={20} className="chose-username-input"/>
            <input type="submit" hidden/>

        </form> */}
        
        </>
    )
}