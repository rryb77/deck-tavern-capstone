import React, { useState, createContext } from "react"

export const CardOptionContext = createContext()

export const CardOptionProvider = (props) => {
    const [cardOptions, setCardOptions] = useState([])
    const [deckCards, setDeckCards] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")
    const [filter, setFilter] = useState({
        mana: "ALL",
        rarity: "ALL",
        type: "ALL",
      });

    const getCardOptions = () => {
        return fetch("https://api.hearthstonejson.com/v1/72661/enUS/cards.collectible.json")
        .then(res => res.json())
        .then(setCardOptions)
    }

    return (
        <CardOptionContext.Provider value={{
            cardOptions, getCardOptions, deckCards, setDeckCards, searchTerms, setSearchTerms, filter, setFilter
        }}>
            {props.children}
        </CardOptionContext.Provider>
    )
}