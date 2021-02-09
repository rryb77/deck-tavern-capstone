import React, { useContext } from "react"
import { CardOptionContext } from "./CardOptionProvider"

export const CardSearch = () => {
  const { setSearchTerms } = useContext(CardOptionContext)

  return (
    <>
      <div className="filters">
          Card Search:
          <input type="text"
            className="input--wide"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search for a card... " />
      </div>
    </>
  )
}