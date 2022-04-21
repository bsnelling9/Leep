import './EditProfile.scss';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Redirect,Link } from "react-router-dom";


export default function EditProfile () {

    const[profile, setProfile] = useState((JSON.parse(sessionStorage.getItem('profiledata'))).tokenInfo.profileData);
    const[summary, SetSummary] = useState();
    const[bio, setBio] = useState();
    const[tags, setTags] = useState();
    const[submit, setSubmit] = useState(false);

    const editSummary = (event) => {
        SetSummary(
            event.target.value
        )
    }

    const editBio = event => {
        setBio (
            event.target.value
        )
    }

    const editTags = event => {
        setTags (
            event.target.value
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = profile.username
        const tag = tags
        await axios.patch(`http://localhost:8080/profile/edit`, {
            username,
            summary,
            bio,
            tag: tag
        })
        setSubmit(true)
    }

    const getUpdates = async () => {
        try { 
            const response = await axios.get(`http://localhost:8080/profile/updated/${profile?.username}`);
            setProfile(response.data)
            SetSummary(response.data.summary)
            setBio(response.data.content)
            setTags(response.data.tag)
        } catch (err) {
            console.error(err);
        }  
    }

    useEffect(() => {
        getUpdates();
    }, [])


    if(submit) {
        return <Redirect to='/userprofile'/>
    }


    return (
        <div className='edit'>
            <div className='edit__wrapper'>
                <div className='edit__banner'>
                    <h2 className='edit__username'>{profile.username}</h2>
                    <h2 className='edit__title'>Edit your profile below</h2>
                </div>
                <form className='edit__form' onSubmit={handleSubmit}>
                    <div className="edit__form--container">
                        <label className="edit__form--label" htmlFor="summary">Please tell us about your self in small detail?</label>
                        <textarea
                            className="edit__form--textarea"
                            type='text'
                            id='summary'
                            name='summary'
                            value={summary}
                            onChange={editSummary}
                        />
                    </div>
                    <div className="edit__form--container">
                        <label className="edit__form--label" htmlFor="bio">Please give us more details about your self?</label>
                        <textarea
                            className="edit__form--textarea"
                            type='text'
                            id='bio'
                            name='bio'
                            value={bio}
                            onChange={editBio}
                        />
                    </div>
                    <div className="edit__form--container">
                        <label className="edit__form--label" htmlFor="bio">Please enter your tags (e.g edm, electronic, folk) </label>
                        <textarea
                            className="edit__form--textarea"
                            type='text'
                            id='bio'
                            name='bio'
                            value={!tags? '': tags}
                            onChange={editTags}
                        />
                    </div>
                    <div className='edit__form--btn-container'>
                        <Link className='edit__form--btn' to='/userprofile'>
                            Cancel
                        </Link>
                        <button className='edit__form--btn'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}