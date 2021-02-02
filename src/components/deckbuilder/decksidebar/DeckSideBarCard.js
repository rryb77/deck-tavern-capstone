import React, { useEffect, useState, useContext } from "react"
import { DeckContext } from './DeckProvider'
import "./DeckSideBar.css"

const deck = {
    cards: [], // [dbfId, count] pairs
    heroes: [], // passed in value
    format: 2, // or 1 for Wild, 2 for Standard
}

export const DeckSideBarCard = ({card}) => {
    
    const { localCards, deckCart, removeDeckCartCard, cardCountForDecks, setCardCountForDecks } = useContext(DeckContext)
    
    // Match the local cards to the card object being passed in by dbfId
    const cardObj = localCards.find(c => c.dbfId === card.carddbfId)

    const removeCard = (cardObj) => {
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