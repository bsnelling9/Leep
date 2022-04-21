import axios from "axios";
import { useEffect, useState } from "react";
import './HomePage.scss';
import FollowingCards from '../../components/FollowingCard/FollowingCard';
import '../SignupPage/SignupPage.scss';
import { Redirect } from "react-router-dom";

export default function HomePage() {
    
    const [search, setSearch] = useState("");
    const [profile] = useState(JSON.parse(sessionStorage.getItem('profiledata')));
    const [following, setFollowing] = useState([]);
    const [artistExists, setArtistExists] = useState(false);
    const [error, SetError] = useState(false);

    const getFollowing = async () => {
        try { 
            const response = await axios.get(`http://localhost:8080/profile/following/${profile.tokenInfo?.profileData.username}`);
            sessionStorage.setItem('following', JSON.stringify(response.data));
            setFollowing(response.data)
       
        } catch (err) {
            console.error(err);
        }  
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const artist = search
        try { 
            const response = await axios.get(`http://localhost:8080/home/search/${artist}`);
            setArtistExists(response.data)
            if(!response.data) {
                SetError(true)
            }
        } catch (err) {
            console.error(err);
        }  
    }

    useEffect(() => {
        getFollowing();
    }, []) 

    if(artistExists) {
            return <Redirect to={`/artist/${search}`}/>
    }
    
    return (
        <>
            <div className="home">
                <div className="home__wrapper">
                    <div className="home__search">
                        <form className="search" onSubmit={handleSubmit} autoComplete='off'>
                            <input 
                                className={error? "search__input error": "search__input"}
                                type="text" 
                                name="search"
                                placeholder="Search for Artist"
                                value={search}
                                onChange={handleChange}
                            />
                            <div className="search__container">
                                <label className={error? 'search__label':'search__label--none'} htmlFor="search">It seems that {search} isn't in our database</label>
                            </div>  
                        </form>
                    </div>  
                    <div className="home__container">
                        <div className="home__following">
                            <div className="home__following--container">
                                <h3 className="home__subtitle">Artist You're Following</h3>
                            </div>
                            <div className="home__following--list">
                                {following.map(profile => {
                                    return (
                                        <FollowingCards 
                                            key={profile.followid}
                                            artist={profile.username_following}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

