import axios from "axios";
import { useState, useEffect } from 'react';
import './LoginPage.scss';
import '../SignupPage/SignupPage.scss';
import { Redirect, Link } from "react-router-dom";

export default function LoginPage (props) {

    const [username, setUsername] = useState({
        value: "",
        error: false
    });

    const [password, setPassword] = useState({
        value: "",
        error: false
    });

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = sessionStorage.getItem('clientAuthToken');
        const data = sessionStorage.getItem('profileData')
        if(!data) {
            fetchProfile(authToken);
        } 
    }, []);
    
    const handleUsername = event => {
        setUsername ({
            value: event.target.value,
            error: false
        })
    }

    const handlePassword = event => {
        setPassword ({
            value: event.target.value,
            error: false
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if(!username.error && !password.error) {
            try {
               const response = await axios.post(`http://localhost:8080/login`, {
                    username: username.value,
                    password: password.value,
                })
                sessionStorage.setItem('clientAuthToken', response.data.token);
                fetchProfile(response.data.token);
            } catch (err) {
                console.log(err);
                setUsername({ error: true})
                setPassword({ error: true})
            }
        } 
        else {
            setUsername({ error: true})
            setPassword({ error: true})
        }
    }

    const fetchProfile = async (token) => {
        try {
            const result = await axios.get(`http://localhost:8080/login/profile`, {
                headers: { 
                    authorization: `Bearer ${token}`
                }
            })
            console.log(result.data)
            sessionStorage.setItem('profiledata', JSON.stringify(result.data));
            props.profileData(result.data);
            setLoggedIn(true);
        } catch (err) {
            console.log(err)
        }
    }

    if(loggedIn) {
        return <Redirect to='/userprofile'/>
    }
    return (
        <div className="login">
           <div className="login__wrapper">
                <div className="login__banner">
                    <h2 className="login__logo">Leep</h2>
                    <h2 className="login__title">Please Log in to find artist</h2>
                </div>
                <form className="form" onSubmit={handleSubmit} method="POST" autoComplete="off">
                    <div className="form__container">  
                        <input 
                            className={!username.error? `form__input ${username.value? 'form__valid':''}`: `form__input ${username.value? 'form__valid':''} error `}
                            type="text"
                            name="username"
                            value={username.value}
                            onChange={handleUsername}    
                        />
                        <label className="form__label " htmlFor="username">Please Enter Your Username</label>
                    </div>
                    <div className="form__container"> 
                        <input 
                            className={!password.error? `form__input ${password.value? 'form__valid':''}`: "form__input error"}
                            type="password"
                            name="password"
                            value={password.value}
                            onChange={handlePassword}      
                        />
                        <label className="form__label " htmlFor="password">Please Enter Your Password</label>
                    </div>
                    <div className="btn__container">
                        <button type="submit" className="form__btn">
                            log in
                        </button>
                    </div>
                    <div className="signup__redirect">
                        <h3 className="signup__redirect--message">Don't have an account?</h3>
                        <Link className="signup__redirect--link" to='/sign-up'>
                            Sign up.
                        </Link>
                    </div>
                </form>
           </div>
        </div>
    )
}