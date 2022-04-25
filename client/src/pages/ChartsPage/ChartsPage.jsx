import './ChartsPage.scss';
import { useEffect, useState } from "react";
import TopSongsCard from '../../components/TopSongsCards/TopSongsCard';
import axios from "axios";
import Banner from '../../assets/images/world-map.PNG';

export default function ChartsPage() {

    const [topSongs, setTopSongs] = useState([]);
    
    const fetchSongs = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts`);
            setTopSongs(
             response.data
            )
        } catch (err) {
            console.error(err);
        }
    }

    const handlePlayCount = async (songid, plays) => {
        const newPlayCount = plays + 1
        console.log(songid, newPlayCount)
        await axios.post(`https://leep-server.herokuapp.com/${songid}/playcount`, { plays: newPlayCount })
    } 

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div className='charts'>
            <div className='charts__banner'>
                <div className='charts__banner--wrapper'>
                    <div className='charts__banner--overlay'></div>
                    <img className='charts__banner--img' src={Banner} alt="banner for global top charts"/>
                </div>
            </div>
            <div className='charts__wrapper'>
                <div className='charts__titles'>
                    <div className='charts__titles--posit'>
                        <h3 className='charts__title'>Poisition</h3> 
                    </div>
                    <div className='charts__titles--info'>
                        <h3 className='charts__title'>Song & Artist Name</h3>
                        <h3 className='charts__title'>Play Count</h3>
                    </div>
                </div>
                {topSongs.map((song, index) => {
                    return (
                        <TopSongsCard 
                            key={song.songid}
                            id={song.songid}
                            position={index}
                            name={song.songname}
                            artist={song.username}
                            playcount={song.plays}
                            img={song.songcover} 
                            handlePlayCount={handlePlayCount}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}