import React from "react"

export const DeckCardViewCard = ({card}) => {
    
    return (
        <div className="cardOptionTileImage">
                
                <img src={`https://art.hearthstonejson.com/v1/tiles/${card?.art}.png`} className="card_TileImage" id={`${card?.dbfId}`} alt={`${card?.name}`}/>
                <img src={'/images/cardMiddle.png'} className="cardMiddle" alt="card tile piece"/>
                <img src={'/images/manaText.png'} className="manaText" alt="card tile piece"/>
                <img src={'/images/cardRight.png'} className="cardRight" alt="card tile piece"/>
                <div className="cardTileInfo__cardName">{card?.name}</div>
                <div className="cardTileInfo__cardCost">{card?.cost}</div>
                <img src={'/images/cardMask.png'} className="cardMask" alt="card tile piece"/>
                
            </div>

    )
}