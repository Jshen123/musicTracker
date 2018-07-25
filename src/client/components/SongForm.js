import React, { Component } from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import {
  Input, InputLabel, FormHelperText, FormControl,
  Typography, Button
} from '@material-ui/core';
import {withRouter} from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class SongForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      song: "",
      artist: "",
      album: "",
      genre:"",
      date:""
    }
  };

  addSong = () => {
    let id = this.props.match.params.id
    axios.post(`/api/playlists/${id}/song`, {
      song: this.state.song,
      artist: this.state.artist,
      album: this.state.album,
      genre: this.state.genre,
      date: this.state.date
    })
    .then((response) => {
      if (response) { 
        this.props.history.push(`/playlists/${id}`)
      }
    })
    // .catch((error) => {
    //   window.location = "/login"
    // });
  }

  onInputChange(input) {
    return (e) => {
      this.setState({ [input]: e.target.value });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginTop: '0.8em', marginLeft: '0.25em'}} noWrap>
          Add New Song
        </Typography>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Song Name</InputLabel>
          <Input id="name-simple" value={this.state.song} placeholder='Song Name' onChange={this.onInputChange("song")} />
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Artist</InputLabel>
          <Input id="name-helper" value={this.state.artist} placeholder='Artist' onChange={this.onInputChange("artist")} />
          <FormHelperText id="name-helper-text">One Artist Name (Band or Lead Artist Name) </FormHelperText>
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Album</InputLabel>
          <Input id="name-simple" value={this.state.album} placeholder='Album' onChange={this.onInputChange("album")} />
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Genre</InputLabel>
          <Input id="name-simple" value={this.state.genre} placeholder='Album' onChange={this.onInputChange("genre")} />
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Release Date</InputLabel>
          <Input id="name-simple" value={this.state.date} placeholder='Release Date' onChange={this.onInputChange("date")} />
        </FormControl>
        <Button fullWidth 
                variant="contained" 
                style={{backgroundColor: '#4cd964', color: "white", borderRadius: 0}} 
                className={classes.button}
                onClick={this.addSong}
        >
          Add Song
        </Button>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SongForm));