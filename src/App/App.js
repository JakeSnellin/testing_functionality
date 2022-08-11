import './Reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../Components/HomePage';
import { Bio } from '../Components/Bio';
import React, { useState } from "react";
import { Header } from '../Components/Header';


function App() {

  const [showHeader, setShowHeader] = useState(true);

  const pathListItems = ['Jake', 'Tom', 'Whitney', 'Annie', 'Sam', 'Abi']

  return (
    <Router>
      <div className='wrapper'>
        {showHeader && <Header />} 
        <Switch>
          <Route path="/:slug"><Bio setShowHeader={setShowHeader}/></Route>
          <Route path="/"><HomePage pathListItems={pathListItems}/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
