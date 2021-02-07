import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { DeckContext } from "../decksidebar/DeckProvider"
import {DeckViewContext} from './DeckViewProvider'
import {DeckCardViewCard} from './DeckCardViewCard'
import "./DeckViewList.css"
import { UserContext } from "../../user/UserProvider"
import { Button, ButtonGroup, Tooltip } from 'reactstrap';
import { PlayerClassContext } from "../playerclass/PlayerClassProvider"
import { RatingContext } from "../../rating/RatingProvider"

export const DeckViewList = () => {
    const { deck, getDeckById, deleteDeckById } = useContext(DeckViewContext)
    const {getLocalCards, getDeckCards, deckCards, localCards } = useContext(DeckContext)
    const {playerClasses, getPlayerClasses } = useContext(PlayerClassContext)
    const { getUsers, users } = useContext(UserContext)
    const {deckId} = useParams()
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    const history = useHistory()
    const { getRatings, ratings, addRating } = useContext(RatingContext)
    
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    useEffect(() => {
        getDeckById(deckId)
            .then(getLocalCards)
            .then(getDeckCards)
            .then(getUsers)
            .then(getPlayerClasses)
            .then(getRatings)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(deck.userId === userId){
            document.getElementById("delete").disabled = false;
            document.getElementById("upvote").disabled = true;
            document.getElementById("downvote").disabled = true;

        } else {
            document.getElementById("delete").disabled = true;
        }

    }, [deck])

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)
    let currentUser = users.find(u => u.id === userId)
    let thisDeck = deckCards.filter(c => c.deckId === parseInt(deckId))
    let ratingsForThisDeck = ratings.filter(r => r.deckId === parseInt(deckId))

    let theDeckCards = thisDeck.map(card => {
        let theCard = localCards.find(c => c.id === card.cardId)
        return theCard
    })

    let classCards = theDeckCards.filter(c => c.cardClass !== "NEUTRAL")
    let neutralCards = theDeckCards.filter(c => c.cardClass === "NEUTRAL")

    const copyText = () => {
        toggle()

        let deckCodeToCopy = document.getElementById("deckCode")
        deckCodeToCopy.select()
        document.execCommand("copy")
        // alert(deckCodeToCopy.value)

        setTimeout(() => {
            setTooltipOpen(false)
        }, 1500);
        
    }

    const deleteDeck = () => {
        deleteDeckById(deckId)
        history.push(`/`)
    }

    const upvote = () => {
        
        let ratingObj = {
            deckId: parseInt(deckId),
            userId: userId,
            rating: 1
        }
        addRating(ratingObj)
    }

    const downvote = () => {
        
        let ratingObj = {
            deckId: parseInt(deckId),
            userId: userId,
            rating: -1
        }
        addRating(ratingObj)
    }

    let uniqueIdForClassCards = 0
    let uniqueIdForNeutralCards = 0
    let theRating = 0
    
    ratingsForThisDeck.map(rating => {
        if (rating.rating === -1){
            --theRating
        } else if(rating.rating === 1){
            ++theRating
        }
        return theRating
    })

    let didTheUserVote = ratingsForThisDeck.find(rating => rating.userId === userId)
    
    if (didTheUserVote?.userId === userId) {
        document.getElementById("upvote").disabled = true;
        document.getElementById("downvote").disabled = true;
    }

    return (
        <main>
            <section className="deckContainer">
                <div className="topDeckContainer">
                    <div className="deckInfo">
                        <h3 className="deckName">{deck.deck_name}</h3>
                        <b>Created By:</b> {currentUser?.username} <br></br>
                        <b>Class:</b> {theClass?.name} <br></br>
                        <b>Date Published:</b> {new Date(deck.published).toLocaleDateString('en-US')} <br></br>
                        <b>Deck Info:</b> {deck.deck_info} <br></br><br></br>
                        
                    </div>

                    <div className="deckPanel">
                        <h3 className="header">Deck Admin</h3>
                        <Button color="primary" id="delete" onClick={deleteDeck}>Delete Deck</Button>
                    </div>
                </div>
                <div className="bottomDeckContainer">
                    
                    <div className="classCards">
                        <br></br>
                        <h4 className="header">Class Cards</h4>
                        {
                            classCards.map(card => {
                                ++uniqueIdForClassCards
                                return <DeckCardViewCard key={uniqueIdForClassCards} 
                                            card={card}/>
                            })
                        }
                    </div>

                    <div className="neutralCards">
                        <br></br>
                        <h4 className="header">Neutral Cards</h4>
                        {
                            neutralCards.map(card => {
                                ++uniqueIdForNeutralCards
                                return <DeckCardViewCard key={uniqueIdForNeutralCards} 
                                            card={card}/>
                            })
                        }
                    </div>

                    <div className="extraDetails">
                        <br></br>
                        <h4 className="header">Extra Details</h4>
                        <br></br>
                        <h5>Total Votes: {theRating}</h5>
                        <br></br>
                        <h5>Rate This Deck:</h5>
                        <ButtonGroup size="sm">
                            <Button id="upvote" onClick={upvote}>Upvote</Button>
                            <Button id="downvote" onClick={downvote}>Downvote</Button>
                        </ButtonGroup>
                        <br></br>
                        <br></br>
                        <h5>Deck Code:</h5>
                        <textarea id="deckCode" name="deckCode" rows="2" cols="50" value={deck.deck_code} readOnly>
                        </textarea>
                        <br></br>
                        <Button color="primary" id={"btnCopy"} onClick={copyText}>Copy Deck Code</Button>
                        <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="btnCopy" trigger="click">
                            Copied Deck Code!
                        </Tooltip>
                        
                    </div>

                </div>
            </section>
            
        </main>
    )
}