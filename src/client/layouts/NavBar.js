import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {
  AppBar, Toolbar, IconButton, Typography, Hidden, Button,
  Drawer, Divider, CssBaseline
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import NestedList from './NestedList.js'
import {withRouter} from "react-router-dom";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    // backgroundColor:'black',
    background: 'linear-gradient(to top, 	#000000 , #0d0d0d, 	#292929)',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state ={
    }
  };

handleClick = () => {
  axios.post("/api/playlists")
  .then((response) => {
    let id = response.data[0].playlist_id;
    console.log(id)
    // this.props.history.push(`/playlists/${id}`)
    window.location= `/playlists/${id}`
  }) 
}

accessAdmin = () => {
  this.props.history.push(`/admin`)
}

logInOut = () => {
  if(this.props.loggedIn){
    this.props.history.push("/login")
  } else {
    axios.post("/logout")
    .then((response) => {
      this.props.history.push("/login")
    })
  }
}

  render() {
    const { classes, children } = this.props;
    const loggedIn = this.props.loggedIn

    const drawer = (
        <Grid container style={{background: '#292929'}}>
          <div className={classes.toolbar} />
            <Grid container alignItems="center" direction="row" justify='center'>
              <Typography variant="title" style={{color: 'white'}} noWrap>
                Music Tracker
              </Typography>
            </Grid >
            <Divider />
        </Grid>
    );
    
    let createButton;
    let nestedList;
    let adminButton;

    if(loggedIn){
      createButton = (
        <Button variant="outlined" color="inherit" onClick={this.handleClick} style={{borderWidth:'1pt', borderColor: 'white', borderRadius: 0}}>
          <AddIcon />
            Create Playlist
        </Button>
      );

      nestedList = (
        <NestedList hoverTarget={this.props.hoverTarget} playlistSelect = {this.props.playlistSelect} />
      );
    }

    if (this.props.admin == true){
     adminButton = (
      <Button variant="outlined" color="inherit" onClick={this.accessAdmin} style={{borderWidth:'1pt', color:"red", borderColor: 'red', borderRadius: 0}}>
        Admin
      </Button>
     )
    }

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <Menu />
                </IconButton>
                <Grid container alignItems='center' direction='row' justify='flex-start'>
                  {createButton}
                </Grid>
                {/* <Grid container alignItems='center' direction='row' justify='flex-end'>
                  {adminButton}
                </Grid> */}
                <Grid container alignItems='center' direction='row' justify='flex-end'>
                  {adminButton}
                  <Button color="inherit" onClick={this.logInOut}>
                    {this.props.loggedIn? 'Logout' : 'Login'}
                  </Button>
                </Grid>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
              {nestedList}
            </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));
