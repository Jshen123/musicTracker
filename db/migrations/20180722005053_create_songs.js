exports.up = function(knex, Promise) {
  return knex.schema.createTable("songs", (table) => {
	table.increments('song_id');
 	table.string('song_name');
	table.string('artist_name');
	table.string('album_name');
  table.string('genre');
  table.date('release_date');
   })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('songs');
};
