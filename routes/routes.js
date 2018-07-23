//imports
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
  router.post("/api/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    DataQueries.existUnamePwd(username, password, (value) => {
      if(value.length == 0){
        res.status("401")
        let redir = {redirect: "/login"}
        res.json(redir)
      } else {
        req.session.user_id = value[0].user_id
        let redir = {redirect: "/"}
        res.json(redir)
      }
    })
  });

  // router.get("/api/playlists/:id", (req, res) => {
  //   const playlistId = req.params.id

  //   DataQueries.getPlaylistSongs(playlistId, (vale)=> {
  //     res.json(value);
  //     let redir = {redirect: `playlists/${playlistId}`}
  //     res.json(redir)
  //   })

    // const 
    // DataQueries.getPlaylistSongs()
  // });

  router.get("/api/playlists", (req, res) => {
    if(req.session.user_id){
      DataQueries.getPlaylistName( req.session.user_id, (value) => {
        res.json(value);
      });
    }
  });



  return router;
};