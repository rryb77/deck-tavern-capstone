import React from "react";
import { Jumbotron, Button } from 'reactstrap';
import { useHistory } from "react-router-dom"

export const Home = (props) => {
    
    const history = useHistory()

    const deckbuilder = () => {
        history.push(`/deckbuilder`)
    }

    return (
        <center>
            
            <div className="homeJumbotron">
            <img src={'/images/jumboBanner.png'} className="jumboBanner" id={`jumboBanner`}/>
                <Jumbotron>
                    <h1 className="display-3">Hello, traveler!</h1>
                    <p className="lead">Join us at the table to build, view, and share decks.</p>
                    <hr className="my-2" />
                    <p>Ready to give it a go? Click below to head straight to our deck builder!</p>
                    <p className="lead">
                    <Button color="primary" onClick={deckbuilder}>Get Started</Button>
                    </p>
                </Jumbotron>
            </div>
        </center>
      );
}