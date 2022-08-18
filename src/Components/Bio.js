
import { Description } from "./Description"
import { Gallery } from "./Gallery"
import { VideoLink } from "./VideoLink"
import { Credits } from "./Credits"
import { Link } from 'react-router-dom';
import '../App/App.css';
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BioCloseButton } from "./BioCloseButton";
import { getBio } from "../Util/Hygraph";
import { SocialMedia } from "./SocialMedia";

export function Bio(props) {

    let history = useHistory();

    let {slug} = useParams();

    const [showBio, setShowBio] = useState(false);

    const [bioImage, setBioImage] = useState(null);
    const [bioDescription, setBioDescription] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);
    const [name, setName] = useState('');
    const [credits, setCredits] = useState([]);
    const [gallery, setGallery] = useState([]);

    useEffect(() =>{
        getBio(extractBioInfo, {
            variables: {
                slug: slug
            }});
    },[])

    const extractBioInfo = (bioData) =>{
        console.log(bioData)
        setBioImage(bioData.artists[0].bio.bioImage.url);
        setBioDescription(bioData.artists[0].bio.artistDescription);
        getSocialLinks(bioData.artists[0].bio.socialMediaLinks);
    }

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
    }

    function getSocialLinks(linksArray){
        if(linksArray != null){
            const socialLinks = linksArray.raw.children.map((item) =>{
               return item.children[1].href;
            })
            setSocialLinks(socialLinks);   
        }
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
                        <div className="bio-info">
                            <div className="bio-aside-text">
                                <h1 id="bio-title">Bio</h1>
                                <h1 id="bio-name">Josh Pugh</h1>
                            </div>
                            <div className="social-media">
                                <SocialMedia socialLinks={socialLinks}/>
                            </div>
                        </div>
                    </aside>
                    <section className="bio-content">
                        <div className="bio-image-container">
                            <div className="bio-image" style={{backgroundImage: `url(${bioImage})`}}>
                            </div>
                        </div>
                        <Description bioDescription={bioDescription}/>
                        <Credits />
                        <Gallery />
                        <VideoLink />
                    </section>
                </div>
            </div>
            </CSSTransition >
        </main>
    )
}