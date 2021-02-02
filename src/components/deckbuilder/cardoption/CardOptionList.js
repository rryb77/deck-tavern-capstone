import React, { useContext, useEffect, useState } from "react"
import { encode, decode, FormatType } from "deckstrings";
import { CardOptionContext } from './CardOptionProvider'
import { CardOptionCard } from './CardOptionCard'
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import "./CardOptionList.css"
import { useParams } from "react-router-dom"
import { DeckContext } from "../decksidebar/DeckProvider"
import { DeckSideBarCard } from "../decksidebar/DeckSideBarCard"


export const CardOptionList = () => {
    
    const { cardOptions, getCardOptions } = useContext(CardOptionContext)
    const { getLocalCards, getDeckCart, deckCart, cardCountForDecks, destroyDeckCart } = useContext(DeckContext)

    const { getPlayerClassById } = useContext(PlayerClassContext)
    const [pClass, setPClass] = useState({})
    const {playerClassId} = useParams()
    const userId = parseInt(localStorage.getItem("decktavern_user"))

    const [theDeckName, setTheDeckName] = useState({
        name: ""
    })

    useEffect(() => {
        getPlayerClassById(playerClassId)
            .then((response) => {
                setPClass(response)
            })
            .then(getCardOptions)
            .then(getLocalCards)
            .then(() => getDeckCart(userId))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const playerClass = pClass.name
    let playerClassCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
    
    playerClassCards.sort((a, b) => {
        return a.cost - b.cost
    })

    // console.log(currentDeck)

    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newDeckName = { ...theDeckName }
        //animal is an object with properties.
        //set the property to the new value
        newDeckName[event.target.id] = event.target.value
        //update state
        setTheDeckName(newDeckName)
      }

    const saveTheDeck = () => {
        const deck = {
            cards: [], // [dbfId, count] pairs
            heroes: [pClass.classId], // hero id
            format: 1, // or 1 for Wild, 2 for Standard
        }

        for (let card of deckCart){
            
            console.log(card.carddbfId)
            let cardChosen = deck.cards.find(c => c[0] === card.carddbfId)
            console.log(`Card found: `,cardChosen)

            let cardIndex = deck.cards.indexOf(cardChosen)
            console.log(`Card Index: `, cardIndex)
            
            if (cardChosen !== undefined) {
                console.log(card.carddbfId)
                if (cardChosen[1] === 1) {
                    deck.cards[cardIndex] = [card.carddbfId, 2]
                }
            } else {
                deck.cards.push([card.carddbfId, 1])
            }
        }
        
        console.log(deck.cards)
        let deckstring = encode(deck)
        console.log(deckstring)
       
    }

    const clearTheDeck = () => {
        
    }

    return (
        <>
            <main className="container">

                <section className="leftContainer">
                    
                    <h2>{playerClass}</h2>

                    <div className="cardViewer">
                    {
                        playerClassCards.map(card => {
                            return <CardOptionCard key={card.dbfId} 
                                        card={card}/>
                        })
                    }
                    </div>

                </section>

                <section className="rightContainer">
                    
                    <div className="deckSidebar">
                        <h2>Sidebar</h2>
                        <div className="cardTileHolder">
                        <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Deck Name" value={theDeckName.name}/>
                        <div>Total Cards: {cardCountForDecks}</div>
                           {
                               deckCart.map(card => {
                                   return <DeckSideBarCard key={card.id}
                                                card={card}/>
                               })
                           }
                        <button className="btnSave" onClick={saveTheDeck}>Save</button><button className="btnClear" onClick={clearTheDeck}>Clear</button>
                        </div>
                    </div>

                </section>
                
            </main>
            
        </>
    )
}