import React, { useEffect, useState } from "react"
// import { useHistory } from 'react-router-dom';

export const CardOptionCard = ({card}) => {
    
    // const history = useHistory()
    let [countCards, setCountCards] = useState(0)

    const cardOptionChosen = (card) => {
        console.log('Card clicked')
        // console.log(event.target.id)
        console.log(card)

        if (countCards < 2) {
            const newCardCount = ++countCards
            setCountCards(newCardCount)
        } 
        
    }

    return (
        
        <section className="cardViewerOptions">
              <div className="cardImage">
                <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`} className="card_image" id={`${card?.dbfId}`} onClick={event => cardOptionChosen(card.dbfId)} alt={`${card?.name}`}/>
              </div>
              <div className="cardCount">{countCards} /2</div>
        </section>
        
    )
}