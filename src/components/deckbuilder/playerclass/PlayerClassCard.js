import React from "react"
import { useHistory } from 'react-router-dom';

export const PlayerClassCard = ({playerclass}) => {
    
    const history = useHistory()



    const playerClassChosen = () => {
        // TODO: Need to get the classname out of the hero image that was clicked then send it to CardOptionList so it has access to it
        history.push(`/deckbuilder/create/`)
    }

    return (
        
        <section className="playerclassOptions">
              <img src={`images/${playerclass.name}.png`} className="hero_image" id={`hero--${playerclass.id}`} onClick={event => playerClassChosen()} alt={`${playerclass.name}`}/>
        </section>
        
    )
}