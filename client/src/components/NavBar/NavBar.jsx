import './NavBar.scss';
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar (props) {

    const[profileData, setProfileData] = useState(JSON.parse(sessionStorage.getItem('profiledata')));
   
    const handleClick = event => {
        console.log("clicked")
        sessionStorage.clear();
        setProfileData (null)
        props.logOut();
    }

    useEffect(() => {
        const profile = JSON.parse(sessionStorage.getItem('profiledata'));
        if(profile) {
            setProfileData ({
                profileData: profile.tokenInfo.profileData
            })
        } return
    }, [props.profileData])


    return (
        <header className='navbar'>
            <div className='navbar__wrapper'>
                <div className='navbar__container navbar__container--logo'>
                    <NavLink className="navbar__logo--link" to='/home'>
                        <h2 className='navbar__logo'>Leep</h2>
                    </NavLink>
                </div>
                <div className='navbar__container'>
                    <Link to='/home'>
                        <h3 className='navbar__text'>Home</h3>
                    </Link>
                </div>
                {profileData?.profileData? <><div className='navbar__container'>
                    <div className='account__img'>
                        {/* <img className='account__displaypic'/> */}
                    </div>
                    <NavLink to='/userprofile'>
                        <h3 className='account__name'>{profileData?.profileData.username}</h3>
                    </NavLink>
                </div> 
                <div className='navbar__container navbar__signup' onClick={handleClick}>
                    <NavLink className="navbar__link--signup" to='/login'>
                        <h3 className='navbar__text navbar__text--signup'>Log-out</h3>
                    </NavLink>
                </div>
                </>
                : (<><div className='navbar__container navbar__signup '>
                        <NavLink className="navbar__link--signup" to='/sign-up'>
                            <h3 className='navbar__text navbar__text--signup'>Sign-up</h3>
                        </NavLink>
                    </div>
                    <div className='navbar__container navbar__login'>
                        <NavLink className="navbar__link--signup" to='/login'>
                            <h3 className='navbar__text'>Log-in</h3>
                        </NavLink>
                    </div></>)
                }  
                <div className='navbar__container'>
                    <div className='navbar__list'>
                        <h3 className='navbar__item navbar__text'>Top Songs</h3>
                        <ul className='navbar__dropdown'>
                            <li className='navbar__dropdown--item'>
                                <NavLink to='/charts'><h3 className='navbar__text'>Overall</h3></NavLink>
                            </li>
                            <li className='navbar__dropdown--item'>    
                                <NavLink to='/browseall'><h3 className='navbar__text'>By Genre</h3></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}