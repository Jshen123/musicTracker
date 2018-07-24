import React, {Component} from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Typography, Divider
} from '@material-ui/core';
import {withRouter} from "react-router-dom";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: 'none',
  },
  table: {
    minWidth: 700,
  },
  tc: {
    borderBottomColor: 'lightgrey',
  },
});

class PlaylistTable extends Component{
  constructor(props){
    super(props);
    this.state ={
    songs: this.props.songs
    }
  }

  componentDidMount(){
    axios.get(`/api/playlists/${this.props.match.params.id}`).then(res =>{
      this.setState({songs: res.data})
    })
  }


  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginLeft: '1.1em', marginBottom: '1em'}} noWrap>
          Playlist
        </Typography>
        <Table  className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className ={classes.tc}>
                <Typography align='left' style={{ color: '#757575'}} noWrap>
                  TITLE
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography align='right' style={{color: '#757575'}} noWrap>
                  ARTIST
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography align='right' style={{color: '#757575'}} noWrap>
                  ALBUM
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography align='right' style={{color: '#757575'}} noWrap>
                  RELEASE DATE
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.songs.map((n, i) => {
              return (
                <TableRow key={i}> 
                  <TableCell className ={classes.tc} component="th" scope="row">
                    <Typography align='left' style={{color: '#4b4b4b'}} noWrap>
                      {n.song_name}
                    </Typography>
                  </TableCell >
                  <TableCell className ={classes.tc}>
                    <Typography align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.artist_name}
                    </Typography>
                  </TableCell >
                  <TableCell className ={classes.tc}>
                    <Typography align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.album_name}
                    </Typography>
                  </TableCell>
                  <TableCell className ={classes.tc}>
                    <Typography align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.release_date.substring(0,10)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withRouter(withStyles(styles)(PlaylistTable));