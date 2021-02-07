import React, {useContext} from "react"
import { useHistory } from "react-router-dom"
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import {RatingContext} from "../../rating/RatingProvider"

export const NewestDecksCard = ({deck}) => {
    const { playerClasses } = useContext(PlayerClassContext)
    const { ratings } = useContext(RatingContext)

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)
    const history = useHistory()

    let thisDecksRatings = ratings.filter(r => r.deckId === deck.id)
    let theRating = 0
    
    thisDecksRatings.map(rating => {
        if (rating.rating === -1){
            --theRating
        } else if(rating.rating === 1){
            ++theRating
        }
        return theRating
    })

    const goToDeck = () => {
        history.push(`/decks/${deck.id}`)
    }

    return (
        <>
            <tr className="deck" onClick={goToDeck}>
                <td>{theRating}</td>
                <td>{deck.deck_name}</td>
                <td>{theClass?.name}</td>
                <td>{new Date(deck.published).toLocaleDateString('en-US')}</td>
            </tr>
        </>
    )

}
