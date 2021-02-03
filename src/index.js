import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom"
import { DeckTavern } from './components/DeckTavern';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <DeckTavern />
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
)