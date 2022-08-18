import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export function SocialMedia (props){

    const mapLinks = () => {
        if (props.socialLinks.length > 0){
            return props.socialLinks.map((item, index) => {
                if(item.includes("twitter")){
                    return <a href={item}  key={index} target="_blank" className="social-icon"><FontAwesomeIcon icon={ faTwitter }/></a>;
                }
                if(item.includes("facebook")){
                    return <a href={item} key={index} target="_blank" className="social-icon"><FontAwesomeIcon icon={ faFacebook }/></a>;
                }
                if(item.includes("instagram")){
                    return <a href={item} key={index} target="_blank" className="social-icon"><FontAwesomeIcon icon={ faInstagram }/></a>;
                }
            })
        }
    }

    return (
        <div>
            {mapLinks()}
        </div>
    )
}