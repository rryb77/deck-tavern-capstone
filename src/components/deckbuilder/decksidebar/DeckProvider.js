import React, { useState, createContext } from "react"

export const DeckContext = createContext()

export const DeckProvider = (props) => {
    const [localCards, setLocalCards] = useState([])
    let [cardCountIndividually, setCardCountIndividually] = useState(0)
    const [deckPosted, setDeckPosted] = useState(0)
    const [deckCards, setDeckCards] = useState([])

    const getDeckCards = () => {
        return fetch(`http://localhost:8088/deckcards`)
        .then(res => res.json())
        .then(setDeckCards)
    }

    const addDeck = (deckObj) => {
        return fetch(`http://localhost:8088/decks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deckObj)
        })
            .then(response => response.json())
            .then(theDeck => {
                setDeckPosted(theDeck.id)
            })
    }

    const addUserDeckTable = (theUserDeckTable) => {
        return fetch(`http://localhost:8088/userdecks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(theUserDeckTable)
        })
    }

    const addCardDeckTable = (theCardDeckTable) => {
        return fetch(`http://localhost:8088/deckcards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(theCardDeckTable)
        })
    }

    const getLocalCards = () => {
        return fetch(`http://localhost:8088/cards`)
        .then(res => res.json())
        .then(setLocalCards)
    }

    return (
        <DeckContext.Provider value={{
            getLocalCards, localCards, cardCountIndividually, setCardCountIndividually, addDeck, deckPosted, addUserDeckTable, addCardDeckTable, getDeckCards, deckCards, setDeckPosted
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}