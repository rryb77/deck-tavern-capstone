import React, { useEffect, useState } from "react"
import { encode, decode, FormatType } from "deckstrings";

// import { useHistory } from 'react-router-dom';

const deck = {
    cards: [], // [dbfId, count] pairs
    heroes: [], // passed in value
    format: 2, // or 1 for Wild, 2 for Standard
}


export const CardOptionCard = ({card, hero}) => {
    
    // const history = useHistory()
    let [countCards, setCountCards] = useState(0)
    let [totalCards, setTotalCards] = useState(0)
    deck.heroes = [parseInt(hero)]
    console.log(deck)

    const addCardsToDeck = (card) => {
        
        let cardId = card.dbfId
        let cardFinder = deck.cards.find(c => c[0] === cardId)

        if (cardFinder !== undefined){
            
            const findIndex = deck.cards.findIndex((element, index) => {
                if(element[0] === cardId) {
                    return true
                }

                return false
            })

            let cardIndex = findIndex

            if(cardFinder[1] === 1){
                if(totalCards < 30){
                    deck.cards[cardIndex] = [cardId, 2]
                    console.log(deck.cards)
                    const deckCardCount = ++totalCards
                    setTotalCards(deckCardCount)
                    console.log('Total Cards: ',totalCards)
                }
                
            }
        } else if (totalCards < 30){
            deck.cards.push([cardId, 1])
            console.log(deck.cards)
            const deckCardCount = ++totalCards
            setTotalCards(deckCardCount)
            console.log('Total Cards: ',totalCards)
        }

        if (card.rarity === "LEGENDARY") {
            if (countCards < 1) {
                const perCardCount = ++countCards
                setCountCards(perCardCount)
            } 
        } else {
            if (countCards < 2) {
                const perCardCount = ++countCards
                setCountCards(perCardCount)
            } 
        }        
    }

    return (
        
        <section className="cardViewerOptions">
              <div className="cardImage">
                <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`${card?.dbfId}`} onClick={event => addCardsToDeck(card)} alt={`${card?.name}`}/>
              </div>
              <div className="cardCount">{countCards} /2</div>
        </section>
        
    )
}