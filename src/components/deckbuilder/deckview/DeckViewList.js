import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DeckContext } from "../decksidebar/DeckProvider"
import {DeckViewContext} from './DeckViewProvider'
import {DeckCardViewCard} from './DeckCardViewCard'
import "./DeckViewList.css"
import { UserContext } from "../../user/UserProvider"
import { Button } from 'reactstrap';
import { PlayerClassContext } from "../playerclass/PlayerClassProvider"

export const DeckViewList = () => {
    const { deck, getDeckById, deleteDeckById } = useContext(DeckViewContext)
    const {getLocalCards, getDeckCards, deckCards, localCards } = useContext(DeckContext)
    const {playerClasses, getPlayerClasses } = useContext(PlayerClassContext)
    const { getUsers, users } = useContext(UserContext)
    const {deckId} = useParams()
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    const history = useHistory()

    useEffect(() => {
        getDeckById(deckId)
            .then(getLocalCards)
            .then(getDeckCards)
            .then(getUsers)
            .then(getPlayerClasses)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(deck.userId === userId){
            document.getElementById("delete").disabled = false;
        } else {
            document.getElementById("delete").disabled = true;
        }
    }, [deck])

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)
    console.log(theClass)
    let currentUser = users.find(u => u.id === userId)
    let thisDeck = deckCards.filter(c => c.deckId === parseInt(deckId))

    let theDeckCards = thisDeck.map(card => {
        let theCard = localCards.find(c => c.id === card.cardId)
        return theCard
    })

    let classCards = theDeckCards.filter(c => c.cardClass !== "NEUTRAL")
    let neutralCards = theDeckCards.filter(c => c.cardClass === "NEUTRAL")

    const copyText = () => {
        let deckCodeToCopy = document.getElementById("deckCode")
        deckCodeToCopy.select()
        document.execCommand("copy")
        alert(deckCodeToCopy.value)
    }

    const deleteDeck = () => {
        deleteDeckById(deckId)
        history.push(`/`)
    }

    return (
        <main>
            <section className="deckContainer">
                <div className="deckInfo">
                <h3>{deck.deck_name}</h3>
                <b>Created By:</b> {currentUser?.username} <br></br>
                <b>Class:</b> {theClass?.name} <br></br>
                <b>Date Published:</b> {new Date(deck.published).toLocaleDateString('en-US')} <br></br>
                <b>Deck Info:</b> {deck.deck_info} <br></br><br></br>
                <Button color="primary" id="delete" onClick={deleteDeck}>Delete Deck</Button>
                </div>
                <div className="bottomDeckContainer">
                    
                    <div className="classCards">
                        <br></br>
                        <h4>Class Cards</h4>
                        {
                            classCards.map(card => {
                                return <DeckCardViewCard key={card.id} 
                                            card={card}/>
                            })
                        }
                    </div>

                    <div className="neutralCards">
                        <br></br>
                        <h4>Neutral Cards</h4>
                        {
                            neutralCards.map(card => {
                                return <DeckCardViewCard key={card.id} 
                                            card={card}/>
                            })
                        }
                    </div>

                    <div className="extraDetails">
                        <br></br>
                        <h4>Extra Details</h4>
                        <br></br>
                        <h5>Deck Code:</h5>
                        <textarea id="deckCode" name="deckCode" rows="2" cols="50" value={deck.deck_code} readOnly>
                        </textarea>
                        <br></br>
                        <Button color="primary" onClick={copyText}>Copy Deck Code</Button>
                    </div>

                </div>
            </section>
        </main>
    )
}