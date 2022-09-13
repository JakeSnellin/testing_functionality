
import { Description } from "./Description"
import { Gallery } from "./Gallery"
import { Video } from "./Video"
import { Credits } from "./Credits"
import '../App/App.css';
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { getBio } from "../Util/Hygraph";
import { SocialMedia } from "./SocialMedia";
import { InstaFeed } from "./InstaFeed";
import { getInstaData } from "../Util/Instagram";

export function Bio(props) {

    let history = useHistory();

    let {slug} = useParams();

    const [bioImage, setBioImage] = useState(null);
    const [bioDescription, setBioDescription] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);
    const [name, setName] = useState('');
    const [credits, setCredits] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [discoverGraphicUrl, setDiscoverGraphicUrl] = useState([]);
    const [discoverGraphicLink, setDiscoverGraphicLink] = useState('');
    const [instaPostData, setInstaPostData] = useState(null);
    const [showBio, setShowBio] = useState(false);


    useEffect(()=>{
        setShowBio(true);
        {props.setShowHeader(false)}
    },[])

    const extractBioInfo = (bioData) =>{
        setBioImage(bioData.artists[0].bio.bioImage.url);
        setBioDescription(bioData.artists[0].bio.artistDescription);
        mapSocialLinks(bioData.artists[0].bio.socialMediaLinks);
        mapGalleryUrls(bioData.artists[0].bio.gallery);
        setName(bioData.artists[0].bio.name);
        setCredits(bioData.artists[0].bio.credits.html);
        setDiscoverGraphicUrl(bioData.artists[0].bio.discoverGraphic.url);
        setDiscoverGraphicLink(bioData.artists[0].bio.discoverLink);
    }

    useEffect(() =>{
        getBio(extractBioInfo, {
            variables: {
                slug: slug
            }});
        getInstaData(setInstaPostData);
    },[])

    function mapSocialLinks(linksObj){
        if(linksObj !== null){
            setSocialLinks(linksObj.raw.children.map((item) =>{
               return item.children[1].href;
            })) 
        }else return [];
    }

    function mapGalleryUrls(galleryObj){
        setGalleryImages(galleryObj.galleryImage.map((item, index) => {
            return <li key={index}><div className="bio-gallery-img-container" style={{backgroundImage: `url(${item.url})`}}></div></li>
        }))
    }

    const handleClick = () => {
        setShowBio(false);
        setTimeout(redirectHome, 200);
    }

    function redirectHome(){
        props.setShowHeader(true);
        history.push("/");
    }

    console.log('render');

    return (
        <main>
            <CSSTransition in={showBio} 
            timeout={200} 
            classNames="bio-elements"
            unmountOnExit
            >
            <div className="bio-transition-container">
            <Link to="#" className="bio-close" onClick={() => handleClick()}>X</Link>
                <div className="bio-outer-container">
                    <aside className="bio-aside">
                        <div className="bio-inner-container">
                            <div className="discover-graphic-container">
                                <a href={discoverGraphicLink} target="_blank"><div className="discover-graphic" style={{backgroundImage: `url(${discoverGraphicUrl})`}}></div></a>
                            </div>
                            <div className="bio-info">
                                <div className="bio-aside-text">
                                    <h1 id="bio-title">Bio</h1>
                                    <h1 id="bio-name">{name}</h1>
                                </div>
                                <div className="social-media">
                                    <SocialMedia socialLinks={socialLinks}/>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <section className="bio-content">
                        <div className="bio-image-container">
                            <div className="bio-image" style={{backgroundImage: `url(${bioImage})`}}>
                            </div>
                        </div>
                        <Description bioDescription={bioDescription}/>
                        <Credits credits={credits}/>
                        <Gallery galleryImages={galleryImages}/>
                        <Video />
                        <InstaFeed instaPostData={instaPostData}/>
                    </section>
                </div>
            </div>
            </CSSTransition >
        </main>
    )
}