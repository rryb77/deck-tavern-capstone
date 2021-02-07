import React, { useContext, useEffect } from "react"
import { DeckViewContext } from '../deckview/DeckViewProvider'
import { PlayerClassContext } from "../playerclass/PlayerClassProvider"
import "./AllDeckList.css"
import { RatingContext } from "../../rating/RatingProvider"
import { MDBDataTable} from 'mdbreact';
import { useHistory } from "react-router-dom"

export const AllDeckList = () => {
    
    const { decks, getDecks } = useContext(DeckViewContext)
    const { getPlayerClasses, playerClasses } = useContext(PlayerClassContext)
    const { getRatings, ratings } = useContext(RatingContext)
    
    const history = useHistory()

    useEffect(() => {
        getDecks()
            .then(getPlayerClasses)
            .then(getRatings)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const data = {
        columns: [
            {
                label: 'Rating',
                field: 'rating',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Deck Name',
                field: 'deckname',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Class',
                field: 'class',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Published',
                field: 'published',
                sort: 'asc',
                width: 150
            },
        ],
        rows: 
            decks.map(deck => {
                
                let thisDecksRatings = ratings.filter(r => r.deckId === deck.id)
                let theRating = 0
                const theClass = playerClasses.find(p => p.id === deck.playerClassId)

                
                thisDecksRatings.map(rating => {
                    if (rating.rating === -1){
                        --theRating
                    } else if(rating.rating === 1){
                        ++theRating
                    }
                    return theRating
                })

                const goToDeck = () => {
                    history.push(`/decks/${deck.id}`)
                }

                let obj = {
                    rating: theRating,
                    deckname: <div onClick={goToDeck}>{deck.deck_name}</div>,
                    class: theClass?.name,
                    published: new Date(deck.published).toLocaleDateString('en-US')
                }

                return obj
            })
    }
  
    return (
        <main className="container">
            <section className="newestDecks">
                <h3 className="newestDeckHeader">All Decks In The Tavern</h3>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        theadTextWhite
                        tbodyTextWhite
                        data={data}
                    />
            </section>
            {/* <section className="highestRatedDecks">
                <h3 className="header">Popular Decks</h3>
                <MDBDataTable
                        striped
                        bordered
                        small
                        theadTextWhite
                        tbodyTextWhite
                        order={['rating', 'asc']}
                        data={data}
                    />
            </section> */}
        </main>
    )

}