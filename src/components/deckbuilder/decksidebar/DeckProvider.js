import React, { useState, createContext } from "react"

export const DeckContext = createContext()

export const DeckProvider = (props) => {
    const [deckCart, setDeckCart] = useState([])
    const [localCards, setLocalCards] = useState([])
    let [cardCountForDecks, setCardCountForDecks] = useState(0)
    let [cardCountIndividually, setCardCountIndividually] = useState(0)
    const [deckPosted, setDeckPosted] = useState(0)
    const [deckCards, setDeckCards] = useState([])

    const getDeckCart = () => {
        return fetch(`http://localhost:8088/deckcart`)
        .then(res => res.json())
        .then(setDeckCart)
        .then(() => {
            let sidebar = document.getElementById("deckSideBarCards")
                sidebar.scrollTop = sidebar.scrollHeight
        })
    }

    const getDeckCards = () => {
        return fetch(`http://localhost:8088/deckcards`)
        .then(res => res.json())
        .then(setDeckCards)
    }

    const updateDeckCart = (deckCartObj) => {
        if(deckCartObj.carddbfId !== undefined){
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
        } else {
            console.log("Card was undefined...?", deckCartObj)
        }
        
    }

    const destroyDeckCart = (id) => {
        return fetch(`http://localhost:8088/deckcart/${id}`, {
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
            deckCart, getDeckCart, updateDeckCart, destroyDeckCart, getLocalCards, localCards, removeDeckCartCard, cardCountForDecks, setCardCountForDecks, cardCountIndividually, setCardCountIndividually, addDeck, deckPosted, addUserDeckTable, addCardDeckTable, getDeckCards, deckCards, setDeckPosted
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}