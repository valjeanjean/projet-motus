'use client'

import React from "react";
import { useState, useEffect } from "react";
import "./components-styles/AttemptRow.css";

export default function AttemptRow(){


    return(

        <div className="single-row-container">

            <input id="myText" type="text"/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            <input id="myText" type="text" placeholder="." maxLength={1}/>
            

        </div>
    )

}