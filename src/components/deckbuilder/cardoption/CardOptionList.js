import React, { useContext, useEffect, useState } from "react"
import { encode, decode, FormatType } from "deckstrings";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import classnames from 'classnames';
import { CardOptionContext } from './CardOptionProvider'
import { CardByHeroClassCard } from './CardByHeroClassCard'
import { CardByNeutralClassCard } from './CardByNeutralClassCard'
import { PlayerClassContext } from '../playerclass/PlayerClassProvider'
import "./CardOptionList.css"
import { useHistory, useParams } from "react-router-dom"
import { DeckContext } from "../decksidebar/DeckProvider"
import { DeckCartContext } from "../decksidebar/DeckCartProvider"
import { DeckSideBarCard } from "../decksidebar/DeckSideBarCard"
import { RatingContext } from "../../rating/RatingProvider"
import "../decksidebar/DeckSideBar.css"
import { DeckViewContext } from "../../deckview/DeckViewProvider";

export const CardOptionList = () => {
    
    const { cardOptions, getCardOptions, searchTerms } = useContext(CardOptionContext)
    const { getLocalCards, addUserDeckTable, addCardDeckTable, getDeckCards, deckCards, localCards, updateCardDeckTable } = useContext(DeckContext)
    const { addRating } = useContext(RatingContext)
    const {getDeckCart, deckCart, cardCountForDecks, setCardCountForDecks, destroyDeckCart, updateDeckCart} = useContext(DeckCartContext)
    const { getPlayerClassById } = useContext(PlayerClassContext)
    const { editDeck, setEditDeck, addDeck, deckPosted, setDeckPosted, updateDeck, deckAuthor, setDeckAuthor} = useContext(DeckViewContext)
    const [ editDeckId, setEditDeckId] = useState(0)
    const [pClass, setPClass] = useState({})
    const {playerClassId} = useParams()
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    const [edit, setEdit] = useState(false)

    const history = useHistory()

    // modal state
    const [modal, setModal] = useState(false);


    // Initialize the deck info and populate as needed below
    const [userCreatedDeck, setUserCreatedDeck] = useState({
        deck_name: "",
        deck_info: "",
        published: 0,
        playerClassId: 0,
        dust_cost: 0,
        userId: 0,
        deck_code: ""
    })

    useEffect(() => {
        getPlayerClassById(playerClassId)
            .then((response) => {
                setPClass(response)
            })
            .then(getCardOptions)
            .then(getLocalCards)
            .then(getDeckCart)
            .then(getDeckCards)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        
        if(editDeck > 0){
            let thisDeck = deckCards.filter(c => c.deckId === parseInt(editDeck))

            let theDeckCards = thisDeck.map(card => {
                let theCard = localCards.find(c => c.id === card.cardId)
                return theCard
            })
            for (let card of theDeckCards){
                            
                let deckCartObj = {
                    userId: userId,
                    cardId: card.id,
                    carddbfId: card.dbfId
                }
                updateDeckCart(deckCartObj)
                
            }
                setEdit(true)    
                setEditDeckId(editDeck)
                setEditDeck(0)
        }
    }, [editDeck])

    useEffect(() => {
        let theCurrentCardCount = deckCart.length
        setCardCountForDecks(theCurrentCardCount)
    }, [deckCart])

    // Get the name of the player class ex: "MAGE"
    const playerClass = pClass.name
    let playerClassCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
    let neutralClassCards = cardOptions.filter(c => c.cardClass === "NEUTRAL" && c.type !== "HERO")
    
    // Sort the player class cards by mana cost
    playerClassCards.sort((a, b) => {
        return a.cost - b.cost
    })

    // Sort the neutral cards by mana cost
    neutralClassCards.sort((a, b) => {
        return a.cost - b.cost
    })

    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         const subset = playerClassCards.filter(card => card.name.toLowerCase().includes(searchTerms))
    //         setFilteredCards(subset)
    //     } else {
    //         setFilteredCards(playerClassCards)
    //     }
    // }, [searchTerms, playerClassCards])

    useEffect(() => {
        if (cardCountForDecks === 30){
            document.getElementById("btnSave").disabled = false
        } else {
            document.getElementById("btnSave").disabled = true
        }
    }, [cardCountForDecks])


    useEffect(() => {

        if( edit === false) {
            
            if(deckPosted > 0) {
                let userDeckTable = {
                    deckId: deckPosted,
                    userId: userId
                }
            
            addUserDeckTable(userDeckTable)
                .then(() => {
                    
                    for (let obj of deckCart){
                        if (obj.userId === userId){
                            
                            let deckCardsTable = {
                                cardId: obj.cardId,
                                deckId: deckPosted
                            }
            
                            addCardDeckTable(deckCardsTable)
                        }  
                    }
                })
                .then(() => {
                    let ratingObj = {
                        deckId: deckPosted,
                        userId: userId,
                        rating: 0
                    }
            
                    addRating(ratingObj)
                })
                .then(() => {
                    setCardCountForDecks(0)
                    history.push(`/decks/${deckPosted}`)
                    setDeckPosted(0)
                })
                .then(() => {
                    let userCart = deckCart.filter(c => c.userId === userId)
    
                    for (let cartItem of userCart){
                        destroyDeckCart(cartItem.id)
                    }          
                })
            }
        } else if (edit === true && deckAuthor === userId){
            
            if(deckPosted > 0){
                setEdit(false)
                history.push(`/decks/${deckPosted}`)
                setDeckPosted(0)
                setDeckAuthor(0)
            }
        } else if (edit === true && deckAuthor !== userId){
            if(deckPosted > 0) {
                let userDeckTable = {
                    deckId: deckPosted,
                    userId: userId
                }
            
            addUserDeckTable(userDeckTable)
                .then(() => {
                    
                    for (let obj of deckCart){
                        if (obj.userId === userId){
                            
                            let deckCardsTable = {
                                cardId: obj.cardId,
                                deckId: deckPosted
                            }
            
                            addCardDeckTable(deckCardsTable)
                        }  
                    }
                })
                .then(() => {
                    let ratingObj = {
                        deckId: deckPosted,
                        userId: userId,
                        rating: 0
                    }
            
                    addRating(ratingObj)
                })
                .then(() => {
                    setCardCountForDecks(0)
                    history.push(`/decks/${deckPosted}`)
                    setDeckPosted(0)
                })
                .then(() => {
                    let userCart = deckCart.filter(c => c.userId === userId)
    
                    for (let cartItem of userCart){
                        destroyDeckCart(cartItem.id)
                    }          
                }).then(() => {
                    setEdit(false)
                    history.push(`/decks/${deckPosted}`)
                    setDeckPosted(0)
                    setDeckAuthor(0)
                })
            }
        }
    }, [deckPosted])

    const handleControlledInputChange = (event) => {
        const newDeck = { ...userCreatedDeck }
        newDeck[event.target.id] = event.target.value
        setUserCreatedDeck(newDeck)
    }

    const saveTheDeck = () => {
        
        const deck = {
            cards: [], // [dbfId, count] pairs
            heroes: [pClass.classId], // hero id
            format: 1, // or 1 for Wild, 2 for Standard
        }

        for (let card of deckCart){
            
            let cardChosen = deck.cards.find(c => c[0] === card.carddbfId)
            let cardIndex = deck.cards.indexOf(cardChosen)
            
            if (cardChosen !== undefined) {
                if (cardChosen[1] === 1) {
                    deck.cards[cardIndex] = [card.carddbfId, 2]
                }
            } else {
                deck.cards.push([card.carddbfId, 1])
            }
        }

        let deckstring = encode(deck)

        userCreatedDeck.published = Date.now()
        userCreatedDeck.userId = userId
        userCreatedDeck.playerClassId = parseInt(playerClassId)
        userCreatedDeck.deck_code = deckstring
        userCreatedDeck.dust_cost = 0

        if(edit === false) {
           
            toggleModal()
            addDeck(userCreatedDeck)

        } else if (edit === true && deckAuthor === userId){
            
            toggleModal()
            updateDeck(userCreatedDeck, editDeckId)
                .then(() => {

                    let thisDeck = deckCards.filter(c => c.deckId === parseInt(editDeckId))
                    let thisUserDeckCart = deckCart.filter(c => c.userId === userId)

                    let count = 0

                    for (let obj of thisUserDeckCart){
                        
                        let theID = thisDeck[count].id

                        let deckCardsTable = {
                            cardId: obj.cardId,
                            deckId: editDeckId
                        }

                        // console.log('The ID: ',theID)
                        // console.log('The updated card obj: ', deckCardsTable)
                        updateCardDeckTable(deckCardsTable, theID)
                        ++count
                    }
                }).then(() => {
                    let userCart = deckCart.filter(c => c.userId === userId)
    
                    for (let cartItem of userCart){
                        destroyDeckCart(cartItem.id)
                    }          
                })
        } else if(edit === true && deckAuthor !== userId){
            toggleModal()
            addDeck(userCreatedDeck)
        }
    }

    
    const toggleModal = () => setModal(!modal);

    const clearTheDeck = () => {
        let userCart = deckCart.filter(u => u.userId === userId)

        for(let entry of userCart){
            let theCard = document.getElementById(`${entry.carddbfId}`)
            let theX = document.getElementById(`x--${entry.carddbfId}`)
            theCard?.classList.remove("greyscale")
            theX?.classList.add("isVisible")
            destroyDeckCart(entry.id)
        }

        setEdit(false)
    }

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    
    return (
        <>
            <main className="container">

                <section className="leftContainer">
                    
                    <h2 className="playerClassName">{playerClass}</h2>
                    <div>
                    <Nav tabs>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            {playerClass}
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Neutral
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                            <div className="cardViewer">
                                {
                                    playerClassCards.map(card => {
                                        return <CardByHeroClassCard key={card.dbfId} 
                                                    card={card}/>
                                    })
                                }
                            </div>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                            <div className="neutralCardViewer">
                                {
                                    neutralClassCards.map(card => {
                                        return <CardByNeutralClassCard key={card.dbfId} 
                                                    card={card}/>
                                    })
                                }
                            </div>
                            </Col>
                        </Row>
                        </TabPane>
                    </TabContent>
                    </div>

                </section>

                <section className="rightContainer">
                    
                    <div className="deckSidebar sticky-top">
                        <h2 className="currentDeck">Current Deck</h2>
                        <div className="cardTileHolder">
                            <div className="totalCards">Total Cards: {cardCountForDecks}</div>
                            <br></br>
                            <div className="listContainer">
                                <ul className="deckSideBarCards" id="deckSideBarCards">
                                {
                                    deckCart.map(card => {
                                        return <DeckSideBarCard key={card.id}
                                                        card={card}/>
                                    })
                                }
                                </ul>
                            </div>
                            <div className="savePanel" id="savePanel">
                                <Button color="success" className="btnSave" id="btnSave" onClick={toggleModal}>{edit ? 'Save Edit' : 'Save'}</Button>{' '} <Button color="danger" className="btnClear" onClick={clearTheDeck}>Clear</Button>
                            </div>                           
                        </div>
                    </div>

                </section>
                <div>
                  <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog" unmountOnClose={false}>
                      <ModalHeader toggle={toggleModal}>Save Your Deck</ModalHeader>
                      <ModalBody>
                      <Label for="deckname">Deck Name:</Label>
                      <Input type="text" id="deck_name" placeholder="Enter a deck name here" onChange={handleControlledInputChange} className="form-control" value={userCreatedDeck.deck_name} rows={5}/>
                        <Label for="deckinfo">Deck Info:</Label>
                        <Input type="textarea" id="deck_info" onChange={handleControlledInputChange} placeholder="Enter any relevant information about your deck such as midrange aggro, etc.." value={userCreatedDeck.deck_info} rows={5}/>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="primary" onClick={saveTheDeck}> Save </Button>{' '}
                          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                      </ModalFooter>
                  </Modal>
                  </div>
            </main>
            
        </>
    )
}