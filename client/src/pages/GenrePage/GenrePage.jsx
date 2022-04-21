import './GenrePage.scss';
import GenreCard from '../../components/GenreCard/GenreCard';
export default function GenrePage() {

    const genres = ["acoustic","blues","country","edm","folk","hip-hop","house", "indie", "jazz", "latin","metal",
        "opera",
        "piano",
        "pop",
        "reggae",
        "reggaeton",
        "rock",
        "soul",
    ]
    

    return (
        <div className='genre'>
            <div className='genre__wrapper'>
                <h2 className='genre__title'>Browse All</h2>
                <div className='genre__list'>
                    {genres.map((genre, index)=> {
                        return (
                            <GenreCard key={index} genre={genre}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
