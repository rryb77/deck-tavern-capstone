import React, {useContext} from "react"
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'

export const AllDecksCard = ({deck}) => {
    
    const { playerClasses } = useContext(PlayerClassContext)

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)

    return (
        <div className="deck">
            <div className="deckInfo">Deck Name: {deck.deck_name} </div>
        </div>
    )

}
