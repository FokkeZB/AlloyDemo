// Migrating forward
migration.up = function(db) {
	
	// Pass config like used in hello model
    db.createTable({
		"columns": {
			"translation":"string"
		},
		"defaults": {
			"translation": "Hello world"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "hello"
		}
    });
};

// Migrating backward (not used at the moment)
migration.down = function(db) {
	db.dropTable("hello");
};
