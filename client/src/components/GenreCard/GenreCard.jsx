import './GenreCard.scss';

export default function GenreCard(props) {
    
    const randomColor = () => {
        const colorArray = ['dodgerblue1', 'yellow1', 'orange1', 'green-yellow1', 'blue1', 'orangered1','orange2', 'lightblue1', 'purple1', 'greenish1', 'greenish2']
        let color = colorArray[Math.floor(Math.random()*colorArray.length)]
        return color
    }
    return (
        <div className={`genre-card ${randomColor()}`}>
            <div className="genre-card__wrapper">
                <h3 className='genre-card__title'>{props.genre}</h3>
            </div>
        </div>
    )
}