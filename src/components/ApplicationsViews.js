import React from "react"
import { Route } from "react-router-dom"
import { PlayerClassProvider } from "./deckbuilder/playerclass/PlayerClassProvider"
import { PlayerClassList} from "./deckbuilder/playerclass/PlayerClassList"
import { CardOptionProvider } from "./deckbuilder/cardoption/CardOptionProvider"
import { CardOptionList } from "./deckbuilder/cardoption/CardOptionList"
import { Home } from "./Home"
import { DeckProvider } from "./deckbuilder/decksidebar/DeckProvider"
import { DeckViewList } from "./deckview/DeckViewList"
import { DeckViewProvider } from "./deckview/DeckViewProvider"
import { UserProvider } from "./user/UserProvider"
import { AllDeckList } from "./alldecks/AllDecksList"
import { RatingProvider } from "./rating/RatingProvider"
import { DeckCartProvider } from "./deckbuilder/decksidebar/DeckCartProvider"
import { UserDeckList} from "./userdecks/UserDecksList"

export const ApplicationViews = () => {
    
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <PlayerClassProvider>
                <Route exact path="/deckbuilder">
                    <PlayerClassList />
                </Route>
            </PlayerClassProvider>

            <CardOptionProvider>
                <PlayerClassProvider>
                    <DeckProvider>
                        <DeckViewProvider>                            
                            <UserProvider>
                                <RatingProvider>
                                    <DeckCartProvider>
                                        <Route exact path="/deckbuilder/create/:playerClassId(\d+)">
                                            <CardOptionList />
                                        </Route>

                                        <Route exact path="/decks">
                                            <AllDeckList />
                                        </Route>
                                        
                                        <Route exact path="/decks/:deckId(\d+)">
                                            <DeckViewList />
                                        </Route>

                                        <Route exact path="/profile/:userId(\d+)">
                                            <UserDeckList/>
                                        </Route>
                                    </DeckCartProvider>
                                </RatingProvider>
                            </UserProvider>
                        </DeckViewProvider>
                    </DeckProvider>
                </PlayerClassProvider>
            </CardOptionProvider>
        </>
    )
}