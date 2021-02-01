import React, { useEffect, useState } from "react"


export const DeckSideBarCard = (card) => {
    return (
        <div className="cardTileImage">
            <img src={`https://art.hearthstonejson.com/v1/tiles/${card.id}.png`} className="card_TileImage" id={`${card?.dbfId}`} alt={`${card?.name}`}/>
        </div>
    )
}