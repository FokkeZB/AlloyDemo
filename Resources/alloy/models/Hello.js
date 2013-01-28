exports.definition = {
    config: {
        columns: {
            translation: "string"
        },
        defaults: {
            translation: "Hello world"
        },
        adapter: {
            type: "sql",
            collection_name: "hello"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            validate: function(attrs) {
                for (var key in attrs) {
                    var value = attrs[key];
                    if (key === "translation" && value == "Bye world") return "Error: Say hello, not bye!";
                }
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(model) {
                return model.get("translation").toLowerCase();
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("hello", exports.definition, [ function(migration) {
    migration.name = "hello";
    migration.id = "201300261447636";
    migration.up = function(db) {
        db.createTable({
            columns: {
                translation: "string"
            },
            defaults: {
                translation: "Hello world"
            },
            adapter: {
                type: "sql",
                collection_name: "hello"
            }
        });
    };
    migration.down = function(db) {
        db.dropTable("hello");
    };
} ]);

collection = Alloy.C("hello", exports.definition, model);

exports.Model = model;

exports.Collection = collection;