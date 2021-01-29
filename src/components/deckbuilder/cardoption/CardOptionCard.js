import React from "react"
// import { useHistory } from 'react-router-dom';

export const CardOptionCard = ({card}) => {
    
    // const history = useHistory()

    const cardOptionChosen = () => {
        console.log('Card clicked')
    }

    return (
        
        <section className="cardViewerCards">
              <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`card--${card?.dbfId}`} onClick={event => cardOptionChosen()} alt={`${card?.name}`}/>
        </section>
        
    )
}