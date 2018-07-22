import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Input, InputLabel, FormHelperText, FormControl,
  Typography, Button
} from '@material-ui/core';

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
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginTop: '0.8em', marginLeft: '0.25em'}} noWrap>
          Add New Song
        </Typography>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Song Name</InputLabel>
          <Input id="name-simple" placeholder='Song Name' onChange={this.handleChange} />
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Artist</InputLabel>
          <Input id="name-helper" placeholder='Artist' onChange={this.handleChange} />
          <FormHelperText id="name-helper-text">One Artist Name (Band or Lead Artist Name) </FormHelperText>
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Album</InputLabel>
          <Input id="name-simple" placeholder='Album' onChange={this.handleChange} />
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Genre</InputLabel>
          <Input id="name-simple" placeholder='Album' onChange={this.handleChange} />
        </FormControl>
        <FormControl fullWidth required className={classes.formControl} style={{marginBottom: '1.75em'}}>
          <InputLabel htmlFor="name-simple">Release Date</InputLabel>
          <Input id="name-simple" placeholder='Release Date' onChange={this.handleChange} />
        </FormControl>
        <Button fullWidth variant="contained" 
                style={{backgroundColor: '#4cd964', color: "white", borderRadius: 0}} 
                className={classes.button}
        >
          Add Song
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(SongForm);