import React, {Component} from 'react';
import {Switch, Route } from 'react-router-dom'
import { NavBar } from './layouts'
import PlaylistTable from './components/PlaylistTable'
import SongForm from './components/SongForm'
import Login from './components/Login'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "testUser"},
      favourite: [],
      playlist: []
    };
  }

  render() {
    return (
      <NavBar>
        <Switch>
          <Route path="/login" render={() => <Login />}/>
          <Route path="/playlists" render={() => <PlaylistTable />}/>
          <Route path="/songs" render={() => <SongForm />}/>
        </Switch>
      </NavBar>
    )
  }

}

export default App;
