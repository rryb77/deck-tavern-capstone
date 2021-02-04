import React, { useState, createContext } from "react"

export const DeckViewContext = createContext()

export const DeckViewProvider = (props) => {
    const [decks, setDecks] = useState([])
    const [deck, setDeck] = useState({})

    const getDecks = () => {
        return fetch("http://localhost:8088/decks")
        .then(res => res.json())
        .then(setDecks)
    }

    const getDeckById = (id) => {
        return fetch(`http://localhost:8088/decks/${id}`)
        .then(res => res.json())
        .then(setDeck)
    }


    return (
        <DeckViewContext.Provider value={{
            decks, setDecks, getDecks, deck, setDeck, getDeckById
        }}>
            {props.children}
        </DeckViewContext.Provider>
    )
}