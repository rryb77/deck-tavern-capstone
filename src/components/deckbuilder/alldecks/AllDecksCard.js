import React, {useContext} from "react"
import { useHistory } from "react-router-dom"
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'

export const AllDecksCard = ({deck}) => {
    const { playerClasses } = useContext(PlayerClassContext)

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)
    const history = useHistory()

    const goToDeck = () => {
        history.push(`/decks/${deck.id}`)
    }

    return (
        <>
            <div className="deck" onClick={goToDeck}>
                <div className="deckInfo" id={deck.id}><b>Deck Name:</b> {deck.deck_name} <b>Class:</b> {theClass?.name} <b>Published:</b> {new Date(deck.published).toLocaleDateString('en-US')}</div>
            </div>
            <br></br>
        </>
    )

}
