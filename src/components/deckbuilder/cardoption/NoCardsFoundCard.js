import React from 'react'

export const NoCardsFound = () => {


    return (
        
        <section className="cardViewerOptions" neutralCardsWereFound={false}>
            <div className="cardImage">
                <img src={'/images/nocardsfound.png'} className="nocardsfound" id={`x`} alt="No Cards Found"/>                               
            </div>
        </section>
    )
}