
import { Link } from 'react-router-dom';

export function HomePage(props){

    const pathList = (
    <ul className='gallery-container'>
        {props.pathListItems.map((slug, index) => (
        <li key={index}>
            <Link to={slug}>
                <div className='img-container'></div>
            </Link>
        </li>
        ))}
    </ul>
    );

    return (
        <div>{pathList}</div>
    )
}