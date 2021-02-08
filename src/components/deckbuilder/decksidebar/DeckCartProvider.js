import React, { useState, createContext } from "react"

export const DeckCartContext = createContext()

export const DeckCartProvider = (props) => {
    
    const [deckCart, setDeckCart] = useState([])
    let [cardCountForDecks, setCardCountForDecks] = useState(0)

    const getDeckCart = () => {
        return fetch(`http://localhost:8088/deckcart`)
        .then(res => res.json())
        .then(setDeckCart)
    }

    const updateDeckCart = (deckCartObj) => {
        console.log(deckCartObj)
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
                let sidebar = document.getElementById("deckSideBarCards")
                    sidebar.scrollTop = sidebar.scrollHeight
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

    return (
        <DeckCartContext.Provider value={{
            deckCart, getDeckCart, updateDeckCart, destroyDeckCart, removeDeckCartCard, cardCountForDecks, setCardCountForDecks
        }}>
            {props.children}
        </DeckCartContext.Provider>
    )

}