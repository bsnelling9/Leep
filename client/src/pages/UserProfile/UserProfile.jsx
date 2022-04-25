import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './UserProfile.scss';
import SongCard from '../../components/SongCard/SongCard';
import Modal from "../../components/Modal/Modal";

export default function UserProfile (props) {

    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profiledata')).tokenInfo?.profileData);
    const [recentSongs, setRecentSongs] = useState([])
    const [modal, setModal] = useState(false);
    const [banner, setBanner] = useState([]);

    const getRecentSongs = async () => {
        try { 
            const response = await axios.get(`https://leep-server.herokuapp.com/profile/recent/${profile?.username}`);
            setRecentSongs(response.data)
        } catch (err) {
            console.error(err);
        }  
    }
  
    const getUpdates = async () => {
        try { 
            const response = await axios.get(`https://leep-server.herokuapp.com/profile/updated/${profile?.username}`);
            setProfile(response.data)
            const banner = await axios.get(`https://leep-server.herokuapp.com/profile/banner/${profile?.username}`);
            setBanner(banner.data)
        } catch (err) {
            console.error(err);
        }  
    }

    const updateBanner = async () => {
        try { 
            const banner = await axios.get(`https://leep-server.herokuapp.com/profile/banner/${profile?.username}`);
            setBanner(banner.data)
        } catch (err) {
            console.error(err);
        }  
    }


    const handlePlayCount = async (counter) => {
        console.log('click');
    }

    const handleModal = event => {
        setModal(!modal)
    }

    useEffect(() => {
        getRecentSongs();
        getUpdates();
    }, []) 

    return (
        <>
        <div className="profile"> 
            <div className="profile__wrapper">
                <div className="profile__banner">
                    {banner.length !== 0? <img className='profile__img' src={`data:image/*;base64,${banner[0]?.banner}`} alt="profile banner"/>: <></>}
                    <div className="profile__banner--container">
                        <h2 className="profile__username">{profile && profile?.username}</h2>
                        <button className="profile__btn" onClick={handleModal}><i className="fa-solid fa-camera fa-2x"></i></button>
                    </div>
                </div>
                <div className="profile__container">
                    <Link to='/editprofile'>
                        <button className="btn">Edit Profile</button>
                    </Link>
                    <Link to='/uploadsong'>
                        <button className="btn">Upload Song</button>
                    </Link>
                </div>
                <div className="profile__content">
                    <div className="profile__content--container">
                        <h3 className="profile__title">About</h3>
                        <div className="profile__container--wrapper">
                            <p className="profile__text">{profile?.content}</p>
                        </div>
                    </div>
                    <div className="profile__song-list">
                        <h3 className="profile__title">Most Popular</h3>
                        {recentSongs.map((song, index) => {
                            return (
                                <SongCard 
                                    key={song.songid}
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
            </div> 
        </div>
        {modal === true? (
            <Modal
                profile = {profile}
                handleModal = {handleModal}
                updateBanner = {updateBanner}
            />
          ) : <></>}
        </>
    )
}