import React, { useContext, useEffect, useState } from "react"
import {DeckViewContext} from './DeckViewProvider'


export const DeckViewList = () => {
    const { decks, getDecks } = useContext(DeckViewContext)

    useEffect(() => {
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

}