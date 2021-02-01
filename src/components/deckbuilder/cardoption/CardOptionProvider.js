import React, { useState, createContext } from "react"

export const CardOptionContext = createContext()

export const CardOptionProvider = (props) => {
    const [cardOptions, setCardOptions] = useState([])
    const [deckCards, setDeckCards] = useState([])

    const getCardOptions = () => {
        return fetch("https://api.hearthstonejson.com/v1/72661/enUS/cards.collectible.json")
        .then(res => res.json())
        .then(setCardOptions)
    }

    return (
        <CardOptionContext.Provider value={{
            cardOptions, getCardOptions, deckCards, setDeckCards
        }}>
            {props.children}
        </CardOptionContext.Provider>
    )
}