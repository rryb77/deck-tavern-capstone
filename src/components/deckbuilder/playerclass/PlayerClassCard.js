import React from "react"
import { Link } from "react-router-dom"

export const PlayerClassCard = ({playerclass}) => {

    return (
        
        <section className="playerclassOptions">
              <Link to={`/deckbuilder/create/${playerclass.id}`}>
                <img src={`images/${playerclass.name}.png`} className="hero_image" id={`hero--${playerclass.id}`} alt={`${playerclass.name}`}/>
              </Link>
        </section>
        
    )
}