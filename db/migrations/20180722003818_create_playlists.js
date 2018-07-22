exports.up = function(knex, Promise) {
  return knex.schema.createTable("playlists", (table) => {
  	table.increments('playlist_id');
    table.string('playlist_name');
    table.integer('user_id').unsigned()
	  table.foreign('user_id').references("users.user_id").onDelete('cascade');
  	table.date('create_date');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlists');
};
