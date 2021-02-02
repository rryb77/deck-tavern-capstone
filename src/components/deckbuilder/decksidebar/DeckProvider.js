import React, { useState, createContext } from "react"

export const DeckContext = createContext()

export const DeckProvider = (props) => {
    const [deckCart, setDeckCart] = useState([])
    const [localCards, setLocalCards] = useState([])
    let [cardCountForDecks, setCardCountForDecks] = useState(0)
    let [cardCountIndividually, setCardCountIndividually] = useState(0)

    const getDeckCart = (userId) => {
        return fetch(`http://localhost:8088/deckcart?_expand=userId=${userId}`)
        .then(res => res.json())
        .then(setDeckCart)
    }

    const updateDeckCart = (deckCartObj) => {
        return fetch("http://localhost:8088/deckcart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deckCartObj)
        })
            .then(getDeckCart)
            .then(() => {
                let deckCounter = ++cardCountForDecks
                setCardCountForDecks(deckCounter)
            })
    }

    const destroyDeckCart = (deckCartUserId) => {
        return fetch(`http://localhost:8088/deckcart/${deckCartUserId}`, {
            method: "DELETE"
        })
            .then(getDeckCart)
    }

    const removeDeckCartCard = id => {
        return fetch(`http://localhost:8088/deckcart/${id}`, {
            method: "DELETE"
        })
            .then(getDeckCart)
            .then(() => {
                let deckCounter = --cardCountForDecks
                setCardCountForDecks(deckCounter)
            })
    }

    const addDeck = (deckObj) => {
        return fetch(`http://localhost:8088/userdecks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deckObj)
        })
    }

    const getLocalCards = () => {
        return fetch(`http://localhost:8088/cards`)
        .then(res => res.json())
        .then(setLocalCards)
    }

    return (
        <DeckContext.Provider value={{
            deckCart, getDeckCart, updateDeckCart, destroyDeckCart, getLocalCards, localCards, removeDeckCartCard, cardCountForDecks, cardCountIndividually, setCardCountIndividually
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}