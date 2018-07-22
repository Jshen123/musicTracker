exports.up = function(knex, Promise) {
  return knex.schema.createTable("playlists_songs", (table) => {
    table.primary(['playlist_id', 'song_id']);
    table.integer('playlist_id').notNullable();
    table.integer('song_id').notNullable();
    table.foreign('playlist_id').references("playlists.playlist_id").onDelete('cascade');
    table.foreign('song_id').references("songs.song_id").onDelete('cascade');
   })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlists_songs');
};
