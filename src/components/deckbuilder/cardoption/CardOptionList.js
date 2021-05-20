import React, { useContext, useEffect, useState } from "react"
import { encode } from "deckstrings";
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
import {CardSearch} from './CardSearch'
import { Chart } from "react-google-charts";
import {NoCardsFound} from './NoCardsFoundCard'

export const CardOptionList = () => {
    
    // Context Providers
    const { cardOptions, getCardOptions, searchTerms, filter } = useContext(CardOptionContext)
    const { getLocalCards, addUserDeckTable, addCardDeckTable, getDeckCards, deckCards, localCards, updateCardDeckTable } = useContext(DeckContext)
    const { addRating } = useContext(RatingContext)
    const {getDeckCart, deckCart, cardCountForDecks, setCardCountForDecks, destroyDeckCart, updateDeckCart } = useContext(DeckCartContext)
    const { getPlayerClassById } = useContext(PlayerClassContext)
    const { editDeck, addDeck, deckPosted, setDeckPosted, updateDeck, deckAuthor, setDeckAuthor, getDeckById, deck} = useContext(DeckViewContext)

    // Edit deck ID (Only set if a user is editing a deck)
    const [ editDeckId, setEditDeckId] = useState(0)

    // The state of whether a deck is being edited or not
    const [edit, setEdit] = useState(false)
    
    // Player class
    const [pClass, setPClass] = useState({})

    // Use params capturing the player class ID
    const {playerClassId} = useParams()

    // User ID from session storage
    const userId = parseInt(localStorage.getItem("decktavern_user"))
    
    // Cards filtered by player class
    const [filteredCards, setFilteredCards] = useState([])

    // Cards filtered by neutral class
    const [filteredNeutralCards, setFilteredNeutralCards] = useState([])

    // Tab state, tracking which tab is currently active
    const [activeTab, setActiveTab] = useState('1');

    // State tracking whether cards were found or not
    const [classCardsWereFound, setClassCardsWereFound] = useState(true)
    const [neutralCardsWereFound, setNeutralCardsWereFound] = useState(true)


    // Use history to push the user to the proper views of the website
    const history = useHistory()

    // modal state
    const [modal, setModal] = useState(false);


    // Initialize the deck info object and populate as needed below
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
        if (deckAuthor === userId) {
            
            const tempDeckObj = {...userCreatedDeck}

            tempDeckObj.deck_name = deck.deck_name
            tempDeckObj.deck_info = deck.deck_info

            setUserCreatedDeck(tempDeckObj)

            // userCreatedDeck.deck_name = deck.deck_name
            // userCreatedDeck.deck_info = deck.deck_info
        }
        
    }, [deck])

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
                getDeckById(editDeck)      
        }
    }, [editDeck])


    useEffect(() => {
        let theCurrentCardCount = deckCart.length
        setCardCountForDecks(theCurrentCardCount)
    }, [deckCart])

    const manaSort = (arrayToSort) => {
        arrayToSort.sort((a, b) => {
            return a.cost - b.cost
        })

        return arrayToSort
    }

    // Get the name of the player class ex: "MAGE"
    const playerClass = pClass.name
    let playerClassCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
    let neutralClassCards = cardOptions.filter(c => c.cardClass === "NEUTRAL" && c.type !== "HERO")
    
    // Sort the player class cards by mana cost
    playerClassCards = manaSort(playerClassCards)

    // Sort the neutral cards by mana cost
    neutralClassCards = manaSort(neutralClassCards)

    useEffect(() => {
        
        setClassCardsWereFound(true)
        setNeutralCardsWereFound(true)
        
        
        if (searchTerms !== "") {
            const classCards = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
            const neutralCards = cardOptions.filter(c => c.cardClass === "NEUTRAL" && c.type !== "HERO")
            let subset = classCards.filter(card => card.name.toLowerCase().includes(searchTerms))
            let nSubset = neutralCards.filter(card => card.name.toLowerCase().includes(searchTerms))
            
            nSubset = manaSort(nSubset)
            setFilteredNeutralCards(nSubset)
            subset = manaSort(subset)
            setFilteredCards(subset)

        } else {
            setFilteredCards(playerClassCards)
            setFilteredNeutralCards(neutralClassCards)
        }

    }, [searchTerms, cardOptions])


    useEffect(() => {
        
        let theClassFilters = cardOptions.filter(c => c.cardClass === playerClass && c.type !== "HERO")
        let theNeutralFilters = cardOptions.filter(c => c.cardClass === "NEUTRAL" && c.type !== "HERO")

        if(filter.mana !== "ALL" && filter.mana < 7 && activeTab === '1'){
            theClassFilters = theClassFilters.filter(c => c.cost === parseInt(filter.mana))
            theNeutralFilters = theNeutralFilters.filter(c => c.cost === parseInt(filter.mana))
            
        
        } else if (filter.mana !== "ALL" && filter.mana >= 7 && activeTab === '1') {
            theClassFilters = theClassFilters.filter(c => c.cost >= parseInt(filter.mana))
            theNeutralFilters = theNeutralFilters.filter(c => c.cost >= parseInt(filter.mana))
          
            
        } else if (filter.mana !== "ALL" && filter.mana < 7 && activeTab === '2') {
            theClassFilters = theClassFilters.filter(c => c.cost >= parseInt(filter.mana))
            theNeutralFilters = theNeutralFilters.filter(c => c.cost >= parseInt(filter.mana))
 
            
        } else if (filter.mana !== "ALL" && filter.mana >= 7 && activeTab === '2') {
            theClassFilters = theClassFilters.filter(c => c.cost >= parseInt(filter.mana))
            theNeutralFilters = theNeutralFilters.filter(c => c.cost >= parseInt(filter.mana))
            
        }
        
        if(filter.rarity !== "ALL" && activeTab === '1'){
            theClassFilters = theClassFilters.filter(c => c.rarity === filter.rarity)
            theNeutralFilters = theNeutralFilters.filter(c => c.rarity === filter.rarity)

        } else if (filter.rarity !== "ALL" && activeTab === '2') {
            theClassFilters = theClassFilters.filter(c => c.rarity === filter.rarity)
            theNeutralFilters = theNeutralFilters.filter(c => c.rarity === filter.rarity)
        }

        if(filter.type !== "ALL" && activeTab === '1'){
            theClassFilters = theClassFilters.filter(c => c.type === filter.type)
            theNeutralFilters = theNeutralFilters.filter(c => c.type === filter.type)

        } else if (filter.type !== "ALL" && activeTab === '2') {
            theClassFilters = theClassFilters.filter(c => c.type === filter.type)
            theNeutralFilters = theNeutralFilters.filter(c => c.type === filter.type)
        }

        manaSort(theClassFilters)
        manaSort(theNeutralFilters)
        setFilteredCards(theClassFilters)
        setFilteredNeutralCards(theNeutralFilters)

        setClassCardsWereFound(true)
        setNeutralCardsWereFound(true)
                
    }, [filter, activeTab])


    useEffect(() => {
        if (filteredCards.length < 1){
            setClassCardsWereFound(false)
        }
    }, [filteredCards])


    useEffect(() => {
        if (filteredNeutralCards.length < 1 ){
            setNeutralCardsWereFound(false)
        }
    }, [filteredNeutralCards])

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

        zeroMana = 0
        oneMana = 0
        twoMana = 0
        threeMana = 0
        fourMana = 0
        fiveMana = 0
        sixMana = 0
        sevenPlusMana = 0

        setEdit(false)
    }

    let cardsFromDeckCart = deckCart.map(c => {
        let finder = localCards.find(card => card.id === c.cardId)
        return finder
    })

    let zeroMana = cardsFromDeckCart.filter(c => c.cost === 0).length
    let oneMana = cardsFromDeckCart.filter(c => c.cost === 1).length
    let twoMana = cardsFromDeckCart.filter(c => c.cost === 2).length
    let threeMana = cardsFromDeckCart.filter(c => c.cost === 3).length
    let fourMana = cardsFromDeckCart.filter(c => c.cost === 4).length
    let fiveMana = cardsFromDeckCart.filter(c => c.cost === 5).length
    let sixMana = cardsFromDeckCart.filter(c => c.cost === 6).length
    let sevenPlusMana = cardsFromDeckCart.filter(c => c.cost > 6).length
    

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    
    return (
        <>
            <main className="container">

                <section className="leftContainer">
                    
                    <h2 className="playerClassName">{playerClass} DECK</h2>
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
                            NEUTRAL
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <CardSearch/>
                        <TabPane tabId="1">
                        <Row>
                            <Col sm="12">                          
                            <div className="cardViewer">
                                
                                {classCardsWereFound ?            
                                
                                    filteredCards.map(card => {
                                        return <CardByHeroClassCard key={card.dbfId} 
                                                    card={card}/>
                                    })
                                
                                : 
                                <NoCardsFound/>
                                } 
                            </div>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                            <div className="neutralCardViewer">
                                
                                {neutralCardsWereFound ?
                                    
                                        filteredNeutralCards.map(card => {
                                            return <CardByNeutralClassCard key={card.dbfId} 
                                                        card={card}/>
                                        })
                                    :

                                    <NoCardsFound />
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
                                <Button color="success" className="btnSave" id="btnSave" onClick={toggleModal}>{edit ? 'Save Edit' : 'Save'}</Button><Button color="danger" className="btnClear" onClick={clearTheDeck}>Clear</Button>
                            </div>                        
                        </div>
                        <div className="manacurvechart">
                            <Chart className="manaCurveChartDisplayOptions"
                                    width={350}
                                    height={200}
                                    chartType="ColumnChart"
                                    loader={<div>Loading Mana Curve</div>}
                                    data={[
                                    ['Card Amount', 'Card Count: ', { role: 'style' }],
                                    ['0', zeroMana, 'gold'],
                                    ['1', oneMana, 'gold'],
                                    ['2', twoMana, 'gold'],
                                    ['3', threeMana, 'gold'],
                                    ['4', fourMana, 'gold'],
                                    ['5', fiveMana, 'gold'],
                                    ['6', sixMana, 'gold'],
                                    ['7+', sevenPlusMana, 'gold'],
                                    ]}
                                    options={{
                                    backgroundColor: '#000000',
                                    
                                    title: 'Mana Curve',
                                    titleTextStyle: {
                                        color: '#ffffff'
                                    },
                                    legend: {
                                        textStyle: {
                                            color: '#ffffff'
                                        }
                                    },
                                    chartArea: { 
                                        width: '100%',
                                        backgroundColor: {
                                            stroke: '#133',
                                            strokeWidth: 3
                                        }
                                    },
                                    hAxis: {
                                        title: 'Mana Cost',
                                        minValue: 0,
                                        titleTextStyle: {
                                            color: '#ffffff'
                                        },
                                        textStyle: {
                                            color: '#fff'
                                        },
                                    },
                                    yAxis: {
                                        titleTextStyle: {
                                            color: '#ffffff'
                                        },
                                    },
                                    vAxis: {
                                        gridlines: {
                                            color: '#000000'
                                        },
                                    },
                                    animation: {
                                        startup: true,
                                        easing: 'linear',
                                        duration: 1500,
                                      },
                                    }}
                                    legendToggle
                            />
                            </div> 
                    </div>

                </section>
                <div>
                  <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog" unmountOnClose={false}>
                      <ModalHeader toggle={toggleModal}>Save Your Deck</ModalHeader>
                      <ModalBody>
                      <Label htmlFor="deckname">Deck Name:</Label>
                      <Input type="text" id="deck_name" placeholder="Enter a deck name here" onChange={handleControlledInputChange} className="form-control" value={userCreatedDeck.deck_name} rows={5}/>
                        <Label htmlFor="deckinfo">Deck Info:</Label>
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