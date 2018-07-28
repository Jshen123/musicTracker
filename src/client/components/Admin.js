import React, {Component} from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Typography, Divider, Button, Grid,
  Input, FormControl
} from '@material-ui/core';
// import {DeleteForeverOutlinedIcon} from '@material-ui/icons/';
// import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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

class Admin extends Component{
  constructor(props){
    super(props);
    this.state ={
      active: [],
      inactive: [],
      deleteId: null
    }
  }

  componentDidMount(){
    axios.get('/api/admin').then(res =>{
      this.setState({active: res.data.active})
      this.setState({inactive: res.data.inactive})
    })
  }

  deleteClick = () => {
    axios.delete(`/api/playlists/${this.state.deleteId}`).then(res =>{
      window.location = `/admin`
    })
  }

  hoverDelete = (i) => {
    this.setState({deleteId: i})
    console.log(this.state.deleteId)
  }

  render() {
    const { classes } = this.props;

    return (
      // <div> admin </div>
      <Paper className={classes.root}>
        <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginLeft: '1.1em', marginBottom: '1em'}} noWrap>
          User Playlists
        </Typography>
        <Table  className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className ={classes.tc}>
                <Typography align='left' style={{ color: '#757575'}} noWrap>
                  NAME
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography align='right' style={{color: '#757575'}} noWrap>
                  DATE CREATED
                </Typography>
              </TableCell>
              <TableCell padding='none' >
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.active.map((n, i) => {
              return (
                <TableRow key={i}> 
                  <TableCell className ={classes.tc} component="th" scope="row">
                    <Typography align='left' style={{color: '#4b4b4b'}} noWrap>
                      {n.playlist_name}
                    </Typography>
                  </TableCell >
                  <TableCell className ={classes.tc}>
                    <Typography align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.create_date.substring(0,10)}
                    </Typography>
                  </TableCell>
                    <TableCell padding='none'>
                      <Button id={n.playlist_id} 
                              onMouseOver={() => this.hoverDelete(n.playlist_id)} 
                              variant="outlined" color="inherit" 
                              onClick={this.deleteClick} 
                              style={{borderWidth:'1pt', color:"red", borderColor: 'red', borderRadius: 0}}
                      >
                        <DeleteForeverIcon className={classes.icon} />
                        DELETE
                      </Button>
                    </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <br />
        <br />
        <br />
        <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginLeft: '1.1em', marginBottom: '1em'}} noWrap>
          Empty Playlists
        </Typography>
        <Table  className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className ={classes.tc} style={{marginRight: '0em'}}>
                <Typography align='left' style={{ color: '#757575'}} noWrap>
                  NAME
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography align='right' style={{color: '#757575'}} noWrap>
                  DATE CREATED
                </Typography>
              </TableCell>
              <TableCell padding='none' >
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.inactive.map((n, i) => {
              return (
                <TableRow key={i}> 
                  <TableCell className ={classes.tc} component="th" scope="row">
                    <Typography align='left' style={{color: '#4b4b4b'}} noWrap>
                      {n.playlist_name}
                    </Typography>
                  </TableCell >
                  <TableCell className ={classes.tc}>
                    <Typography align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.create_date.substring(0,10)}
                    </Typography>
                  </TableCell>
                  <TableCell padding='none'>
                      <Button id={n.playlist_id} 
                              onMouseOver={() => this.hoverDelete(n.playlist_id)} 
                              variant="outlined" color="inherit" 
                              onClick={this.deleteClick} 
                              style={{borderWidth:'1pt', color:"red", borderColor: 'red', borderRadius: 0}}
                      >
                        <DeleteForeverIcon className={classes.icon} />
                        DELETE
                      </Button>
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

export default withRouter(withStyles(styles)(Admin));