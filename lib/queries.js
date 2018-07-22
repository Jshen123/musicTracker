module.exports = function queriesAndFunctions(db) {
	return {

		// Display all attributes of all playlists. 
		getAllPlaylists: (done) => {
			db.select('playlist_id', 'playlist_name','user_id','create_date')
			.from(playlists).then(done);
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

		//Display playlist name of playlist made by "userid"
		getPlaylistName: (UID,done) => {
			db.select('playlist_name')
			.from('playlists')
			.where({user_id:UID}).then(done);
		},


		//Display playlist name and date of newest playlist, order in descending year
		getPlaylistName: (UID,done) => {
			db.select('playlist_name','create_date')
			.from('playlists')
			.where({UserID:UID})
			.orderBy('create_date', 'desc').then(done);
		},

		//Insert playlist into playlist table
		createPlaylist: (PID, PName, UID, cDate, done) => {
			db.insert({playlist_id:PID,playlist_name:PName,user_id:UID,create_date:cDate})
			.into('playlists').then(done);
		},

		//Insert songs into songs table (SongID, SongName, ArtistName, AlbumName, ReleaseDate, Genre)
		insertSong: (SID, SName, ArtName, AlbName, RDate,done) => {
			db.insert({song_id:SID,song_name:SName,artist_name:ArtName,album_name:AlbName, release_date:RDate})
			.into('songs').then(done);
		},	

		//Display SongName, Artist, ReleaseDate, Album from songs
		getSongs: (SID, SName, ArtName, AlbName, RDate,done) => {
			db.select('SongName', 'ArtistName', 'AlbumName', 'ReleaseDate')	
			.from('songs')
			.orderBy('ArtistName', 'AlbumName', 'SongName', 'asc').then(done);
		},	

	};
}
