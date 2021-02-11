import React, { useContext } from "react"
import { DeckContext } from './DeckProvider'
import "./DeckSideBar.css"
import { DeckCartContext } from "../decksidebar/DeckCartProvider"


export const removeClasses = (card) => {
    let theCount = document.getElementById(`${card.dbfId}`)
    let theX = document.getElementById(`x--${card.dbfId}`)
    theCount.classList.add("greyscale")
    theX.classList.remove('isVisible')
}


export const DeckSideBarCard = ({card}) => {
    
    const { localCards } = useContext(DeckContext)
    const {removeDeckCartCard} = useContext(DeckCartContext)
    
    // Match the local cards to the card object being passed in by dbfId
    const cardObj = localCards.find(c => c.dbfId === card.carddbfId)

    const removeCard = (cardObj) => {
        
        removeDeckCartCard(cardObj.id)
        console.log(cardObj)
        let theCard = document.getElementById(`${cardObj.carddbfId}`)
        let theX = document.getElementById(`x--${cardObj.carddbfId}`)
        theCard.classList.remove("greyscale")
        theX.classList?.add('isVisible')                    

    }
        
    return (
        <li>
            <div className="cardOptionTileImage" onClick={event => removeCard(card)}>
                <img src={`https://art.hearthstonejson.com/v1/tiles/${cardObj?.art}.png`} className="card_SideTileImage" id={`${cardObj?.dbfId}`} alt={`${cardObj?.name}`}/>
                <img src={'/images/cardMiddle.png'} className="cardSideMiddle" alt="side tile piece"/>
                <img src={'/images/manaText.png'} className="manaSideText" alt="side tile piece"/>
                <img src={'/images/cardRight.png'} className="cardSideRight" alt="side tile piece"/>
                <div className="cardOptionTileInfo__cardName">{cardObj?.name}</div>
                <div className="cardOptionTileInfo__cardCost">{cardObj?.cost}</div>
                <img src={'/images/cardMask.png'} className="cardSideMask" alt="side tile piece"/>
            </div>
        </li>
    )
}