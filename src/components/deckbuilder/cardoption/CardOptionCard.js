import React, { useContext, useEffect, useState } from "react"
import { CardOptionContext } from "./CardOptionProvider"
// import { encode, decode, FormatType } from "deckstrings";

// import { useHistory } from 'react-router-dom';

const deck = {
    cards: [], // [dbfId, count] pairs
    heroes: [], // passed in value
    format: 2, // or 1 for Wild, 2 for Standard
}


export const CardOptionCard = ({card, hero}) => {
    
    const {setDeckCards} = useContext(CardOptionContext)
    deck.heroes = [parseInt(hero)]

    // const history = useHistory()
    let [countCards, setCountCards] = useState(0)
    let [totalCards, setTotalCards] = useState(0)
    
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
                    if(card.rarity === "LEGENDARY") {
                        
                        return

                    } else if (card.rarity !== "LEGENDARY" && countCards < 2) {
                        
                        const perCardCount = ++countCards
                        setCountCards(perCardCount)
                        console.log(countCards)
                        setDeckCards([cardId, 2])
                        deck.cards[cardIndex] = [cardId, 2]
                        console.log(deck.cards)
                        const deckCardCount = ++totalCards
                        setTotalCards(deckCardCount)
                        console.log('Total Cards: ', totalCards)
                    }
                }
            }
        } else if (totalCards < 30){
            if(card.rarity === "LEGENDARY" && countCards < 1){
                const perCardCount = ++countCards
                setCountCards(perCardCount)
                setDeckCards([cardId, 1])
                deck.cards.push([cardId, 1])
                console.log(deck.cards)
                const deckCardCount = ++totalCards
                setTotalCards(deckCardCount)
                console.log('Total Cards: ', totalCards)

            } else if (card.rarity !== "LEGENDARY" && countCards < 2) {
                
                const perCardCount = ++countCards
                setCountCards(perCardCount)
                setDeckCards([cardId, 1])
                deck.cards.push([cardId, 1])
                console.log(deck.cards)
                const deckCardCount = ++totalCards
                setTotalCards(deckCardCount)
                console.log('Total Cards: ', totalCards)
            }
            
        }        
    }

    return (
        
        <section className="cardViewerOptions">
              <div className="cardImage">
                <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`${card?.dbfId}`} onClick={event => addCardsToDeck(card)} alt={`${card?.name}`}/>
              </div>
              <div className="cardCount">{countCards}</div>
        </section>
        
    )
}