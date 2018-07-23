import React, {Component} from 'react';
import axios from 'axios'
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
    this.state = {
      // loggedIn: this.props.loggedIn,
      username: "",
      password: ""
    }
  };

  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // };

  handleUsernameChange = event =>{
    this.setState({username: event.target.value});
  }

  handlePasswordChange = event =>{
    this.setState({password: event.target.value});
  }

  requestLogin = () => {
    axios.post("/api/login", {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      if (response.data.redirect == '/') { 
        this.props.toggleLogin()
      }

      if (response.data.redirect == '/') {
        window.location = "/";
      } else if (response.data.redirect == '/login'){
        window.location = "/login"
      }  
    })
    // .catch((error) => {
    //   window.location = "/login"
    // });
  }

  // handleLogin = () => {
  //   if (this.state.loggedIn == true){
  //     this.props.toggleLogin
  //   }
  //   console.log(this.state.loggedIn)
  // }
  

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
                <Input id="name-simple" placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange} />
              </FormControl>
            </Grid>
            <Grid container alignItems='center' direction='row' justify='center'>
              <FormControl required className={classes.formControl} style={{marginBottom: '1.75em'}}>
                <InputLabel htmlFor="name-simple">Password</InputLabel>
                <Input id="name-helper" placeholder='Password' value={this.state.password} onChange={this.handlePasswordChange} />
              </FormControl>
            </Grid>
              <Button fullWidth
                      variant="contained" 
                      style={{backgroundColor: '#007aff', color: "white", borderRadius: 0}} 
                      className={classes.button}
                      onClick={this.requestLogin}
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