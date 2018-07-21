import React, {Component} from 'react'
import { List, ListItem, ListItemText, Collapse, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';

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
      playlists: ["p1", "p2"]
    }
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
        >
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography type="subheadling" style={{ color: 'white' }}>Favourite</Typography>} 
            />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemText 
                disableTypography
                primary={<Typography type="subheadling" style={{ color: 'white' }}>Playlists</Typography>} 
            />
            {this.state.open ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText 
                  disableTypography
                  primary={<Typography type="subheadling" style={{ color: 'white' }}>{this.state.playlists[0]}</Typography>} 
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText 
                    disableTypography
                    primary={<Typography type="subheadling" style={{ color: 'white' }}>{this.state.playlists[0]}</Typography>} 
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(NestedList);