import './UploadSong.scss';
import axios from "axios";
import { useState } from 'react';
import { Redirect, Link } from "react-router-dom";
import '../SignupPage/SignupPage.scss';

export default function SongUpload() {

    const[profile] = useState((JSON.parse(sessionStorage.getItem('profiledata'))).tokenInfo.profileData);
    const[cover, setCover] = useState('');
    const[song, setSong] = useState('');
    const[genre, setGenre] = useState('');
    const[submit, setSubmit] = useState(false);

    const handleCover = event => {
        setCover(event.target.files[0]);
    }

    const handleSong = event => {
        setSong(event.target.value)
    } 

    const handleGenre = event => {
        setGenre(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', cover);
        formData.append('string', song);
        formData.append('string', genre);
        formData.append('string', profile.username);
        formData.append('string', profile.userid);
        try {
            const res = await axios.post(`http://localhost:8080/profile/upload-song`, formData)
            console.log(res)
            setSubmit(true)
        } catch(err) {
            console.log(err.message)
        }
    }

    if(submit) {
        return <Redirect to='/userprofile'/>
    }
    
    return (
        <div className='upload'>
            <div className='upload__wrapper'>
            <div className="signup__banner">
                    <h2 className="signup__logo">Upload a Song</h2>
                    <h2 className="signup__title">To Upload a Song Please Fill In Then From Below</h2>
                </div> 
                <form className='upload__form' encType="multipart/form-data" method="POST" onSubmit={handleSubmit} autoComplete='off'>
                    <div className="form__container">
                        <input 
                            className={"form__input upload--song"}
                            type='text'
                            id='song-name'
                            name='song-name'
                            required
                            value={song}
                            onChange={handleSong}
                        />
                        <label className="form__label upload--label" htmlFor="genre">Please tell us the name of your song?</label>
                    </div>
                    <div className="form__container">
                        <input 
                           className="form__input upload--song"
                           type='text'
                           id='genre'
                           name='genre'
                           required
                           value={genre}
                           onChange={handleGenre}
                        />
                        <label className="form__label upload--label" htmlFor="song-name">Please tells us the main genre (e.g. edm, folk, rock)</label>
                    </div>
                    <div className="upload__form--container">
                        <label className="upload__form--label" htmlFor="cover">Please Upload a Song Cover</label>
                        <input
                            className="form__input-file"
                            type='file'
                            id='cover'
                            name='cover'
                            accept="image/*"
                            onChange={handleCover}
                        />
                    </div>
                    <div className='upload__form--btn-container'>
                        <Link className='upload__form--btn' to='/userprofile'>
                            Cancel
                        </Link>
                        <button className='upload__form--btn'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}