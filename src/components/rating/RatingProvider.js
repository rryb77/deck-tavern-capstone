import React, { useState, createContext } from "react"

export const RatingContext = createContext()

export const RatingProvider = (props) => {
    const [ratings, setRatings] = useState([])

    const getRatings = () => {
        return fetch("http://localhost:8088/rateddecks")
        .then(res => res.json())
        .then(setRatings)
    }

    const addRating = ratingObj => {
        return fetch("http://localhost:8088/rateddecks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ratingObj)
        })
        .then(getRatings)
    }

    return (
        <RatingContext.Provider value={{
            getRatings, addRating, ratings
        }}>
            {props.children}
        </RatingContext.Provider>
    )
}