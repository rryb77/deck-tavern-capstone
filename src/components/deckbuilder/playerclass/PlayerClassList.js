import React, { useContext, useEffect } from "react"
// import { useHistory } from "react-router-dom"
import "./PlayerClassList.css"
import { PlayerClassContext } from "./PlayerClassProvider"
import { PlayerClassCard} from "./PlayerClassCard"



export const PlayerClassList = () => {
    
    const { playerClasses, getPlayerClasses } = useContext(PlayerClassContext)

    useEffect(() => {
        getPlayerClasses()
    
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // const history = useHistory()

    return (
        <>
            <h2>Choose Your Class</h2>

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
