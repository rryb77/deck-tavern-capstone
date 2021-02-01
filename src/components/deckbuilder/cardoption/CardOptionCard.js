import React, { useContext, useEffect, useState } from "react"
import { CardOptionContext } from "./CardOptionProvider"
// import { encode, decode, FormatType } from "deckstrings";

// import { useHistory } from 'react-router-dom';

export const CardOptionCard = ({card}) => {
    
    const {setDeckCards} = useContext(CardOptionContext)
    let [countCards, setCountCards] = useState(0)

    const cardWasClicked = (card) => {
        
        if (card.rarity !== "LEGENDARY" && countCards < 2){
            const perCardCount = ++countCards
            setCountCards(perCardCount)
            setDeckCards(card)
        } else if (card.rarity === "LEGENDARY" && countCards < 1){
            const perCardCount = ++countCards
            setCountCards(perCardCount)
            setDeckCards(card)
        }
        
    }

    return (
        
        <section className="cardViewerOptions">
              <div className="cardImage">
                <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`${card?.dbfId}`} onClick={event => cardWasClicked(card)} alt={`${card?.name}`}/>
              </div>
              <div className="cardCount">Added: {countCards}</div>
        </section>
        
    )
}