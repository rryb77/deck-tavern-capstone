import React, { useState, createContext } from "react"

export const DeckViewContext = createContext()

export const DeckProvider = (props) => {
    const [decks, setDecks] = useState([])

    const getDecks = () => {
        return fetch("https://api.hearthstonejson.com/v1/72661/enUS/cards.collectible.json")
        .then(res => res.json())
        .then(setDecks)
    }

    return (
        <DeckViewContext.Provider value={{
            decks, setDecks, getDecks
        }}>
            {props.children}
        </DeckViewContext.Provider>
    )
}