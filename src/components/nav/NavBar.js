import React from "react"
import "./NavBar.css"
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

export const NavBar = (props) => {
    
    const thisUserId = parseInt(localStorage.getItem("decktavern_user"))
     
    return (
        
        <Navbar color="dark" className="navbar" dark expand="md">
            <NavbarBrand href="/">The Deck Tavern</NavbarBrand>
            <Nav className="mr-auto" navbar>
              
              <NavItem>
                <NavLink href="/decks">All Decks</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={`/profile/${thisUserId}`}>Your Decks</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/deckbuilder">Deck Builder</NavLink>
              </NavItem>
            </Nav>
            <NavbarText><NavLink href="/login" onClick={logout}>Logout</NavLink></NavbarText>
        </Navbar>
    )
}

const logout = () => {
    localStorage.clear()
}