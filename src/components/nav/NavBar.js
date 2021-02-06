import React from "react"
// import { Link } from "react-router-dom"
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
    return (
        
        <Navbar color="dark" className="navbar" dark expand="md">
            <NavbarBrand href="/">The Deck Tavern</NavbarBrand>
            <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/decks">All Decks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/deckbuilder">Deck Builder</NavLink>
            </NavItem>
            <NavItem>
              
            </NavItem>
            </Nav>
            <NavbarText><NavLink href="/login" onClick={logout}>Logout</NavLink></NavbarText>
        </Navbar>
        
        
        
        // {/* // <ul className="navbar">
        // //     <li className="navbar__item active">
        // //         <Link className="navbar__link" to="/">Home</Link>
        // //     </li>
        // //     <li className="navbar__item">
        // //         <Link className="navbar__link" to="/decks">Decks</Link>
        // //     </li>
        // //     <li className="navbar__item">
        // //         <Link className="navbar__link" to="/deckbuilder">Deck Builder</Link>
        // //     </li>
        // //     <li className="navbar__item">
        // //         <Link className="navbar__link" onClick={logout} to="/login">Logout</Link>
        // //     </li>
        // // </ul> */}
    )
}

const logout = () => {
    localStorage.clear()
}