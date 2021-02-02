import React, { useState, createContext } from "react"

export const DeckContext = createContext()

export const Deckrovider = (props) => {
    const [deckCart, setDeckCart] = useState([])

    const getDeckCart = () => {
        return fetch("http://localhost:8088/deckcart")
        .then(res => res.json())
        .then(setDeckCart)
    }

    const updateDeckCart = (deckCartObj) => {
        return fetch("http://localhost:8088/deckcart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deckCart)
        })
    }

    const destroyDeckCart = (deckCartUser) => {
        return fetch(`http://localhost:8088/deckcart/${deckCartUser}`, {
            method: "DELETE"
        })
    }

    return (
        <DeckContext.Provider value={{
            deckCart, getDeckCart, updateDeckCart, destroyDeckCart
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}