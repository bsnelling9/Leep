import React from "react";
import ReactDOM from "react-dom";
import SignupPage from "./SignupPage";
import {render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import axios from 'axios';

jest.mock('axios');

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<SignupPage />, div)
})

describe('SignUpform', () => {
    let onSubmit = jest.fn();
    const handleSubmit = shallow(<S)
    console.log(jest.fn())
    /*window.alert = jest.fn()*/
    
    beforeEach(() => {
        onSubmit.mockClear()
        render(<SignupPage onSubmit={onSubmit} />)
    });

    it('onSubmit is called when all fields pass validation', async () => {
        /*window.alert = () => {};*/
        user.type(getEmail(), 'test@gmail.com')
        user.type(confirmEmail(), 'test@gmail.com')
        user.type(getUsername(), 'test1')
        user.type(getPassword(), '1234')
        user.type(getConfirmPassword(), '1234')
        user.click(screen.getByTestId('submit'))
        screen.debug();
        expect(onSubmit).toBeCalled()
       /* await waitFor(() => {
            expect(onSubmit).toBeCalledWith(
                expect.objectContaining({
                    username: 'test1',
                }),                 
            );
        })*//*
        expect(onSubmit).toHaveBeenCalledTimes(1);*/
    });
})

function getEmail () {
    return screen.getByTestId('email', {
        name: /email/i
    })
}
function confirmEmail () {
    return screen.getByTestId('confirmemail', {
        name: /confirmemail/i
    })
}
function getUsername () {
    return screen.getByTestId('username', {
        name: /username/i
    }) 
}
function getPassword () {
    return screen.getByTestId('password', {
        name: /password/i
    })
}
function getConfirmPassword() {
    return screen.getByTestId('confirmPassword', {
        name: /confirmpassword/i
    })
}