'use client'

import React from "react";
import { useState, useEffect } from "react";
import "../layout/HeaderFooter.css";

export default function Header(){

    return(

        <header>
            
            <ul className="nav-list">
                <li className="jouer">Jouer</li>
                <li className="hall-of-fame">Hall of Fame</li>
                <li className="a-determiner">Connexion</li>
            </ul>

        </header>
    )
}