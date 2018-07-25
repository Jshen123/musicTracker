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

class Admin extends Component{
  constructor(props){
    super(props);
    this.state ={
      playlists: []
    }
  }

  componentDidMount(){
    axios.get('/api/admin').then(res =>{
      // console.log(res.data)
      this.setState({playlists: res.data})
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div> admin </div>
      // <Paper className={classes.root}>
      //   <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginLeft: '1.1em', marginBottom: '1em'}} noWrap>
      //     New Playlists
      //   </Typography>
      //   <Table  className={classes.table}>
      //     <TableHead>
      //       <TableRow>
      //         <TableCell className ={classes.tc}>
      //           <Typography align='left' style={{ color: '#757575'}} noWrap>
      //             Name
      //           </Typography>
      //         </TableCell>
      //         <TableCell className ={classes.tc}>
      //           <Typography align='right' style={{color: '#757575'}} noWrap>
      //             Date Created
      //           </Typography>
      //         </TableCell>
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       {this.state.playlists.map((n, i) => {
      //         return (
      //           <TableRow key={i}> 
      //             <TableCell className ={classes.tc} component="th" scope="row">
      //               <Typography align='left' style={{color: '#4b4b4b'}} noWrap>
      //                 {n.playlist_name}
      //               </Typography>
      //             </TableCell >
      //             <TableCell className ={classes.tc}>
      //               <Typography align='right' style={{color: '#4b4b4b'}} noWrap>
      //                 {n.create_date.substring(0,10)}
      //               </Typography>
      //             </TableCell>
      //           </TableRow>
      //         );
      //       })}
      //     </TableBody>
      //   </Table>
      // </Paper>
    );
  }
}

export default withRouter(withStyles(styles)(Admin));