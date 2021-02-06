import React, { useContext, useEffect, useState } from "react"
import { DeckViewContext } from '../deckview/DeckViewProvider'
import { PlayerClassContext } from "../playerclass/PlayerClassProvider"
import { AllDecksCard } from "./AllDecksCard"
import "./AllDeckList.css"
import { Table } from 'reactstrap';

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
        <main className="container">
            <section className="newestDecks">
                <h3>Newest Decks</h3>
                <Table dark>
                    <thead>
                        <tr>
                        <th>Rating</th>
                        <th>Deck Name</th>
                        <th>Class</th>
                        <th>Published</th>
                        </tr>
                        {
                             newestDecks.map(deck => {
                                return <AllDecksCard key={deck.id} 
                                    deck={deck}/>
                            })
                        }
                    </thead>
                    <tbody>

                    </tbody>
                </Table> 
            </section>
            <section className="highestRatedDecks">
                TEst
            </section>
        </main>
    )

}