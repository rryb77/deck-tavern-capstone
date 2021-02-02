import React, { useContext, useEffect, useState } from "react"
import { CardOptionContext } from './CardOptionProvider'
import { CardOptionCard } from './CardOptionCard'
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import "./CardOptionList.css"
import { useParams } from "react-router-dom"
import { DeckContext } from "../decksidebar/DeckProvider"
import { DeckSideBarCard } from "../decksidebar/DeckSideBarCard"

const deck = {
    cards: [], // [dbfId, count] pairs
    heroes: [], // passed in value
    format: 2, // or 1 for Wild, 2 for Standard
}


export const CardOptionList = () => {
    
    const { cardOptions, getCardOptions, deckCards } = useContext(CardOptionContext)
    const { getLocalCards, getDeckCart, deckCart } = useContext(DeckContext)

    const { getPlayerClassById } = useContext(PlayerClassContext)
    const [pClass, setPClass] = useState({})
    const {playerClassId} = useParams()
    const userId = parseInt(localStorage.getItem("decktavern_user"))

    const [currentDeck, setCurrentDeck] = useState([])

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
                           {
                               deckCart.map(card => {
                                   return <DeckSideBarCard key={card.id}
                                                card={card}/>
                               })
                           }
                        </div>
                    </div>

                </section>
                
            </main>
            
        </>
    )
}