// import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import {
//   Input, InputLabel, FormHelperText, FormControl,
//   Typography, Grid, Button
// } from '@material-ui/core';

// const styles = theme => ({

// });



//   render() {
//     const { classes } = this.props;

//     return (
//       <div className={classes.container}>
//         <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginTop: '0.8em', marginLeft: '0.25em'}} noWrap>
//           Sign in
//         </Typography>

//       </div>
//     );
//   }
// }

// export default withStyles(styles)(Login);

import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
  Card, CardActions, CardContent,
  Input, InputLabel, FormHelperText, FormControl,
  Button, Typography, Grid, 
} from '@material-ui/core'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Login extends Component {
  constructor(props){
    super(props);
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Grid container alignItems='center' direction='row' justify='center'>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginTop: '0.8em', marginLeft: '0.25em'}} noWrap>
              Sign in
            </Typography>
            <Grid container alignItems='center' direction='row' justify='center'>
              <FormControl required className={classes.formControl} style={{marginBottom: '1.75em'}}>
                <InputLabel htmlFor="name-simple">Username</InputLabel>
                <Input id="name-simple" placeholder='Username' onChange={this.handleChange} />
              </FormControl>
            </Grid>
            <Grid container alignItems='center' direction='row' justify='center'>
              <FormControl required className={classes.formControl} style={{marginBottom: '1.75em'}}>
                <InputLabel htmlFor="name-simple">Password</InputLabel>
                <Input id="name-helper" placeholder='Password' onChange={this.handleChange} />
              </FormControl>
            </Grid>
              <Button fullWidth
                      variant="contained" 
                      style={{backgroundColor: '#007aff', color: "white", borderRadius: 0}} 
                      className={classes.button}
              >
                Login
              </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);