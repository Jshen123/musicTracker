import React, {Component} from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Typography, Divider, Button,
  Input, FormControl
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
      songs: [],
      playlist_name: "",
      playlist_id: this.props.match.params.id,
      number: null
    }
  }

  componentDidMount(){
    axios.get(`/api/playlists/${this.props.match.params.id}`).then(res =>{
      this.setState({songs: res.data.songs})
      this.setState({playlist_name: res.data.name[0].playlist_name})
      this.setState({number: res.data.number[0].count})
    })
  }

  onNameChange = (e) => {
    this.setState({ playlist_name: e.target.value });
  }

  get onNameKeydown() {
    return (e) => {
      if(e.key === 'Enter') {
        let params = this.props.match.params.id

        axios.put(`/api/playlists/${params}`, {
          playlist_name: this.state.playlist_name
        })
        .then(res => {
          if(res){
            // this.props.history.push(`/playlists/${res.data}`)
            window.location = `${res.data}`
          }
        })
      }
    };
  }

  handleClick = () => {
    this.props.history.push(`${this.state.playlist_id}/song`)
    // window.location = `${this.state.playlist_id}/songs`
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
         <FormControl required className={classes.formControl} style={{marginLeft: '1em'}}>
          <Input id="name-simple" 
                 disableUnderline={true} 
                 style={{fontSize: '1.6em', fontWeight: 'bold'}}
                 value={this.state.playlist_name} 
                 onChange={this.onNameChange} 
                 onKeyDown={this.onNameKeydown}
          />
        </FormControl>
        <Typography align='left' style={{ marginLeft: '1.5em', color: '#4b4b4b'}} noWrap>
          {`(${this.state.number} songs)`}
        </Typography>
        <br />
        <Button variant="contained" 
                style={{backgroundColor: '#4cd964', color: "white", borderRadius: 0, marginLeft: '1em', marginBottom: '1em'}} 
                className={classes.button}
                onClick={this.handleClick}
        >
            Add Song
        </Button>
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