import React, {Component} from 'react';
import axios from 'axios'
import {Switch, Route } from 'react-router-dom'
import { NavBar } from './layouts'
import PlaylistTable from './components/PlaylistTable'
import SongForm from './components/SongForm'
import Login from './components/Login'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      playlist: {}
    };
  }
  
  toggleLogin = () => {
    this.setState({ loggedIn: true });
  }
  
  render() {
    return (
      <NavBar loggedIn = {this.state.loggedIn}>
        <Switch>
          <Route exact path="/" render={() => <div> hi </div>}/>
          <Route path="/login" render={() => <Login loggedIn = {this.state.loggedIn} toggleLogin = {this.toggleLogin} />}/>
          <Route path="/playlists" render={() => <PlaylistTable />}/>
          <Route path="/songs" render={() => <SongForm />}/>
        </Switch>
      </NavBar>
    )
  }

}

export default App;
