import React, { useContext, useEffect, useState } from "react"
import { CardOptionContext } from './CardOptionProvider'
import { CardOptionCard } from './CardOptionCard'
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import "./CardOptionList.css"
import { useParams } from "react-router-dom"

export const CardOptionList = () => {
    
    const { cardOptions, getCardOptions } = useContext(CardOptionContext)
    const { getPlayerClassById } = useContext(PlayerClassContext)
    const [pClass, setPClass] = useState({})
    const {playerClassId} = useParams()

    useEffect(() => {
        getPlayerClassById(playerClassId)
            .then((response) => {
                setPClass(response)
            })
            .then(getCardOptions)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // const history = useHistory()

    const playerClass = "MAGE"
    const playerClassCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
    console.log(playerClassCards)
    console.log(playerClassId)
    console.log(pClass)

    return (
        <>
            <h2>{playerClass}</h2>

            <div className="cardViewer">
                {
                    playerClassCards.map(card => {
                        return <CardOptionCard key={card.dbfId} 
                                    card={card} />
                    })
                }
            </div>
        </>
    )
}