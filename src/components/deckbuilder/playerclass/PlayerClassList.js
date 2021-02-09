import React, { useContext, useEffect } from "react"
import "./PlayerClassList.css"
import { PlayerClassContext } from "./PlayerClassProvider"
import { PlayerClassCard} from "./PlayerClassCard"



export const PlayerClassList = () => {
    
    const { playerClasses, getPlayerClasses } = useContext(PlayerClassContext)

    useEffect(() => {
        getPlayerClasses()
    
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h2 className="classheader">Choose Your Class</h2>
            
            <div className="playerClasses">
                {
                    playerClasses.map(playerClass => {
                        return <PlayerClassCard key={playerClass.id} 
                                    playerclass={playerClass} />
                    })
                }
            </div>
        </>
    )
}
