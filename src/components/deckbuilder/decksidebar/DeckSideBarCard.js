import React, { useContext } from "react"
import { DeckContext } from './DeckProvider'
import "./DeckSideBar.css"


export const DeckSideBarCard = ({card}) => {
    
    const { localCards, removeDeckCartCard } = useContext(DeckContext)
    
    // Match the local cards to the card object being passed in by dbfId
    const cardObj = localCards.find(c => c.dbfId === card.carddbfId)

    const removeCard = (cardObj) => {
        removeDeckCartCard(cardObj.id)
        console.log(cardObj)
        let theCard = document.getElementById(`${cardObj.carddbfId}`)
        let theX = document.getElementById(`x--${cardObj.carddbfId}`)
        theCard.classList.remove("greyscale")
        theX.classList.add('isVisible')                    

    }
    
    return (
        <li>
            <div className="cardOptionTileImage" onClick={event => removeCard(card)}>
                <img src={`https://art.hearthstonejson.com/v1/tiles/${cardObj?.art}.png`} className="card_TileImage" id={`${cardObj?.dbfId}`} alt={`${cardObj?.name}`}/>
                <img src={'/images/tileBlack.png'} className="tileBlackSideBar"/>
                <div className="cardOptionTileInfo__cardName">{cardObj?.name}</div>
                <div className="cardOptionTileInfo__cardCost">{cardObj?.cost}</div>
            </div>
        </li>
    )
}