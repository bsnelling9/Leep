import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage/HomePage'
import NavBar from './components/NavBar/NavBar';
import SignupPage from './pages/SignupPage/SignupPage';
import Charts from './pages/ChartsPage/ChartsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserProfile from './pages/UserProfile/UserProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import UploadSong from './pages/UploadSong/UploadSong';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import GenrePage from './pages/GenrePage/GenrePage';

function App() {

  const[profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profiledata')));
  

  const updateProfile = async (data) => {
    setProfile(
        data
    )
  }

  const logOut = async () => {
    setProfile(
      null
    )
  }

  console.log(profile)
  return (
    <div className="App">
      <Router>
        <NavBar profileData={profile} logOut={logOut}/>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path='/userprofile' render={routerProps => <UserProfile profileData={profile} {...routerProps}/>}/>
          <Route path='/editprofile' exact render={routerProps => <EditProfile profileData={profile} {...routerProps}/>}/>
          <Route path='/uploadsong' component={UploadSong}/>
          <Route path='/home' component={HomePage}/>
          <Route path='/artist/:id' render={routerProps => <ArtistPage profileData={profile} {...routerProps}/>}/>
          <Route path='/sign-up' component={SignupPage}/>
          <Route path='/login' render={routerProps => <LoginPage profileData={updateProfile} {...routerProps}/>}/>
          <Route path='/charts' component={Charts}/>
          <Route path='/browseall' component={GenrePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
