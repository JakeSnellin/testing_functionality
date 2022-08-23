
import { Description } from "./Description"
import { Gallery } from "./Gallery"
import { Video } from "./Video"
import { Credits } from "./Credits"
import '../App/App.css';
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BioCloseButton } from "./BioCloseButton";
import { getBio } from "../Util/Hygraph";
import { SocialMedia } from "./SocialMedia";
import { InstaFeed } from "./InstaFeed";
import { getInstaData } from "../Util/Instagram";

export function Bio(props) {

    let history = useHistory();

    let {slug} = useParams();

    const [showBio, setShowBio] = useState(false);
    const [instaPostData, setInstaPostData] = useState(null);
    const [bioData, setBioData] = useState(null);

    useEffect(()=>{
        setShowBio(true);
        {props.setShowHeader(false)}
    },[])

    useEffect(() =>{

        getBio(setBioData, {
            variables: {
                slug: slug
            }});
        getInstaData(setInstaPostData);
    },[])

    const transitionOut = ()=>{
        setTimeout(redirectHome, 100);
    }

    function redirectHome(){
        props.setShowHeader(true);
        history.push("/");
    }

    function getSocialLinks(linksObj){
        if(linksObj !== null){
            return linksObj.raw.children.map((item) =>{
               return item.children[1].href;
            }) 
        }else return [];
    }

    function mapGalleryUrls(galleryObj){
        return (galleryObj.galleryImage.map((item, index) => {
            return <li key={index}><div className="bio-gallery-img-container" style={{backgroundImage: `url(${item.url})`}}></div></li>
        }))
    }

    if(!bioData){
        return null;
    }

    return (
        <main>
            <CSSTransition in={showBio} 
            timeout={300} 
            classNames="bio-elements"
            unmountOnExit
            >
            <div className="bio-transition-container">
            <BioCloseButton transitionOut={transitionOut} setShowBio={setShowBio}/>
                <div className="bio-outer-container">
                    <aside className="bio-aside">
                        <div className="bio-inner-container">
                            <div className="discover-graphic-container">
                                <a href={bioData.artists[0].bio.discoverLink} target="_blank"><div className="discover-graphic" style={{backgroundImage: `url(${bioData.artists[0].bio.discoverGraphic.url})`}}></div></a>
                            </div>
                            <div className="bio-info">
                                <div className="bio-aside-text">
                                    <h1 id="bio-title">Bio</h1>
                                    <h1 id="bio-name">{bioData.artists[0].bio.name}</h1>
                                </div>
                                <div className="social-media">
                                    <SocialMedia socialLinks={getSocialLinks(bioData.artists[0].bio.socialMediaLinks)}/>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <section className="bio-content">
                        <div className="bio-image-container">
                            <div className="bio-image" style={{backgroundImage: `url(${bioData.artists[0].bio.bioImage.url})`}}>
                            </div>
                        </div>
                        <Description bioDescription={bioData.artists[0].bio.artistDescription}/>
                        <Credits credits={bioData.artists[0].bio.credits.html}/>
                        <Gallery galleryImages={mapGalleryUrls(bioData.artists[0].bio.gallery)}/>
                        <Video />
                        <InstaFeed instaPostData={instaPostData}/>
                    </section>
                </div>
            </div>
            </CSSTransition >
        </main>
    )
}