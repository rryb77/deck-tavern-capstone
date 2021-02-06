import React, { useContext, useState } from "react"
// import { DeckContext } from '../decksidebar/DeckProvider'

export const DeckCardViewCard = ({card}) => {
    
    // const { deckCards } = useContext(DeckContext)

    return (
        <div className="cardOptionTileImage">
                <img src={`https://art.hearthstonejson.com/v1/tiles/${card?.art}.png`} className="card_TileImage" id={`${card?.dbfId}`} alt={`${card?.name}`}/>
                <img src={'/images/cardMiddle.png'} className="cardMiddle"/>
                <img src={'/images/manaText.png'} className="manaText"/>
                <img src={'/images/cardRight.png'} className="cardRight"/>
                <div className="cardTileInfo__cardName">{card?.name}</div>
                <div className="cardTileInfo__cardCost">{card?.cost}</div>
            </div>

    )
}






            // <div className="cardOptionTileImage" onClick={event => removeCard(card)}>
            //     <img src={`https://art.hearthstonejson.com/v1/tiles/${cardObj?.art}.png`} className="card_TileImage" id={`${cardObj?.dbfId}`} alt={`${cardObj?.name}`}/>
            //     <img src={'/images/cardMiddle.png'} className="cardMiddle"/>
            //     <img src={'/images/manaText.png'} className="manaText"/>
            //     <img src={'/images/cardRight.png'} className="cardRight"/>
            //     <div className="cardOptionTileInfo__cardName">{cardObj?.name}</div>
            //     <div className="cardOptionTileInfo__cardCost">{cardObj?.cost}</div>
            // </div>



// /* <div className="cardTileImage">
//             <img src={`https://art.hearthstonejson.com/v1/tiles/${card.art}.png`} className="card_TileImage" id={`${card?.dbfId}`} alt={`${card?.name}`}/>
//             <img src={'/images/tileBlack.png'} className="tileBlack"/>
//             <div className="cardTileInfo__cardName">{card.name}</div>
//             <div className="cardTileInfo__cardCost">{card.cost}</div>
//         </div>