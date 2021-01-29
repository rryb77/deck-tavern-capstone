import React, { useContext, useEffect } from "react"
import { CardOptionContext } from './CardOptionProvider'
import { CardOptionCard } from './CardOptionCard'
import './CardOptionList.css'
export const CardOptionList = () => {
    
    const { cardOptions, getCardOptions } = useContext(CardOptionContext)

    useEffect(() => {
        getCardOptions()
    
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // const history = useHistory()

    const playerClass = "MAGE"
    const playerClassCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
    console.log(playerClassCards)

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