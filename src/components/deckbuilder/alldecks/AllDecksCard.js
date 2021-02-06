import React, {useContext} from "react"
import { useHistory } from "react-router-dom"
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import { Table } from 'reactstrap';

export const AllDecksCard = ({deck}) => {
    const { playerClasses } = useContext(PlayerClassContext)

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)
    const history = useHistory()

    const goToDeck = () => {
        history.push(`/decks/${deck.id}`)
    }

    return (
        <>
            <tr className="deck" onClick={goToDeck}>
                <th scope="row">{deck.id}</th>
                <td>{deck.deck_name}</td>
                <td>{theClass?.name}</td>
                <td>{new Date(deck.published).toLocaleDateString('en-US')}</td>
            </tr>
        </>
    )

}
