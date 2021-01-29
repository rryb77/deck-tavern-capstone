import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./PlayerClassList.css"
import { PlayerClassContext } from "./PlayerClassProvider"
import { PlayerClassCard} from "./PlayerClassCard"



export const PlayerClassList = () => {
    
    const { getPlayerClasses } = useContext(PlayerClassContext)
    const [ playerClassesState, setPlayerClassesState ] = useState()

    useEffect(() => {
        getPlayerClasses()
            .then((pc) => {
                setPlayerClassesState(pc)
            })
    
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const history = useHistory()

    return (
        <>
            <h2>Choose Your Class</h2>

            <div className="playerClasses">
                {
                    playerClassesState?.map(playerClass => {
                        console.log(`Inside PlayerClassList Map: `, playerClass.name + " " + playerClass.id)
                        return <PlayerClassCard key={playerClass.id} 
                                    playerclass={playerClass} />
                    })
                }
            </div>
        </>
    )
}
