import { Link } from 'react-router-dom';

export function BioCloseButton (props){

    const handleClick = () =>{
        props.setShowBio(false);
        props.transitionOut();  
    }

    return (
        <div className='bio-close'>
        <Link to="#" onClick={() => handleClick()}>X</Link>
        </div>
    )
}