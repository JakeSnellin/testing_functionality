import './Reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HomePage } from '../Components/HomePage';
import { Bio } from '../Components/Bio';
import { Header } from '../Components/Header';
import { useEffect, useState } from "react";
import { getArtistUrls } from "../Util/Hygraph";
import { getInstaData } from "../Util/Instagram";

function App() {

  const [showHeader, setShowHeader] = useState(true);

  const [artists, setArtists] = useState([]);

  const getArtists = (urls, slugs) =>{
    setArtists(mapArtistUrls(urls, slugs)) 
}

const mapArtistUrls = (url, slug) => {
    return slug.map((slug, index) => (
        <li key={index}><Link to={slug}><div className='img-container' style={{backgroundImage: `url(${url[index]})`}}></div></Link></li>
    )
  )
}
  useEffect(() =>{
    getArtistUrls(getArtists);
  },[])

  return (
    <Router>
      <div className='wrapper'>
        {showHeader && <Header />} 
        <Switch>
          <Route path="/:slug"><Bio setShowHeader={setShowHeader}/></Route>
          <Route path="/"><HomePage artistUrls={artists} setShowHeader={setShowHeader}/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
