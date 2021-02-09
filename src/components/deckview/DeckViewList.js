import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { DeckContext } from "../deckbuilder/decksidebar/DeckProvider"
import {DeckViewContext} from './DeckViewProvider'
import {DeckCardViewCard} from './DeckCardViewCard'
import "./DeckViewList.css"
import { UserContext } from "../user/UserProvider"
import { Button, ButtonGroup, Tooltip } from 'reactstrap';
import { PlayerClassContext } from "../deckbuilder/playerclass/PlayerClassProvider"
import { RatingContext } from "../rating/RatingProvider"

export const DeckViewList = () => {
    const { deck, getDeckById, deleteDeckById, setEditDeck, setDeckAuthor } = useContext(DeckViewContext)
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
        
        let deckPanel = document.getElementById("deckPanel")
        let ratingPanel = document.getElementById("rating")
        let customVersion = document.getElementById("customVersion")
        
        if(deck.userId === userId){
            
            deckPanel?.classList.remove("deckPanelInvisible")
            ratingPanel.classList.add("deckPanelInvisible")
            customVersion.classList.add("deckPanelInvisible")

        } else {

            deckPanel?.classList.add("deckPanelInvisible")
            ratingPanel.classList.remove("deckPanelInvisible")
            customVersion.classList.remove("deckPanelInvisible")
        }

        userVoted()

    }, [deck])

    const theClass = playerClasses.find(p => p.id === deck.playerClassId)
    let currentUser = users.find(u => u.id === userId)
    let thisDeck = deckCards.filter(c => c.deckId === parseInt(deckId))
    let ratingsForThisDeck = ratings.filter(r => r.deckId === parseInt(deckId))

    let theDeckCards = thisDeck.map(card => {
        let theCard = localCards.find(c => c.id === card.cardId)
        return theCard
    })

    // Sort by mana cost, and if mana cost is equal sort by name
    theDeckCards.sort((a,b) => {
        
        if(a.cost < b.cost){
            return -1
        } else if(a.cost > b.cost){
            return 1
        }

        if(a.name < b.name){
            return -1
        } else if(a.name > b.name){
            return 1
        }

        return 0
    })

    let classCards = theDeckCards.filter(c => c.cardClass !== "NEUTRAL")

    let neutralCards = theDeckCards.filter(c => c.cardClass === "NEUTRAL")
    

    const copyText = () => {
        toggle()

        let deckCodeToCopy = document.getElementById("deckCode")
        deckCodeToCopy.select()
        document.execCommand("copy")

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
    
    const userVoted = () => {
        if (didTheUserVote?.userId === userId) {
            document.getElementById("upvote").disabled = true;
            document.getElementById("downvote").disabled = true;
        }
    }

    let deckAuthor = users.find(u => u.id === deck.userId)

    const editTheDeck = () => {
        history.push(`/deckbuilder/create/${theClass.id}`)
        setEditDeck(deck.id)
        setDeckAuthor(deckAuthor.id)
        
    }

    return (
        <main>
            <section className="deckContainer">
                <div className="topDeckContainer">
                    <div className="deckInfo">
                        <h3 className="deckName">{deck.deck_name}</h3>
                        <b>Created By:</b> <Link className="profile" to={`/profile/${deckAuthor?.id}`}>{deckAuthor?.username}</Link> <br></br>
                        <b>Class:</b> {theClass?.name} <br></br>
                        <b>Date Published:</b> {new Date(deck.published).toLocaleDateString('en-US')} <br></br>
                        <b>Deck Info:</b> {deck.deck_info} <br></br><br></br>
                        
                    </div>

                    <div className="deckPanel" id="deckPanel">
                        <h3 className="header">Deck Admin Panel</h3>
                        <Button color="primary" id="delete" onClick={deleteDeck}>Delete Deck</Button>{' '}
                        <Button color="primary" id="edit" onClick={editTheDeck}>Edit Deck</Button>
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
                        <div className="rating" id="rating">
                            <h5>Rate This Deck:</h5>
                            <ButtonGroup size="sm">
                                <Button id="upvote" onClick={upvote}>Upvote</Button>
                                <Button id="downvote" onClick={downvote}>Downvote</Button>
                            </ButtonGroup>
                            <br></br>
                            <br></br>
                        </div>
                        
                        <div className="customVersion" id="customVersion">
                            <h5>Custom Version:</h5>
                            <div className="white">Take this deck to the deckbuilder to build your own version of it!</div>
                            <Button color="primary" id="edit" onClick={editTheDeck}>Customize</Button>
                            <br></br>
                            <br></br>
                        </div>

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