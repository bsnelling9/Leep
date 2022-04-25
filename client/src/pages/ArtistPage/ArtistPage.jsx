import axios from "axios";
import './ArtistPage.scss';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SongCard from '../../components/SongCard/SongCard';


export default function ArtistPage(props) {

    const [artistProfile, setArtistProfile] = useState([]);
    const [artistTopSongs, setArtistTopSongs] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingData, setFollowingData] = useState([])
    const artistName = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://leep-server.herokuapp.com//artistprofile/${artistName.id}`)
            setArtistProfile ({
                artist: response.data[0].username,
                listeners: response.data[0].listeners,
                playcount: response.data[0].playcount,
                genres: response.data[0].tag,
                bio: response.data[0].summary
            });
            const songs = await axios.get(`https://leep-server.herokuapp.com/artistprofile/${artistName.id}/toptracks`);
            setArtistTopSongs (
                songs.data
            )
        } catch (err) {
            console.error(err);
        }
    }

    const getFollowing = async () => {
        const username = props.profileData.tokenInfo.profileData.username
        const alreadyFollowing = await axios.get(`https://leep-server.herokuapp.com/artistprofile/follow/${username}/${artistName.id}`)
        if(alreadyFollowing.data) {
            setIsFollowing (
                true
            )
            setFollowingData (
                alreadyFollowing.data
            )
        }
       
    }

    const handleFollow = async (event) => {
        const username = props.profileData.tokenInfo.profileData.username
        const follow = event.target.value
        setIsFollowing (true)
        await axios.post(`https://leep-server.herokuapp.com/artistprofile/${artistName.id}/follow`, {username: username, followArtist: follow })  
    }

    const handleUnfollow = async (event) => {
        try {
            const followid = followingData.followid
            const response = await axios.delete(`https://leep-server.herokuapp.com/artistprofile/${artistName.id}/unfollow`, {data: {followid: followid}})
            console.log(response)
            if (response) {
                setIsFollowing (false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlePlayCount = async (songid, plays) => {
        const newPlayCount = plays + 1
        console.log(songid, newPlayCount)
        await axios.post(`https://leep-server.herokuapp.com/songdata/${songid}/playcount`, { plays: newPlayCount })
  
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getFollowing();
    }, [isFollowing]);

    return (
        <div className="artist-page">
            <div className="artist-page__wrapper">
                <div className="artist-page__banner">
                    <h2 className="artist-page__artist">{artistProfile.artist}</h2>
                </div>
                <div className="artist-page__btn">
                    {!isFollowing? <button className="btn" onClick={handleFollow} value={artistProfile.artist}>Follow</button>:
                    <button className="btn" onClick={handleUnfollow} value={artistProfile.artist}>Following</button>}
                </div>
                <div className="artist-page__container">    
                    <div className="artist-page__content">
                        <h3 className="artist-page__title">About</h3>
                        <div className="artist-page__container--wrapper">
                            <p className="artist-page__text">{artistProfile.bio}</p>
                        </div>
                    </div>
                    <div className="artist-page__song-list">
                        <h3 className="artist-page__title">Most Popular</h3>
                        {artistTopSongs.map((song, index) => {
                            return (
                                <SongCard 
                                    key={song.songid}
                                    id={song.songid}
                                    position={index}
                                    name={song.songname}
                                    artist={song.username}
                                    playcount={song.plays}
                                    handlePlayCount={handlePlayCount}
                                />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}