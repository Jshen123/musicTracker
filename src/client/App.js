import React, {Component} from 'react';
import axios from 'axios'
import {Switch, Route } from 'react-router-dom'
import { NavBar } from './layouts'
import PlaylistTable from './components/PlaylistTable'
import SongForm from './components/SongForm'
import Login from './components/Login'
import {withRouter} from "react-router-dom";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      songs: [],
      targetId: 0,
      counter: true
    };
  }
  
  toggleLogin = () => {
    this.setState({ loggedIn: true });
  }

  // hoverTarget = (i) => {
  //   this.setState({targetId: i})
  // }

  // playlistSelect = () => {
  //   // console.log("targetId ", this.state.targetId)

  //   // axios.get(`api/playlists/${this.state.targetId}`)
  //   // .then((response) => {
  //   //   if (response) {
  //   //     console.log("targetId ", this.state.targetId)

  //   //     // console.log(response.data)
  //   //     this.setState({songs: response.data})
  //   //     // window.location = `/playlists/${this.state.targetId}`;
  //   //     this.props.history.push(`/playlists/${this.state.targetId}`)
  //   //   } 
  //   // })
  //   // .catch(function (error) {
  //   //   console.log(error);
  //   // });
  //   this.props.history.push(`/playlists/${this.state.targetId}`)
  // }
  
  render() {
    return (
      <NavBar loggedIn = {this.state.loggedIn} >
        <Switch>
          <Route exact path="/" render={() => <div> hi </div>}/>
          <Route path="/login" render={
            () => <Login loggedIn = {this.state.loggedIn} 
                         toggleLogin = {this.toggleLogin}
                  />}
          />
          <Route path="/playlists/:id" render={(props) => (<PlaylistTable songs={this.state.songs} />)}/>
          <Route path="/songs" render={() => <SongForm />}/>
        </Switch>
      </NavBar>
    )
  }

}

export default withRouter(App);
