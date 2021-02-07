import React, { useContext, useState } from "react"
import { DeckContext } from "../decksidebar/DeckProvider"
import { DeckCartContext } from "../decksidebar/DeckCartProvider"

export const CardByHeroClassCard = ({card}) => {
    
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    const { localCards } = useContext(DeckContext)
    const { updateDeckCart, cardCountForDecks } = useContext(DeckCartContext)

    let [countCards, setCountCards] = useState(0)

    const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
    const cardId = cardFinder?.id

    const cardWasClicked = (card) => {

        console.log(card)

        if (card.rarity !== "LEGENDARY" && countCards < 2){
            if (cardCountForDecks < 30) {
                const perCardCount = ++countCards
                setCountCards(perCardCount)
                
                const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
                const carddbfId = cardFinder?.dbfId
                const cardId = cardFinder?.id
                
                let deckCartObj = {
                    userId: userId,
                    cardId: cardId,
                    carddbfId: carddbfId
                }

                updateDeckCart(deckCartObj)

                if(countCards === 2){
                    let theCount = document.getElementById(`${card.dbfId}`)
                    let theX = document.getElementById(`x--${card.dbfId}`)
                    theCount.classList.add("greyscale")
                    theX.classList.remove('isVisible')

                }
            }
        } else if (card.rarity === "LEGENDARY" && countCards < 1){
            if (cardCountForDecks < 30) {
                const perCardCount = ++countCards
                setCountCards(perCardCount)

                const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
                const carddbfId = cardFinder.dbfId
                const cardId = cardFinder.id
                
                let deckCartObj = {
                    userId: userId,
                    cardId: cardId,
                    carddbfId: carddbfId
                }

                updateDeckCart(deckCartObj)
                
                if(countCards === 1){
                    let theCount = document.getElementById(`${card.dbfId}`)
                    let theX = document.getElementById(`x--${card.dbfId}`)
                    theCount.classList.add("greyscale")
                    theX.classList.remove('isVisible')


                }
            }
        }   
    }

    return (
        
        <section className="cardViewerOptions">
              <div className="cardImage">
                <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`${card?.dbfId}`} onClick={event => cardWasClicked(card)} alt={`${card?.name}`}/>
                <img src={'/images/redx.png'} className="redx isVisible" id={`x--${card.dbfId}`}/>
              </div>
              <div className="cardCount" id={`${cardId}`}>Added: {countCards}</div>
        </section>
        
    )
}