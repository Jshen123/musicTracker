import React, {Component} from 'react'
import axios from 'axios'
import { List, ListItem, ListItemText, Collapse, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.secondary,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends Component {
  constructor(props){
    super(props);
    this.state ={
      open: true,
      playlists:[],
      targetId: 0
    }
  };

  componentDidMount(){
    axios.get('/api/playlists').then(res =>{
      this.setState({playlists: res.data})
    })
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  hoverTarget = (i) => {
    this.setState({targetId: i})
  }

  playlistSelect = () => {
    window.location = `/playlists/${this.state.targetId}`
    // this.props.history.push(`/playlists/${this.state.targetId}`)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleClick}>
            <ListItemText 
                disableTypography
                primary={<Typography type="subheadling" style={{ color: 'white' }}>Playlists</Typography>} 
            />
            {this.state.open ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {this.state.playlists.map((n, i) => {
              return (
              <ListItem key={i} id={n.playlist_id} onMouseOver={() => this.hoverTarget(n.playlist_id)} onClick={this.playlistSelect} button className={classes.nested}>
                <ListItemText 
                  disableTypography
                  primary={<Typography type="subheadling" style={{ color: 'white' }}>{n.playlist_name}</Typography>} 
                />
              </ListItem>
              );
            })}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NestedList));