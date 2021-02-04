import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DeckContext } from "../decksidebar/DeckProvider"
import {DeckViewContext} from './DeckViewProvider'
import {DeckCardViewCard} from './DeckCardViewCard'
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import "./DeckViewList.css"

export const DeckViewList = () => {
    const { deck, getDeckById } = useContext(DeckViewContext)
    const {getLocalCards, getDeckCards, deckCards } = useContext(DeckContext)
    const { getPlayerClassById } = useContext(PlayerClassContext)
    const [pClass, setPClass] = useState({})
    const {deckId} = useParams()

    useEffect(() => {
        getDeckById(deckId)
            .then(getLocalCards)
            .then(getDeckCards)
            .then(console.log(deck.playerClassId))
            .then(() => {
                getPlayerClassById(pClass)
            })
            .then(() => {
                setPClass(deck.playerClassId)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(pClass)
        
    }, [pClass])

    let thisDeck = deckCards.filter(c => c.deckId === parseInt(deckId)) 

    return (
        <main>
            <section>
                <div>
                    {
                        thisDeck.map(card => {
                            return <DeckCardViewCard key={card.id} 
                                        card={card}/>
                        })
                    }
                </div>
            </section>
        </main>
    )
}