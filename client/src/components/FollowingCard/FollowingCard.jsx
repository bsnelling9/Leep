import './FollowingCard.scss'
import { Link } from "react-router-dom";

export default function FollowingCard(props) {


    return (
        <Link to={`/artist/${props.artist}`}>
            <div className="following">
                <div className='following__wrapper'>
                    <div className='following__pfp'>
                        <div className='profile-pic'></div>
                    </div>
                    <p className='following__text'>{props.artist}</p>
                </div>
            </div>
        </Link>
    )
}