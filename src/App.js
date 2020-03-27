import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import { login } from './actions/index'
import config from './config/config'
import Signup from './components/welcome/signup'
import Login from './components/welcome/login'
import Welcome from './components/welcome/welcome'
import Explore from './components/general/explore'
import Playlist from './components/general/playlist'
import Album from './components/general/album'
import Artist from './components/general/artist'
import Search from './components/general/search'
import MyTracks from './components/library/tracks'

import './App.css';


class App extends Component {
  async componentDidMount() {
    console.log('app')
    if (!localStorage.getItem('token')) {
        return
    }
    const result = await axios.get(`${config().url}/authenticate`, config().headers)
    if (result.status !== 200) {
        return
    }
    this.props.login()
  }

  render() {
    return (
      <div>
        <Route exact path='/' component={Welcome} />
        <Route path='/explore' component={Explore} />
        <Route path='/playlist/:id' component={Playlist} />
        <Route path='/album/:id' component={Album} />
        <Route path='/artist/:id' component={Artist} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/search/:query' component={Search} />
        <Route path="/my_tracks" component={MyTracks} />
      </div>
    );
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
      login: () => dispatch(login())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
