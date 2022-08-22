
import { useEffect } from 'react';

export function HomePage(props){

    useEffect(() =>{
        props.setShowHeader(true);
    },[])

    const artistListItems = (
    <ul className='home-gallery-container'>
        {props.artistUrls}
    </ul>
    );

    return (
        <div>{artistListItems}</div>
    )
}