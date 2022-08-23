
import { useEffect } from 'react';

export function HomePage(props){

    const artistListItems = (
    <ul className='home-gallery-container'>
        {props.artistUrls}
    </ul>
    );

    return (
        <div>{artistListItems}</div>
    )
}