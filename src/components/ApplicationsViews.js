import React from "react"
import { Route } from "react-router-dom"
import { PlayerClassProvider } from "./deckbuilder/playerclass/PlayerClassProvider"
import { PlayerClassList} from "./deckbuilder/playerclass/PlayerClassList"
import { CardOptionProvider } from "./deckbuilder/cardoption/CardOptionProvider"
import { CardOptionList } from "./deckbuilder/cardoption/CardOptionList"
import { Home } from "./Home"
import { DeckProvider } from "./deckbuilder/decksidebar/DeckProvider"
import { DeckViewList } from "./deckbuilder/deckview/DeckViewList"
import { DeckViewProvider } from "./deckbuilder/deckview/DeckViewProvider"
import { UserProvider } from "./user/UserProvider"
import { AllDeckList } from "./deckbuilder/alldecks/AllDecksList"
import { RatingProvider } from "./rating/RatingProvider"
import { DeckCartProvider } from "./deckbuilder/decksidebar/DeckCartProvider"
// import {CardSearch} from "./deckbuilder/cardoption/CardSearch"

export const ApplicationViews = () => {
    
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
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
                                            {/* <CardSearch/> */}
                                            <CardOptionList />
                                        </Route>

                                        <Route exact path="/decks">
                                            <AllDeckList />
                                        </Route>
                                        
                                        <Route exact path="/decks/:deckId(\d+)">
                                            <DeckViewList />
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