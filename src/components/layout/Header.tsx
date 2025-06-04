'use client'

import React from "react";
import { useState, useEffect } from "react";
import "../layout/HeaderFooter.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header(){

    const [username, setUsername] = useState("Invité");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(()=>{

        const storedUsername = localStorage.getItem("username");
        if(storedUsername){

            setUsername(storedUsername);
        }
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    
    }, [router]);

    function handleLogout(){

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("playerID");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
        setIsLoggedIn(false);
        router.push("/login");

    }

    return(

        <header>
            
            <ul className="nav-list">
                <li className="jouer"><Link href="/game">Jouer</Link></li>
                <li className="hall-of-fame"><Link href="/ranking">Hall of Fame</Link></li>
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