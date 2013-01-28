// Single exported variable containing definition
exports.definition = {
	
	// Config used for creating BackboneJS classes and adapter
	config: {
		
		// Columns
		"columns": {
			"translation":"string"
		},
		
		// Defaults for unset columns
		"defaults": {
			"translation": "Hello world"
		},
		
		// Sync adapter config
		"adapter": {
			"type": "sql",
			
			// Name of the collection (e.g. can be plural)
			"collection_name": "hello"
		}
	},		

	// Extend the generated BackboneJS model class
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
					
			// Add validation	
            validate: function (attrs) {
    	        for (var key in attrs) {
                    var value = attrs[key];
                    
                    // Don't allow to say bye (in English)
                    if (key === "translation" && value == 'Bye world') {
                        return "Error: Say hello, not bye!";
                    }
                }
            }

		});
		
		return Model;
	},
	
	// Extend the generated BackboneJS collection class
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			
			// Set comparator
    	    comparator : function(model) {
    	    	
    	    	// Case-incensitive comparison on translation column
        	    return model.get('translation').toLowerCase();
            }		
			
		});
		
		return Collection;
	}
		
}
