import React from "react";
import {axios} from "axios";
import { useState } from 'react';
import './SignUpPage.scss';
import {bcrypt} from 'bcryptjs';
import {BrowserRouter as Router, Redirect, Link } from "react-router-dom";


function SignupPage () {

    const [email, setEmail] = useState({
        value: "",
        error: false
    });
    const [confirmEmail, setConfirmEmail] = useState({
        value: "",
        error: false
    });
    const [username, setUsername] = useState({
        value: "",
        error: false
    });
    const [password, setPassword] = useState({
        value: "",
        error: false
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        error: false
    })
    const[submit, setSubmit] = useState(false);

    const handleEmail = event => {
        setEmail ({
            value: event.target.value,
            error: false
        })
    }

    const handleConfirmEmail = event => {
        setConfirmEmail ({
            value: event.target.value,
            error: false
        })
    }

    const handleUserName = event => {
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

    const handleConfirmPassword = event => {
        setConfirmPassword ({
            value: event.target.value,
            error: false
        })
    }

    /*submits the form info to the backend if all inputs are filled out, if not user gets an error message */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.value && username.value && password.value ) {
            const hashedPassword = bcrypt?.hashSync(password.value, bcrypt.genSaltSync(10))
            try {
                await axios.post(`https://leep-server.herokuapp.com/signup`, {
                    username: username.value,
                    password: hashedPassword,
                })
                setSubmit(true)
            } catch (err) {
                console.log(err);
            }
        }
        else {
            if(!username.value) {setUsername({ error: true})}
            if(!email.value) {setEmail({ error: true})}
            if(!confirmEmail.value) {setConfirmEmail({ error: true})}
            if(!password.value) {setPassword({ error: true})}
            if(!confirmPassword.value) {setConfirmPassword({ error: true})}
            if(email.value !== confirmEmail.value) {
                window.alert("Emails do not match");
                setEmail({
                    error: true
                })
                setConfirmEmail({
                    error: true
                })
            }
            if(password.value !== confirmPassword.value) {
                window.alert("Passwords do not match");
                setPassword({
                    error: true
                })
                setConfirmPassword({
                    error: true
                })
            }
        }
    }

    if(submit) {
        return <Router><Redirect to='/login'/></Router>
    }
    return (
        <div className="signup">
            <div className="signup__wrapper">
                <div className="signup__banner">
                    <h2 className="signup__logo">Leep</h2>
                    <h2 className="signup__title">Please Sign Up to find artist</h2>
                </div>    
                <form className="form" onSubmit={handleSubmit} autoComplete='off'>
                    <div className="form__container">
                        <input 
                            className={!email.error? `form__input ${email.value? 'form__valid':''}`: "form__input error"}
                            type='text'
                            id='email'
                            data-testid='email'
                            name='email'
                            value={email.value}
                            onChange={handleEmail}
                            autoComplete='off'
                        />
                        <label className="form__label" htmlFor="email">What's your email?</label>
                    </div>
                    <div className="form__container"> 
                        <input 
                            className={!confirmEmail.error? `form__input ${confirmEmail.value? 'form__valid':''}`: "form__input error"}
                            type='text'
                            id='confirmemail'
                            data-testid='confirmemail'
                            name='confirmemail'
                            value={confirmEmail.value}
                            onChange={handleConfirmEmail}
                        />
                        <label className="form__label" htmlFor="confirmemail">Please confirm your email?</label>
                        </div>
                    <div className="form__container">
                        <input 
                            className={!username.error? `form__input ${username.value? 'form__valid':''}`: "form__input error"}
                            type='text'
                            id='username'
                            data-testid='username'
                            name='username'
                            value={username.value}
                            onChange={handleUserName}
                        />
                        <label className="form__label" htmlFor="username">What's your user name?</label>
                        </div>
                    <div className="form__container">
                        <input 
                            className={!password.error? `form__input ${password.value? 'form__valid':''}`: "form__input error"}
                            type='password'
                            id='password'
                            name='password'
                            data-testid='password'
                            value={password.value}
                            onChange={handlePassword}
                        />
                        <label className="form__label" htmlFor="password">What's your password?</label>
                        </div>
                    <div className="form__container">
                        <input 
                            className={!confirmPassword.error? `form__input ${confirmPassword.value? 'form__valid':''}`: "form__input error"}
                            type='password'
                            id='confirmPassword'
                            data-testid='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword.value}
                            onChange={handleConfirmPassword}
                        />
                        <label className="form__label" htmlFor="confirmPassword">Please confirm your password</label>
                    </div>
                    <button  data-testid="submit" className="form__btn" type="submit">
                        Sign up
                    </button>
                    <div className="signup__redirect">
                        <h3 className="signup__redirect--message">Already have an account?</h3>
                        <Router>
                            <Link className="signup__redirect--link" to='/login'>
                                Log in.
                            </Link>
                        </Router>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignupPage;