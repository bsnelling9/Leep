import './TopSongsCard.scss';
import { Link } from "react-router-dom";

export default function TopSongsCard(props) {

    const position = props.position +1;
    
    const checkCover = (a) => {
        const cover = a
        if(cover === "Pw==") {
            return false
        }
        else {
            return true
        }
    }

    const randomColor = () => {
        const colorArray = ['red', 'dodgerblue', 'yellow', 'blue', 'orange', 'lightblue', 'purple']
        let color = colorArray[Math.floor(Math.random()*colorArray.length)]
        return color
    }

    const randomIcon = () => {
        const iconArray = ['square', 'circle', 'plus', 'diamond', 'crown', 'star', 'play', 'anchor', 'archway', 'atom', 'anchor', 'chess-rook', 'cube', 'anchor']
        let icon = iconArray[Math.floor(Math.random()*iconArray.length)]
        return icon
    }
    return (
        <div className='card-chart'>
            <div className='card-chart__wrapper'>
                <div className='card-chart__position'>
                    <h2 className='card-chart__text'>
                        {position}
                    </h2>
                </div>
                <div className='song-cover__container' onClick={() => props.handlePlayCount(props.id, props.playcount)}>
                    {checkCover(props.img)? 
                        <div className='song-cover__wrapper'>
                            <img className='song-cover__img' src={`data:image/*;base64,${props.img}`} alt=""/>
                        </div> 
                    :
                    <div className={`song-cover__wrapper ${randomColor()}`}>
                        <i className={`fa-solid fa-${randomIcon()} fa-lj`}></i>
                    </div>}
                </div>
                <div className='card-chart__info'>
                    <h2 className='song__name card-chart__text'>{props.name}</h2>
                    <Link to={`/artist/${props.artist}`}><p className='song__artist card-chart__text'>{props.artist}</p></Link>
                </div>
                <div className='card-chart__data'>
                    <p className='song__plays card-chart__text'>{props.playcount}</p>
                </div>
            </div>
        </div>
    )
}