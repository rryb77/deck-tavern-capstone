import React, { useContext } from "react"
import { CardOptionContext } from "./CardOptionProvider"
import "./CardSearch.css"

export const CardSearch = () => {
  const { setSearchTerms } = useContext(CardOptionContext)

  return (
    <>
      <div className="filters">
          <div>
          Card Search:
          <input type="text"
            className="input--wide"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search for a card... " />

            Mana filter: 
            <label for="manaCost--0" className="checkboxLabel">0</label>
            <input type="checkbox" id="manaCost--0" name="manaCost--0" value="0"></input>
            <label for="manaCost--1" className="checkboxLabel">1</label>
            <input type="checkbox" id="manaCost--1" name="manaCost--1" value="1"></input>
            <label for="manaCost--2" className="checkboxLabel">2</label>
            <input type="checkbox" id="manaCost--2" name="manaCost--2" value="2"></input>
            <label for="manaCost--3" className="checkboxLabel">3</label>
            <input type="checkbox" id="manaCost--3" name="manaCost--3" value="3"></input>
            <label for="manaCost--4" className="checkboxLabel">4</label>
            <input type="checkbox" id="manaCost--4" name="manaCost--4" value="4"></input>
            <label for="manaCost--5" className="checkboxLabel">5</label>
            <input type="checkbox" id="manaCost--5" name="manaCost--5" value="5"></input>
            <label for="manaCost--6" className="checkboxLabel">6</label>
            <input type="checkbox" id="manaCost--6" name="manaCost--6" value="6"></input>
            <label for="manaCost--7" className="checkboxLabel">7</label>
            <input type="checkbox" id="manaCost--7" name="manaCost--7" value="7"></input>
            
          </div>
      </div>
    </>
  )
}