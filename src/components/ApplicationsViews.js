import React from "react"
import { Route } from "react-router-dom"
import { PlayerClassProvider } from "./deckbuilder/playerclass/PlayerClassProvider"
import { PlayerClassList} from "./deckbuilder/playerclass/PlayerClassList"
import { CardOptionProvider } from "./deckbuilder/cardoption/CardOptionProvider"
import { CardOptionList } from "./deckbuilder/cardoption/CardOptionList"
import { Home } from "./Home"

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
                    <Route exact path="/deckbuilder/create/:playerClassId(\d+)">
                        <CardOptionList />
                    </Route>
                </PlayerClassProvider>
            </CardOptionProvider>
        </>
    )
}