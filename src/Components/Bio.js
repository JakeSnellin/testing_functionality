
import { Description } from "./Description"
import { Gallery } from "./Gallery"
import { VideoLink } from "./VideoLink"
import { Credits } from "./Credits"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../App/App.css';
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BioCloseButton } from "./BioCloseButton";

export function Bio(props) {

    let history = useHistory();

    const [showBio, setShowBio] = useState(false);

    useEffect(()=>{
        setShowBio(true);
        {props.setShowHeader(false)}
    },[])

    const transitionOut = ()=>{
        setShowBio(false);
        setTimeout(redirectHome, 100)
    }

    function redirectHome(){
        history.push("/");
        props.setShowHeader(true);
    }

    return (
        <main>
            <CSSTransition in={showBio} 
            timeout={300} 
            classNames="bio-elements"
            unmountOnExit
            >
            <div className="bio-transition-container">
            <BioCloseButton transitionOut={transitionOut}/>
                <div className="bio-container">
                    <aside className="bio-aside">
                        <h1>Bio</h1>
                        <h1>Josh Pugh</h1>
                        <p>sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                        <Link to="#">Link to other media</Link>
                        <div className="social-media">
                            <FontAwesomeIcon icon={ faTwitter }/>
                            <FontAwesomeIcon icon={ faFacebook }/>
                            <FontAwesomeIcon icon={ faInstagram }/>
                            <FontAwesomeIcon icon={ faLinkedin }/>
                        </div>
                    </aside>
                    <section className="bio-content">
                        <div className="bio-image-container">
                            <img className="bio-image" src='https://dazedimg-dazedgroup.netdna-ssl.com/1973/azure/dazed-prod/1310/9/1319449.jpg'></img>
                        </div>
                        <Description />
                        <Gallery />
                        <Credits />
                        <VideoLink />
                    </section>
                </div>
            </div>
            </CSSTransition >
        </main>
    )
}