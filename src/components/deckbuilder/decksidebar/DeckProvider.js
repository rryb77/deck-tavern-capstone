import React, { useState, createContext } from "react"

export const DeckContext = createContext()

export const DeckProvider = (props) => {
    const [localCards, setLocalCards] = useState([])
    let [cardCountIndividually, setCardCountIndividually] = useState(0)
    const [deckCards, setDeckCards] = useState([])

    const getDeckCards = () => {
        return fetch(`http://localhost:8088/deckcards`)
        .then(res => res.json())
        .then(setDeckCards)
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

    const updateCardDeckTable = (theCardDeckTable, id) => {
        return fetch(`http://localhost:8088/deckcards/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(theCardDeckTable)
        })
          .then(getDeckCards)
    }

    const getLocalCards = () => {
        return fetch(`http://localhost:8088/cards`)
        .then(res => res.json())
        .then(setLocalCards)
    }

    return (
        <DeckContext.Provider value={{
            getLocalCards, localCards, cardCountIndividually, setCardCountIndividually, addUserDeckTable, addCardDeckTable, getDeckCards, deckCards, updateCardDeckTable
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}