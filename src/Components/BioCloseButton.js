import { Link } from 'react-router-dom';

export function BioCloseButton (props){

    return (
        <div className='bio-close'>
        <Link to="#" onClick={() => props.transitionOut()}>X</Link>
        </div>
    )
}