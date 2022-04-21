import './Modal.scss';
import { useState } from 'react';
import axios from "axios";

export default function Modal (props) {

    const[banner, setBanner] = useState('');
    const [preview, setPreview] = useState();

    const handleBanner = event => {
        setBanner(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(event.target.files[0])
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('banner', banner);
        formData.append('string', props.profile.username);
        formData.append('string', props.profile.userid);
        console.log(formData)
        try {
            const res = await axios.post(`http://localhost:8080/profile/banner`, formData)
            console.log(res)
            props.handleModal()
            props.updateBanner()
        } catch(err) {
            console.log(err.message)
        }
    }

    console.log(preview)
    return (
        <>
        <div className="overlay" />
        <div className="modal">
            <div className='modal__wrapper'>
                <h2 className='modal__title'>Upload Banner</h2>
                <form className='upload__form' encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
                    <div className="upload__form--container">
                        <label className="upload__form--label" htmlFor="cover">Please Upload your Banner</label>
                        <input
                            className="form__input-file"
                            type='file'
                            id='cover'
                            name='cover'
                            accept="image/*"
                            onChange={handleBanner}
                        />
                    </div>
                    <div className='modal__banner'>
                    {preview? <img className='modal__image' alt='banner image' src={`${preview}`} />: <></>}
                </div>
                    <div className='edit__form--btn-container'>
                        <button className='edit__form--btn' onClick={() => props.handleModal()}>
                            Cancel
                        </button>
                        <button className='edit__form--btn'>
                            Save
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
        </>
    )
}