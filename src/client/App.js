import React, {Component} from 'react';
import axios from 'axios'
import {Switch, Route } from 'react-router-dom'
import { NavBar } from './layouts'
import PlaylistTable from './components/PlaylistTable'
import SongForm from './components/SongForm'
import Login from './components/Login'
import Home from './components/Home'
import Admin from './components/Admin'
import {withRouter} from "react-router-dom";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      admin: false
    };
  }

  componentDidMount(){
    axios.get('/api').then(res =>{
      if (res.data != null){
        this.setState({loggedIn: true})
        let status = res.data[0].access
        if (status == 'admin') {
          this.setState({admin: true})
        }
      } else {
        this.props.history.push("/login")
      }
    })
  }
  
  render() {
    
    return (
      <NavBar loggedIn = {this.state.loggedIn} admin={this.state.admin} >
        <Switch>
          <Route exact path="/" render={() => <Home />}/>
          <Route path="/admin" render={() => <Admin />}/>
          <Route path="/login" render={() => <Login loggedIn = {this.state.loggedIn} admin={this.state.admin} />}/>
          <Route exact path="/playlists/:id" render={(props) => (<PlaylistTable />)}/>
          <Route path="/playlists/:id/song" render={(props) => <SongForm />}/>
        </Switch>
      </NavBar>
    )
  }

}

export default withRouter(App);
