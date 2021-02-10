import React, { useContext, useEffect, useState } from "react"
import { DeckContext } from "../decksidebar/DeckProvider"
import { DeckCartContext } from "../decksidebar/DeckCartProvider"


export const CardByHeroClassCard = ({card}) => {
    
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    const { localCards } = useContext(DeckContext)
    const { updateDeckCart, cardCountForDecks, deckCart } = useContext(DeckCartContext)

    let [countCards, setCountCards] = useState(0)

    const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
    const cardId = cardFinder?.id

    useEffect(() => {
        
        let thisCard = deckCart.filter(c => c.cardId === cardFinder?.id)
        const perCardCount = thisCard.length
        setCountCards(perCardCount)      

    }, [deckCart]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        
        if(card.rarity !== "LEGENDARY" && countCards === 2){
            let theCard = document.getElementById(`${card.dbfId}`)
            let theX = document.getElementById(`x--${card.dbfId}`)
            theCard.classList.add("greyscale")
            theX.classList.remove('isVisible')

        } else if (card.rarity === "LEGENDARY" && countCards === 1){
            let theCard = document.getElementById(`${card.dbfId}`)
            let theX = document.getElementById(`x--${card.dbfId}`)
            theCard.classList.add("greyscale")
            theX.classList.remove('isVisible')
        }

    }, [countCards])


    const cardWasClicked = (card) => {

        if (card.rarity !== "LEGENDARY" && countCards < 2){
            if (cardCountForDecks < 30) {

                const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
                const carddbfId = cardFinder?.dbfId
                const cardId = cardFinder?.id
                
                let deckCartObj = {
                    userId: userId,
                    cardId: cardId,
                    carddbfId: carddbfId
                }

                updateDeckCart(deckCartObj)

            }
        } else if (card.rarity === "LEGENDARY" && countCards < 1){
            if (cardCountForDecks < 30) {

                const cardFinder = localCards.find(c => c.dbfId === card.dbfId)
                const carddbfId = cardFinder.dbfId
                const cardId = cardFinder.id
                
                let deckCartObj = {
                    userId: userId,
                    cardId: cardId,
                    carddbfId: carddbfId
                }

                updateDeckCart(deckCartObj)
                
            }
        }   
    }

    return (
        
        <section className="cardViewerOptions">
              <div className="cardImage">
                <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`${card?.dbfId}`} onClick={event => cardWasClicked(card)} alt={`${card?.name}`}/>
                <img src={'/images/redx.png'} className="redx isVisible" id={`x--${card.dbfId}`} alt="Red X"/>
                <div className="cardCount" id={`${cardId}`}>Added: {countCards}</div>
              </div>
              
        </section>
        
    )
}