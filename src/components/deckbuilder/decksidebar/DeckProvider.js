import React, { useState, createContext } from "react"

export const DeckContext = createContext()

export const DeckProvider = (props) => {
    const [deckCart, setDeckCart] = useState([])
    const [localCards, setLocalCards] = useState([])

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
    }

    const destroyDeckCart = (deckCartUserId) => {
        return fetch(`http://localhost:8088/deckcart/${deckCartUserId}`, {
            method: "DELETE"
        })
            .then(getDeckCart)
    }

    const removeDeckCartCard = id => {
        console.log(id)
        return fetch(`http://localhost:8088/deckcart/${id}`, {
            method: "DELETE"
        })
            .then(getDeckCart)
    }

    const getLocalCards = () => {
        return fetch(`http://localhost:8088/cards`)
        .then(res => res.json())
        .then(setLocalCards)
    }

    return (
        <DeckContext.Provider value={{
            deckCart, getDeckCart, updateDeckCart, destroyDeckCart, getLocalCards, localCards, removeDeckCartCard
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}