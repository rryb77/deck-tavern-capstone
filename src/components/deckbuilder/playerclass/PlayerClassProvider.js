import React, { useState, createContext } from "react"

export const PlayerClassContext = createContext()

export const PlayerClassProvider = (props) => {
    const [playerClasses, setPlayerClasses] = useState([])

    const getPlayerClasses = () => {
        return fetch("http://localhost:8088/playerclass")
        .then(res => res.json())
        .then((pc) => {
            setPlayerClasses(pc)
            return pc
        })
    }

    const addPlayerClass = playerClassObj => {
        return fetch("http://localhost:8088/playerclass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playerClassObj)
        })
        .then(getPlayerClasses)
    }

    const getPlayerClassById = (id) => {
        return fetch(`http://localhost:8088/playerclass/${id}`)
            .then(res => res.json())
    }

    return (
        <PlayerClassContext.Provider value={{
            playerClasses, getPlayerClasses, addPlayerClass, getPlayerClassById
        }}>
            {props.children}
        </PlayerClassContext.Provider>
    )
}