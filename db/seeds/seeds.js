exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('songs').del(),
    ]).then(() => {
      return Promise.all([
        knex('users').insert({username: 'user1', password: '1', access: 'regular'}),
        knex('users').insert({username: 'user2', password: '1', access: 'regular'}),
        knex('users').insert({username: 'admin', password: '11', access: 'admin'})
        ])
    }).then(() => {
        return knex('playlists').del().then(() => {
          return Promise.all([
            knex('playlists').insert({playlist_name: 'personal songs', user_id: 2, create_date: '2016-03-07 10:00:00'})
            .returning('playlist_id').then(function(ids) {
              return Promise.all([
                knex('songs').insert({song_name: 'Don\'t Blame Me', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),      
                knex('songs').insert({song_name: 'Talking To The Moon', artist_name: 'Bruno Mars', album_name: 'It\'s Better If You Don\'t Understand', release_date: '2010-05-11', genre: 'Pop'}),
                knex('songs').insert({song_name: 'Catch a Grenade (The Hooligans Remix)', artist_name: 'Bruno Mars', album_name: 'The Grenade Session', release_date: '2011-02-08', genre: 'Pop'}),
                knex('songs').insert({song_name: 'Grenade', artist_name: 'Bruno Mars', album_name: 'The Grenade Session', release_date: '2011-02-08', genre: 'Pop'}),
                knex('songs').insert({song_name: 'Grenade (Acoustic)', artist_name: 'Bruno Mars', album_name: 'The Grenade Session', release_date: '2011-02-08', genre: 'Pop'}),
                knex('songs').insert({song_name: 'Grenade (Passion Pit Remix)', artist_name: 'Bruno Mars', album_name: 'The Grenade Session', release_date: '2011-02-08', genre: 'Pop'}),
              ])
            }),
            knex('playlists').insert({playlist_name: 'Liked Song', user_id: 1, create_date: '2017-03-07 09:00:00'})
            .returning('playlist_id').then(function(ids) {
              return Promise.all([
                knex('songs').insert({song_name: 'Uptown', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'I\'m Goin\' In', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'Calm', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'Fear', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'God\'s Plan', artist_name: 'Drake', album_name: 'Scary Hours', release_date: '2018-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'Diplomatic Immunity', artist_name: 'Drake', album_name: 'Scary Hours', release_date: '2018-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'Housetatlantavegas', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-09-15', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'Successful', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-01-19', genre: 'Hip-hop'}),
                knex('songs').insert({song_name: 'Best I Ever Had', artist_name: 'Drake', album_name: 'So Far Gone', release_date: '2009-01-19', genre: 'Hip-hop'}),
              ])
            }),
            knex('playlists').insert({playlist_name: 'Liked Song V.2', user_id: 1, create_date: '2018-01-05 08:00:00'})
            .returning('playlist_id').then(function(ids) {
              return Promise.all([
                knex('songs').insert({song_name: 'Look What You Made Me Do', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'So it Goes...', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Gorgeous', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Getaway Car', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'King of My Heart', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Dancing With Our Hands Tied', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Delicate', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: '...Ready for it?', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
              ])
            }),
            knex('playlists').insert({playlist_name: 'pops', user_id: 1, create_date: '2018-01-05 08:00:00'})
            .returning('playlist_id').then(function(ids) {
              return Promise.all([
                knex('songs').insert({song_name: 'Look What You Made Me Do', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'So it Goes...', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Gorgeous', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Getaway Car', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'King of My Heart', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Dancing With Our Hands Tied', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'End Game', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'I Did Something Bad', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
              ])
            }),
            knex('playlists').insert({playlist_name: 'Top Pop Song 2017', user_id: 1, create_date: '2018-03-02 08:00:00'})
            .returning('playlist_id').then(function(ids) {
              return Promise.all([
                knex('songs').insert({song_name: 'Dress', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Somewhere In Brooklyn', artist_name: 'Bruno Mars', album_name: 'It\'s Better If You Don\'t Understand', release_date: '2010-05-11', genre: 'Pop'}),
                knex('songs').insert({song_name: 'This Is Why We Can\'t Have Nice Things', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'Call It What You Want', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'New Year\'s Day', artist_name: 'Taylor Swift', album_name: 'Reputation', release_date: '2017-11-10', genre: 'Electricpop'}),
                knex('songs').insert({song_name: 'The Other Side', artist_name: 'Bruno Mars', album_name: 'It\'s Better If You Don\'t Understand', release_date: '2010-05-11', genre: 'Pop'}),
                knex('songs').insert({song_name: 'Count On Me', artist_name: 'Bruno Mars', album_name: 'It\'s Better If You Don\'t Understand', release_date: '2010-05-11', genre: 'Pop'}),             
              ])
            })
          ])
      });
    }).then(() => {
      return knex('playlists_songs').del().then(() => {
        return Promise.all([
          knex('playlists_songs').insert({playlist_id: 1, song_id:1}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:2}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:3}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:4}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:5}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:6}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:7}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:8}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:9}),
          knex('playlists_songs').insert({playlist_id: 1, song_id:10}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:11}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:12}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:13}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:14}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:15}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:16}),
          knex('playlists_songs').insert({playlist_id: 2, song_id:17}),
          knex('playlists_songs').insert({playlist_id: 3, song_id:18}),
          knex('playlists_songs').insert({playlist_id: 3, song_id:19}),
          knex('playlists_songs').insert({playlist_id: 3, song_id:20}),
          knex('playlists_songs').insert({playlist_id: 3, song_id:21}),
          knex('playlists_songs').insert({playlist_id: 3, song_id:22}),
          knex('playlists_songs').insert({playlist_id: 3, song_id:23}),
          knex('playlists_songs').insert({playlist_id: 4, song_id:24}),
          knex('playlists_songs').insert({playlist_id: 4, song_id:25}),
          knex('playlists_songs').insert({playlist_id: 4, song_id:26}),
          knex('playlists_songs').insert({playlist_id: 4, song_id:27}),
          knex('playlists_songs').insert({playlist_id: 4, song_id:28}),
          knex('playlists_songs').insert({playlist_id: 4, song_id:29}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:30}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:31}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:32}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:33}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:34}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:35}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:36}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:37}),
          knex('playlists_songs').insert({playlist_id: 5, song_id:38}),
        ])
      });
    })
};


