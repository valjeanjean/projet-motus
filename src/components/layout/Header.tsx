'use client'

import React from "react";
import { useState, useEffect } from "react";
import "../layout/HeaderFooter.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Composant chargé de l'affichage du Header */
export default function Header(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(()=>{

        const token = localStorage.getItem("token");

        setIsLoggedIn(!!token);
    
    });

    function handleLogout(){

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("playerID");            
        setIsLoggedIn(false);
        router.push("/login");
    }

    return(

        <header>
            
            <ul className="nav-list">
                <li className="jouer"><Link href="/game">Jouer</Link></li>
                <li className="hall-of-fame"><Link href="/ranking">Wall of Fame</Link></li>
                <li className="sign-in-up">
                {isLoggedIn ? (

                    <button onClick={handleLogout} className="log-out-button">Déconnexion</button>

                ) : (
                    
                    <Link href="/login">Connexion</Link>
                )}
                </li>
            </ul>

        </header>
    )
}