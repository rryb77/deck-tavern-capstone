import React, { useContext, useEffect } from "react"
import { DeckViewContext } from '../deckview/DeckViewProvider'
import { PlayerClassContext } from "../playerclass/PlayerClassProvider"
import { NewestDecksCard } from "./NewestDecksCard"
import "./AllDeckList.css"
import { Table } from 'reactstrap';
import { RatingContext } from "../../rating/RatingProvider"
import { PopularDecksCard} from "./PopularDecksCard"

export const AllDeckList = () => {
    
    const { decks, getDecks } = useContext(DeckViewContext)
    const { getPlayerClasses } = useContext(PlayerClassContext)
    const { getRatings, ratings } = useContext(RatingContext)


    useEffect(() => {
        getDecks()
            .then(getPlayerClasses)
            .then(getRatings)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    let newestDecks = decks

    newestDecks.sort((a, b) => {
        return b.id - a.id
    })

    let popularDecks = decks
  
    return (
        <main className="container">
            <section className="newestDecks">
                <h3 className="newestDeckHeader">Newest Decks</h3>
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
                                    return <NewestDecksCard key={deck.id} 
                                        deck={deck}/>
                                })
                            }
                        </thead>
                        <tbody>

                        </tbody>
                    </Table> 
            </section>
            <section className="highestRatedDecks">
                <h3 className="header">Popular Decks</h3>
                    <Table dark>
                        <thead>
                            <tr>
                            <th>Rating</th>
                            <th>Deck Name</th>
                            <th>Class</th>
                            <th>Published</th>
                            </tr>
                            {
                                popularDecks.map(deck => {
                            
                                    return <PopularDecksCard key={deck.id} 
                                        deck={deck}/>
                                })
                            }
                        </thead>
                        <tbody>

                        </tbody>
                    </Table> 
            </section>
        </main>
    )

}