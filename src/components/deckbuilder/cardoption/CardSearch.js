import React, { useContext, useState } from "react"
import { CardOptionContext } from "./CardOptionProvider"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./CardSearch.css"

export const CardSearch = () => {
  const { setSearchTerms, filter, setFilter } = useContext(CardOptionContext)
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);


  


  const handleControlledInputChange = (event) => {
    const newFilter = { ...filter }
    newFilter[event.target.id] = event.target.value
    setFilter(newFilter)
  }

  return (
    <>
      <div className="filters sticky-top"> 
      

          <Navbar color="faded" light className="filterNav">
            <NavbarBrand className="mr-auto">
            Card Search:
              <input type="text"
                className="input--wide"
                onKeyUp={(event) => setSearchTerms(event.target.value)}
                placeholder="Search for a card... " />

            </NavbarBrand>
            
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar>               
                <NavItem>
                      <label for="mana">Filter By Mana:</label>

                      <select name="mana" id="mana" onChange={handleControlledInputChange}>
                        <option value="ALL">All</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7+</option>
                      </select>
                </NavItem>
                <NavItem>
                <label for="rarity">Filter By Rarity:</label>

                <select name="rarity" id="rarity" onChange={handleControlledInputChange}>
                  <option value="ALL">All</option>
                  <option value="COMMON">Common</option>
                  <option value="RARE">Rare</option>
                  <option value="EPIC">Epic</option>
                  <option value="LEGENDARY">Legendary</option>
                </select>
                </NavItem>
                <NavItem>
                <label for="type">Filter By Type:</label>

                <select name="type" id="type" onChange={handleControlledInputChange}>
                <option value="ALL">All</option>
                  <option value="MINION">Minion</option>
                  <option value="SPELL">Spell</option>
                  <option value="WEAPON">Weapon</option>
                </select>
                </NavItem>
              </Nav>
            </Collapse>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          </Navbar>
        
      </div>
      </>
  )
}