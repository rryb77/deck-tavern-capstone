import React, { useState, createContext } from "react"

export const DeckViewContext = createContext()

export const DeckViewProvider = (props) => {
    const [decks, setDecks] = useState([])
    const [deck, setDeck] = useState({})
    const [editDeck, setEditDeck] = useState(0)
    const [deckPosted, setDeckPosted] = useState(0)

    const getDecks = () => {
        return fetch("http://localhost:8088/decks")
        .then(res => res.json())
        .then(setDecks)
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
            .then(getDecks)
    }

    const getDeckById = (id) => {
        return fetch(`http://localhost:8088/decks/${id}`)
        .then(res => res.json())
        .then(setDeck)
    }

    const deleteDeckById = (id) => {
        return fetch(`http://localhost:8088/decks/${id}`, {
            method: "DELETE"
        })
            .then(getDecks)
    }

    const updateDeck = (deckObj, id) => {
        return fetch(`http://localhost:8088/decks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(deckObj)
        })
            .then(()=> {
                setDeckPosted(id)
            })
            .then(getDecks)
    }

    return (
        <DeckViewContext.Provider value={{
            decks, setDecks, getDecks, deck, setDeck, getDeckById, deleteDeckById, editDeck, setEditDeck, addDeck, deckPosted, setDeckPosted, updateDeck
        }}>
            {props.children}
        </DeckViewContext.Provider>
    )
}