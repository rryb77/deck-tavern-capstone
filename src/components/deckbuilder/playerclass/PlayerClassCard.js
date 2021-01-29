import React from "react"
import { useHistory } from 'react-router-dom';
// import druid from './classImages/Druid.png'

export const PlayerClassCard = ({playerclass}) => {
    const history = useHistory()
    console.log(`Inside PlayerClassCard: `, playerclass?.name)

    // let hero = ""

    // if (playerclass.name === "Druid"){
    //     hero = druid
    // }

    const playerClassChosen = () => {
        console.log('Hero clicked')
    }

    return (
        
        <section className="playerclassOptions">
              <img src={`images/${playerclass.name}.png`} className="hero_image" id={`hero--${playerclass?.id}`} onClick={event => playerClassChosen()} alt={`${playerclass?.name}`}/>
        </section>
        
    )
}