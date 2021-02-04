import React, { useContext, useState } from "react"
import { DeckContext } from "../decksidebar/DeckProvider"


export const DeckCardViewCard = ({card}) => {
    const {localCards } = useContext(DeckContext)

    let theCard = localCards.find(c => c.id === card.cardId)
    
    return (
        <div className="cardTileImage">
            <img src={`https://art.hearthstonejson.com/v1/tiles/${theCard.art}.png`} className="card_TileImage" id={`${theCard?.dbfId}`} alt={`${theCard?.name}`}/>
            <div className="cardTileInfo__cardName">{theCard.name}</div>
            <div className="cardTileInfo__cardCost">{theCard.cost}</div>
        </div>
    )

}

