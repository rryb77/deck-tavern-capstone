import React, { useContext, useEffect } from "react"
import { DeckViewContext } from '../deckview/DeckViewProvider'
import { PlayerClassContext } from "../deckbuilder/playerclass/PlayerClassProvider"
import "./UserDecks.css"
import { RatingContext } from "../rating/RatingProvider"
import { MDBDataTable} from 'mdbreact';
import { useHistory } from "react-router-dom"
import { UserContext } from '../user/UserProvider'

export const UserDeckList = () => {
    
    const { decks, getDecks } = useContext(DeckViewContext)
    const { getPlayerClasses, playerClasses } = useContext(PlayerClassContext)
    const { getRatings, ratings } = useContext(RatingContext)
    const { getUsers, users } = useContext(UserContext)

    const thisUserId = parseInt(localStorage.getItem("decktavern_user"))

    
    const history = useHistory()

    let myDecks = decks.filter(d => d.userId === thisUserId)

    useEffect(() => {
        getDecks()
            .then(getUsers)
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
            {
                label: 'Author',
                field: 'author',
                sort: 'asc',
                width: 150
            }
        ],
        rows: 
            myDecks.map(deck => {
                
                let thisDecksRatings = ratings.filter(r => r.deckId === deck.id)
                let theRating = 0
                const theClass = playerClasses.find(p => p.id === deck.playerClassId)
                let deckAuthor = users.find(u => u.id === deck.userId)

                
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
                    clickEvent: () => goToDeck(),
                    rating: theRating,
                    deckname: deck.deck_name,
                    class: theClass?.name,
                    published: new Date(deck.published).toLocaleDateString('en-US'),
                    author: deckAuthor?.username
                }

                return obj
            })
    }
  
    return (
        <main className="container">
            <section className="newestDecks">
                <h3 className="newestDeckHeader">Decks</h3>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        theadTextWhite
                        tbodyTextWhite
                        data={data}
                    />
            </section>
        </main>
    )

}