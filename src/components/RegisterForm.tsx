'use client'

import React from "react";
import { useEffect, useState } from "react";
import "./components-styles/RegisterForm.css";

export default function RegisterForm(){

    return(

        <>
            <div className="register-titles-container">
                <h1>S'inscrire</h1>
                <h3>Vous avez déjà un compte ? Se connecter (rajouter lien)</h3>
            </div>

            <form className="register-form" action="submit">

                    <input className="username-input" type="text" placeholder="Choisissez un pseudo"/>
                    <input className="password-input" type="password" placeholder="Choisissez un mot de passe"/>
                    <button>S'inscrire</button>

            </form>
        </>
    )
}