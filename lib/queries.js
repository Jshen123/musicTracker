module.exports = function queriesAndFunctions(db) {
	return {

		// Display all attributes of all playlists. 
		getAllPlaylists: (done) => {
			db.select('playlist_id', 'playlist_name','user_id','create_date')
			.from('playlists').then(done);
    },
    
		//Delete a playlist
		deletePlaylist: (PID, done) => {
			db('playlists')
			.where({playlist_id:PID})
			.del()
			.then(done);
		},

		//Check the type of user
		getUserType: (UID,done) => {
			db.select('access')
			.from('users')
			.where({user_id:UID}).then(done);
		},

		//Display playlist name of playlist made by "userid"--
		getPlaylistName: (UID,done) => {
			db.select('playlist_id', 'playlist_name')
			.from('playlists')
			.where({user_id:UID}).then(done);
    },
    
    		//Display playlist name of playlist made by "playlist_id"--
		findPlaylistName: (PID,done) => {
			db.select('playlist_name')
			.from('playlists')
			.where({playlist_id:PID}).then(done);
		},

		//Display playlist name and date of newest playlist, order in descending year
		getPlaylistNameByDate: (done) => {
			db.select('playlist_name','create_date')
			.from('playlists')
			.orderBy('create_date', 'desc').limit(10).then(done);
		},

		//Insert playlist into playlist table--
		createPlaylist: (PName, UID, done) => {
			db.insert({playlist_name:PName,user_id:UID})
			.into('playlists').then(done);
    },
    
    //get New playlist Id from selected user ---
    getNewPlaylistId: (UID, done) => {
      db.select('playlist_id')
      .from('playlists')
      .where({user_id:UID})
      .orderBy('playlist_id','desc').limit(1).then(done);
    },

    //Insert songs into songs table (SongID, SongName, ArtistName, AlbumName, ReleaseDate, Genre)
    //Return id of the inserted song--
		insertSong: (SName, ArtName, Genre, AlbName, RDate,done) => {
			db.insert({song_name:SName, artist_name:ArtName, album_name:AlbName, genre:Genre, release_date:RDate})
      .into('songs')
      .returning('song_id')
      .into('songs')
      .then(done);
    },	
    
    insertPlaylistSong: (PID, SID, done) => {
			db.insert({playlist_id:PID, song_id:SID})
      .into('playlists_songs')
      .then(done);
    },	

		//Display SongName, Artist, ReleaseDate, Album from songs
		getAllSongs: (done) => {
			db.select('song_name', 'artist_name', 'album_name', 'release_date')	
			.from('songs')
			.orderBy('artist_name', 'album_name', 'song_name', 'asc').then(done);
    },
    
    // update the playlist with the new playlist name
    updatePlaylistName: (PID, PName, done) => {
      db("playlists")
      .where({playlist_id: PID})
      .update({
        playlist_name: PName
      }).then(done);
    },

		//Display SongName, Artist, ReleaseDate, Album for Playlist--
		getPlaylistSongs: (PID,done) => {
			db.select('song_name', 'artist_name', 'album_name', 'release_date')	
        .from('songs')
        .innerJoin('playlists_songs','playlists_songs.song_id','songs.song_id')
        .innerJoin('playlists', 'playlists.playlist_id', 'playlists_songs.playlist_id')
        .where({"playlists.playlist_id":PID})
			  .orderBy('artist_name', 'album_name', 'song_name', 'asc').then(done);
		},

		// see if username and password exist --
		existUnamePwd: (UID, PWD, done) => {
			db.select('user_id')
			.from('users')
			.where({username:UID})
			.andWhere({password:PWD}).then(done);
    },
    
    //Retrieve the number of songs from the playlist with playlistID --
    countSong: (PID,done) => {
      db('playlists_songs')
      .count('song_id')
      .where({playlist_id:PID}).then(done);
    },

    //Retrieve PID with plalist having more than n songs
    // findNonEmptyPlaylist: (n,done) =>{
    //   db('playlists_songs')
    //   .select(db.raw('playlist_name','count(*) as number', 'create_date'))
    //   .groupBy('playlist_id')
    //   .having('number','>',n).then(done);
    // },

    findNonEmptyPlaylist: (nSongs,done) => {
      db('playlists_songs')
      .select(db.raw('count(*) as numberSongs', 'playlist_id'))
      .groupBy('playlist_id')
      .having('numberSongs','>',nSongs).then(done);
    },

    //Retrieve PID with plalist having more than n songs
    findEmptyPlaylist: (done) =>{
      db.select('playlists.playlist_name', 'playlists.playlist_id')
      .from('playlists')
      .whereNotExists(function(){
          this.select('playlists_songs','playlist_name','song_id')
          .from('playlists_songs')
          .whereExists(function(){
              this.select('song_id')
              .from('songs')
              .where({"playlists.playlist_id": "playlists_songs.playlist_id"})
          })
      }).then(done);
  },



	};
}
