'use client'
import "../../components/components-styles/Ranking.css";
import PlayerRanking from "@/components/PlayerRanking";

/* Page Hall of Fame */
export default function Ranking(){

    return(

        <main className="ranking-main-container">
            <PlayerRanking />
        </main>
    )
}