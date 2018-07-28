module.exports = function queriesAndFunctions(db) {
	return {


    // QUERIES CURRENTLY USED IN THE APPLICATION

    //1. Projection Query
    /*
    Retrieve the playlist name and create date of all playlists, ordered by create date

    SELECT playlist_name, create_date
    FROM playlists
    ORDER BY create_date DESC
    */
		getPlaylistNameByDate: (done) => {
			db.select('playlist_name','create_date')
			.from('playlists')
			.orderBy('create_date', 'desc').then(done);
    },

    
    // 2. Selection Query
    /*
    Retrieve the playlist_name and create_date of all playlists made by user with user_id = n (n is a number)

    SELECT playlist_name
    FROM playlists
    WHERE user_id = n;
    */
    getPlaylistName: (UID,done) => {
      db.select('playlist_id', 'playlist_name')
      .from('playlists')
      .where({user_id:UID}).then(done);
    },

    /*
    Retrieve the playlist name of all playlists with playlist id = n (n is a number)

    SELECT playlist_name
    FROM playlists
    WHERE playlist_id = n;
    */
		findPlaylistName: (PID,done) => {
			db.select('playlist_name')
			.from('playlists')
			.where({playlist_id:PID}).then(done);
    },

    /*
    Retrieve the access(attribute) of user with user_id = n (n is a number)

    SELECT access
    FROM users
    WHERE user_id = n;
    */
    getUserType: (UID,done) => {
			db.select('access')
			.from('users')
			.where({user_id:UID}).then(done);
    },

    /*
    Find if there is a user_id with username = "username" and password = "password" in the same tuple

    SELECT user_id
    FROM users
    WHERE username = "username"
    AND password = "password";
    */
		existUnamePwd: (UID, PWD, done) => {
			db.select('user_id')
			.from('users')
			.where({username:UID})
			.andWhere({password:PWD}).then(done);
    },

    /*
    Retrieve the last playlist id from user with user_id = n (n is a number)

    SELECT playlist_id
    FROM playlists
    WHERE user_id = n
    ORDER BY playlist_id DESC
    LIMIT 1;
    */
    getNewPlaylistId: (UID, done) => {
      db.select('playlist_id')
      .from('playlists')
      .where({user_id:UID})
      .orderBy('playlist_id','desc').limit(1).then(done);
    },

    // 3. Join Query
    /*
    Retrieve the song_name, artist_name, album_name, and release_date from all playlists with playlist_id = n (n is a number)
    
    SELECT song_name, artist_name, album_name, release_date
    FROM songs
    INNER JOIN playlists_songs
    ON songs.song_id = playlists_songs.song_id
    INNER JOIN playlists
    ON playlists.playlist_id = playlists_songs.playlist_id
    WHERE playlists.playlist_id = n
    ORDER BY artist_name, album_name, song_name ASC
    */
    getPlaylistSongs: (PID,done) => {
      db.select('song_name', 'artist_name', 'album_name', 'release_date')	
        .from('songs')
        .innerJoin('playlists_songs','playlists_songs.song_id','songs.song_id')
        .innerJoin('playlists', 'playlists.playlist_id', 'playlists_songs.playlist_id')
        .where({"playlists.playlist_id":PID})
        .orderBy('artist_name', 'album_name', 'song_name', 'asc').then(done);
    },

    // 4. Aggregate Query
    /*
    Retrieve the number of songs from the playlists with playlist_id = n (n is a number)

    SELECT COUNT(song_id)
    FROM playlists_songs
    WHERE playlist_id = n;
    */
    countSong: (PID,done) => {
      db('playlists_songs')
      .count('song_id')
      .where({playlist_id:PID}).then(done);
    },

    // 5. Nested Aggregation Query
    /*
    Retrieve the playlist_id, playlist_name and create_date with playlist having more than n songs
    
    SELECT playlists.playlist_id, playlist_name, create_date
    FROM playlists_songs
    INNER JOIN playlists
    ON playlists.playlist_id = playlists_songs.playlist_id
    GROUP BY playlists.playlist_id
    HAVING COUNT(song_id) > n;
    */
    findNonEmptyPlaylist: (nSongs,done) => {
      db('playlists_songs')
      .select( 'playlists.playlist_id', 'playlist_name', 'create_date')
      .innerJoin('playlists', 'playlists.playlist_id', 'playlists_songs.playlist_id')
      .groupBy('playlists.playlist_id')
      .having(db.raw('count(*)'),'>',nSongs).then(done);
    },

    // 6. Update Operation
    /*
    Change the playlist name with playlist_id = n (n is a number)
    
    UPDATE playlists
    SET playlist_name = ‘New Name’
    WHERE playlist_id = n;
    */
    updatePlaylistName: (PID, PName, done) => {
      db("playlists")
      .where({playlist_id: PID})
      .update({
        playlist_name: PName
      }).then(done);
    },

    // 7. Delete Operation
    /*
    Remove playlist with playlist_id = n (n is a number)
    
    DELETE
    FROM playlists
    WHERE playlist_id = n
    */
		deletePlaylist: (PID, done) => {
			db('playlists')
			.where({playlist_id:PID})
			.del()
			.then(done);
    },
    
    // 8. Division Query
    /*
    Retrieve the playlist name of all playlists that contains no songs.    
    
    SELECT DISTINCT playlists.playlist_name, playlists_playlist_id
    FROM playlists 
    WHERE NOT EXISTS (
    SELECT * FROM playlist_songs
    WHERE EXISTS (
    SELECT song_id FROM songs WHERE playlists.playlist_id = playlist_songs.playlist_id))
    */
    findEmptyPlaylist: (done) =>{
      db.select('playlists.playlist_id', 'playlists.playlist_name', 'playlists.create_date')
      .from('playlists')
      .whereNotExists(function(){
          this.select('playlists_songs','playlist_name','song_id')
          .from('playlists_songs')
          .whereExists(function(){
              this.select('song_id')
              .from('songs','playlists_songs')
              .whereRaw('playlists.playlist_id = playlists_songs.playlist_id')
          })
      }).then(done);
    },

    // 9. Insertion Operation
    /*Insert into songs table (song_id, song_name, artist_name, album_name, release_date, genre)
      Return id of the inserted song
    
      INSERT INTO songs (song_name, artist_name, album_name, genre, release_date )
      OUTPUT INSERTED.song_id
      VALUES("songName", "artistName", "albumName", "genre", "releaseDate")

    */
		insertSong: (SName, ArtName, Genre, AlbName, RDate,done) => {
			db.insert({song_name:SName, artist_name:ArtName, album_name:AlbName, genre:Genre, release_date:RDate})
      .into('songs')
      .returning('song_id')
      .into('songs')
      .then(done);
    },	

    /*Insert into playlists_songs table (song_id, playlist_id)
    
      INSERT INTO songs (song_id, playlist_id)
      VALUES("songId", "playlistId")
    */
    insertPlaylistSong: (PID, SID, done) => {
			db.insert({playlist_id:PID, song_id:SID})
      .into('playlists_songs')
      .then(done);
    },	

    /*Insert into playlists table (playlist_name, user_id)
    
      INSERT INTO playlists (playlist_name, user_id)
      VALUES("playlistName", "userId")
    */
    createPlaylist: (PName, UID, done) => {
      db.insert({playlist_name:PName,user_id:UID})
      .into('playlists').then(done);
    },
    

    // QUERIES NOT USED IN THE APPLICATION-----------------------------------------------------------

    // Display all attributes of all playlists. 
		getAllPlaylists: (done) => {
			db.select('playlist_id', 'playlist_name','user_id','create_date')
			.from('playlists').then(done);
    },
  
		//Display SongName, Artist, ReleaseDate, Album from songs
		getAllSongs: (done) => {
			db.select('song_name', 'artist_name', 'album_name', 'release_date')	
			.from('songs')
			.orderBy('artist_name', 'album_name', 'song_name', 'asc').then(done);
    },

	};
}
