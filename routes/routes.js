import express from 'express';
import cookieSession from 'cookie-session';
// import util from '../lib/utils/helpers.js';
const router = express.Router();

//Cookie Session Setup
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// helper functions

//==================== Routes
module.exports = function(DataQueries) {

  //========== GET Routes
  router.get("/api/home", (req, res) => {
    DataQueries.getPlaylistNameByDate((value)=> {
      res.json(value)
    })
  });

  router.get("/api/admin", (req, res) => {
    if(req.session.user_id){
      DataQueries.getUserType(req.session.user_id, (value) => {
        if (value[0].access == 'admin'){
          DataQueries.findNonEmptyPlaylist(0, (value) => {
            console.log(value)
          //   let active = value;
          //   console.log(active)
            // DataQueries.findEmptyPlaylist((value) => {
            //   console.log(value)
            //   // let payload = {active: active, inactive: inactive}
            //   // console.log(payload)
            // })

          })
        } else {
          res.status(401)
        }
      });
    } else {
      res.status(401)
    }
  });

  router.get("/api", (req, res) => {
    if(req.session.user_id){
      DataQueries.getUserType(req.session.user_id, (value) => {
        res.json(value);
      });
    } else {
      let payload = null
      res.json(payload)
    }
  });

  router.post("/api/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    DataQueries.existUnamePwd(username, password, (value) => {
      if(value.length == 0){
        res.status(401)
        let redir = {redirect: "/login"}
        res.json(redir)
      } else {
        req.session.user_id = value[0].user_id
        let redir = {redirect: "/"}
        res.json(redir)
      }
    })
  });

  router.get("/api/playlists/:id", (req, res) => {
    const playlistId = req.params.id

    DataQueries.getPlaylistSongs(playlistId, (value)=> {
      let songs = value;
      DataQueries.findPlaylistName(playlistId, (value => {
        let name = value
        DataQueries.countSong(playlistId, (value) => {
          console.log(value);
          let payload = {name: name, number:value, songs: songs}
          res.json(payload)
        })
      }))
      // }
    })
  });

  router.get("/api/playlists", (req, res) => {
    if(req.session.user_id){
      DataQueries.getPlaylistName( req.session.user_id, (value) => {
        res.json(value);
      });
    } else {
      res.status(400)
    }
  });

  router.put("/api/playlists/:id", (req, res) => {
    if(req.session.user_id){
      // console.log(req.params.id == string)
      let playlist_id = Math.round(parseInt(req.params.id))
      // console.log(req.body.playlist_name)
      DataQueries.updatePlaylistName( playlist_id, req.body.playlist_name, (value) => {
        res.json(playlist_id)
      });
    } else {
      res.status(400)
    }
  });

  router.post("/api/playlists/:id/song", (req, res) => {
    let song = req.body.song;
    let artist = req.body.artist;
    let album = req.body.album;
    let genre = req.body.genre;
    let date = req.body.date;
    let playlist_id = parseInt(req.params.id)
    
    if(req.session.user_id){
      DataQueries.insertSong(song, artist, album, genre, date, (value) => {
        DataQueries.insertPlaylistSong(playlist_id, value[0], (value) => {
          res.json(value)
        })
      })
    }
  });

  router.post("/api/playlists", (req, res) => {
    if(req.session.user_id){
      DataQueries.createPlaylist( "my_playlist", req.session.user_id, (value) => {
        DataQueries.getNewPlaylistId(req.session.user_id, (value) => {
          res.json(value);
        })
      });
    } else {
      res.status(400)
    }
  });

  router.post("/logout" , (req, res) => {
    if(req.session){
      req.session = null
    }

  })

  return router;
};