import React, { useContext, useEffect, useState } from "react"
import { DeckContext } from "../decksidebar/DeckProvider"
// import { encode, decode, FormatType } from "deckstrings";

// import { useHistory } from 'react-router-dom';

export const CardOptionCard = ({card}) => {
    
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    const {updateDeckCart, localCards} = useContext(DeckContext)
    let [countCards, setCountCards] = useState(0)

    const cardWasClicked = (card) => {
        console.log(card)
        if (card.rarity !== "LEGENDARY" && countCards < 2){
            const perCardCount = ++countCards
            setCountCards(perCardCount)
            
            const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
            const cardId = cardFinder.dbfId
            console.log(cardId)
            
            let deckCartObj = {
                userId: userId,
                carddbfId: cardId
            }

            updateDeckCart(deckCartObj)


        } else if (card.rarity === "LEGENDARY" && countCards < 1){
            const perCardCount = ++countCards
            setCountCards(perCardCount)

            const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
            const cardId = cardFinder.id
            console.log(cardId)
            
            let deckCartObj = {
                userId: userId,
                carddbfId: cardId
            }

            updateDeckCart(deckCartObj)
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