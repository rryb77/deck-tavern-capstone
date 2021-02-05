import React, { useContext, useEffect, useState } from "react"
import { DeckViewContext } from '../deckview/DeckViewProvider'
import { PlayerClassContext } from "../playerclass/PlayerClassProvider"
import { AllDecksCard } from "./AllDecksCard"
import "./AllDeckList.css"

export const AllDeckList = () => {
    
    const { decks, getDecks } = useContext(DeckViewContext)
    const { getPlayerClasses } = useContext(PlayerClassContext)
    

    useEffect(() => {
        getDecks()
            .then(getPlayerClasses)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    let newestDecks = decks

    newestDecks.sort((a, b) => {
        return b.id - a.id
    })

    return (
        <main>
            <section className="newestDecks">
                <h3>Newest Decks</h3>
                {
                    newestDecks.map(deck => {
                        return <AllDecksCard key={deck.id} 
                                    deck={deck}/>
                    })
                }
            </section>
        </main>
    )

}