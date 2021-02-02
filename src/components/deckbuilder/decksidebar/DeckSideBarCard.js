import React, { useEffect, useState, useContext } from "react"
import { DeckContext } from './DeckProvider'
import "./DeckSideBar.css"

export const DeckSideBarCard = (card) => {
    
    const { localCards } = useContext(DeckContext)
    const cardObj = localCards.find(c => c.dbfId === card.card.cardId)

    const removeCard = () => {
        
    }

    return (
        <div className="cardTileImage">
            <img src={`https://art.hearthstonejson.com/v1/tiles/${cardObj.art}.png`} className="card_TileImage" id={`${cardObj?.dbfId}`} alt={`${cardObj?.name}`}/>
            <div className="cardTileInfo__cardName">{cardObj.name}</div>
            <div className="cardTileInfo__cardCost">{cardObj.cost}</div>
        </div>
    )
}