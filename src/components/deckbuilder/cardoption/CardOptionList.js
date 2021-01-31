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

    const playerClass = pClass.name
    let playerClassCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
    
    playerClassCards.sort((a, b) => {
        return a.cost - b.cost
    })

    return (
        <>
            <main className="container">

                <section className="leftContainer">
                    
                    <h2>{playerClass}</h2>

                    <div className="cardViewer">
                    {
                        playerClassCards.map(card => {
                            return <CardOptionCard key={card.dbfId} 
                                        card={card} />
                        })
                    }
                    </div>

                </section>

                <section className="rightContainer">
                    
                    <div className="deckSidebar">
                        <h2>Sidebar</h2>
                    </div>

                </section>
                
            </main>
            
        </>
    )
}