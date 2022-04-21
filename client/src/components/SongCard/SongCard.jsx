import './SongCard.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopSongsCard(props) {
    
    const position = props.position +1;

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
        <div className='song-card'>
            <div className='song-card__wrapper'>
                <div className='song-card__position'>
                    <h2 className='song-card__text'>
                        {position}
                    </h2>
                </div>
                <div className='song-card__info'>
                    <div className='song-cover__container' onClick={() => props.handlePlayCount(props.id, props.playcount)}>
                        {props.img? 
                            <div className='song-cover__wrapper'>
                                <img className='song-cover__img' src={`data:image/*;base64,${props.img}`} alt=""/>
                            </div> 
                        :
                            <div className={`song-cover__wrapper ${randomColor()}`}>
                                <i className={`fa-solid fa-${randomIcon()} fa-lg`}></i>
                            </div>}
                    </div> 
                </div>
                <div className='song-card__playcount'>
                    <h2 className='song-card__name song-card__text'>{props.name}</h2>
                    <p className='song-card__plays song-card__text'>{!props.playcount? '0': props.playcount}</p>
                </div>
            </div>
        </div>
    )
}