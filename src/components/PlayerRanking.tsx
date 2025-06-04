'use client'

import React from "react";
import { useEffect, useState } from "react";
import "../components/components-styles/Ranking.css";
import { useRouter } from "next/navigation";

type Player = {

    username: string;
    points: number;
}

/* Composant chargé d'afficher le classement des joueurs */
export default function PlayerRanking(){

    const [players, setPlayers] = useState<Player[]>([]);

    const router = useRouter();

    useEffect(()=>{

        async function getRanks(){

            const token = localStorage.getItem("token");
            if(!token){

                console.log("Token absent");
                router.push("/login");
                return;
            }

            try{

                const response = await fetch("/api/ranking", {

                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                
                const data:any = await response.json();
                console.log("-------BODY-------");
                console.log(data);
                
                setPlayers(data);
            
            }catch(error){

                console.error("Erreur fetch : " + error);
                router.push("/login");
            }

        }

    getRanks();

    }, [router]);

    return(
        <>
            <h1 className="ranking-title">Hall of Fame</h1>
                <div className="player-ranks-container">
                {players.map((player, index) => (
                    
                    <div key={index} className="player-rank-row">
                        <span className="player-rank">{index + 1}.</span>
                        <span className="player-username">{player.username}</span>
                        <span className="player-points">{player.points} pts</span>
                    </div>
                ))}
            </div>
        </>
    )
}