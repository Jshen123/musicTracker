import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Typography, Divider
} from '@material-ui/core';


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

let id = 0;
function createData(title, artist, album, date) {
  id += 1;
  return { id, title, artist, album, date };
}

class PlaylistTable extends Component{
  constructor(props){
    super(props);
    this.state ={
      data: [
        createData('Frozen yoghurt', 'artist1', 'album1', 'Jan-01-18'),
        createData('Ice cream sandwich', 'artist2', 'album2', 'Jan-02-18'),
        createData('Eclair', 'artist3', 'album3', 'Jan-03-18'),
        createData('Cupcake', 'artist4', 'album4', 'Jan-04-18'),
        createData('Gingerbread', 'artist5', 'album5', 'Jan-05-18'),
      ]
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline" style={{ fontWeight: 'bold', color: '#4b4b4b', marginLeft: '1.1em', marginBottom: '1.15em'}} noWrap>
          Playlist
        </Typography>
        <Table  className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className ={classes.tc}>
                <Typography variant="inherit" align='left' style={{ color: '#757575'}} noWrap>
                  TITLE
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography variant="inherit" align='right' style={{color: '#757575'}} noWrap>
                  ARTIST
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography variant="inherit" align='right' style={{color: '#757575'}} noWrap>
                  ALBUM
                </Typography>
              </TableCell>
              <TableCell className ={classes.tc}>
                <Typography variant="inherit" align='right' style={{color: '#757575'}} noWrap>
                  RELEASE DATE
                </Typography>
              </TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody>
            {this.state.data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell className ={classes.tc} component="th" scope="row">
                    <Typography variant="inherit" align='left' style={{color: '#4b4b4b'}} noWrap>
                      {n.title}
                    </Typography>
                  </TableCell >
                  <TableCell className ={classes.tc}>
                    <Typography variant="inherit" align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.artist}
                    </Typography>
                  </TableCell >
                  <TableCell className ={classes.tc}>
                    <Typography variant="inherit" align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.album}
                    </Typography>
                  </TableCell>
                  <TableCell className ={classes.tc}>
                    <Typography variant="inherit" align='right' style={{color: '#4b4b4b'}} noWrap>
                      {n.date}
                    </Typography>
                  </TableCell>
                  <Divider />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlaylistTable);