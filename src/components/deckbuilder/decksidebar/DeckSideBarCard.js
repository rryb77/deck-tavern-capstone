import React, { useEffect, useState, useContext } from "react"
import { DeckContext } from './DeckProvider'
import "./DeckSideBar.css"

export const DeckSideBarCard = ({card}) => {
    debugger
    const { localCards, removeDeckCartCard } = useContext(DeckContext)
    const cardObj = localCards.find(c => c.dbfId === card.carddbfId)

    const removeCard = (cardObj) => {
        debugger
        console.log('The obj of the card clicked:', cardObj)
        console.log('The ID of the obj clicked', cardObj.id)
        removeDeckCartCard(cardObj.id)
    }

    return (
        <div className="cardTileImage" onClick={event => removeCard(card)}>
            <img src={`https://art.hearthstonejson.com/v1/tiles/${cardObj.art}.png`} className="card_TileImage" id={`${cardObj?.dbfId}`} alt={`${cardObj?.name}`}/>
            <div className="cardTileInfo__cardName">{cardObj.name}</div>
            <div className="cardTileInfo__cardCost">{cardObj.cost}</div>
        </div>
    )
}