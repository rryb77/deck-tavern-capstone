import React, { useContext, useState } from "react"
// import { DeckContext } from '../decksidebar/DeckProvider'

export const DeckCardViewCard = ({card}) => {
    
    // const { deckCards } = useContext(DeckContext)

    return (
        <div className="cardTileImage">
            <img src={`https://art.hearthstonejson.com/v1/tiles/${card.art}.png`} className="card_TileImage" id={`${card?.dbfId}`} alt={`${card?.name}`}/>
            <div className="cardTileInfo__cardName">{card.name}</div>
            <div className="cardTileInfo__cardCost">{card.cost}</div>
        </div>
    )

}

