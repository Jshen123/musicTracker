import React, {Component, Fragment} from 'react'
import {
  AppBar, Toolbar, IconButton, Typography, Hidden, Button,
  Drawer, Divider, CssBaseline
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import NestedList from './NestedList.js'


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
    backgroundColor:'black',
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


  render() {
    const { classes, children } = this.props;

    const drawer = (
        <Grid container style={{backgroundColor: 'black'}}>
          <div className={classes.toolbar} />
            <Grid container alignItems="center" direction="row" justify='center'>
              <Typography variant="title" style={{color: 'white'}} noWrap>
                Playlist Tracker
              </Typography>
            </Grid >
            <Divider />
        </Grid>
    );

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
                  <Button variant="outlined" color="inherit" style={{borderWidth:'1pt', borderColor: 'white', borderRadius: 0}}>
                    <AddIcon />
                    Create Playlist
                  </Button>
                </Grid>
                <Grid container alignItems='center' direction='row' justify='flex-end'>
                  <Button color="inherit">
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
              <NestedList />
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

export default withStyles(styles)(NavBar);
