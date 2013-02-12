(function(window, angular, undefined) {
'use strict';
var gwIndexedDb = angular.module('gwIndexedDb', ['ng']);

/**
 * The basic pattern that IndexedDB encourages is the following:
 *
 * 1. Open a database and start a transaction.
 * 2. Create an object store.
 * 3. Make a request to do some database operation, like adding or retrieving data.
 * 4. Wait for the operation to complete by listening to the right kind of DOM event.
 * 5. Do something with the results (which can be found on the request object).
 *
 */
gwIndexedDb.factory('$indexedDb', [function(){
    var db = null,
        forEach = angular.forEach,
        copy = angular.copy;

    function IndexedDbFactory(db_name, db_version, storesDefinition) {
        var request = window.indexedDB.open(db_name, db_version);

        // handle errors
        request.onerror = function(event) {
            console.error('Can not use indexedDb ?! error ' + request.errorCode);
        };

        // handle success
        request.onsuccess = function(event) {
            console.log('Connection to db is done');
            db = request.result;

            // handle errors
            db.onerror = function(event) {
                console.error('Db error ' + event.target.errorCode);
            };

            request.onupdateneeded = function(event) {
                forEach(storesDefinition, function(def, name) {
                    console.log('Create object store ' + name);
                    var objectStore = db.createObjectStore(name, def['params']);
                    forEach(def['indexes'], function(params, ix_name) {
                        objectStore.createIndex(ix_name, params['keyPath'], params['params']);
                    });
                });
            };
        };

        function IndexedDb(value) {
            copy(value || {}, this);
            console.log(this.db);
        }


        IndexedDb['getAll'] = function(store) {
            if (!db) {
                return;
            }
            var objectStore = db.transaction([store]).objectStore(store),
                collection = [];

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    collection.push(cursor.value);
                    cursor.continue();
                } else {
                    console.log('Got all objects ' + collection);
                }
            };
        };

        IndexedDb.prototype['$getAll'] = function(store) {
            IndexedDb['getAll'].call(this, store);
        };

        return IndexedDb;
    }

    return IndexedDbFactory;
}]);
})(window, window.angular);

/*var indexedDbService = angular.module('indexedDbService', []);
indexedDbService.factory('LocalDb', function() {
    var db;
    var request = window.indexedDB.open("MyPmDatabase", 1);
    request.onerror = function(event) {
        console.error('Can not use indexedDb ?! error ' + request.errorCode);
    };
    request.onsuccess = function(event) {
        db = request.result;
        db.onerror = function(event) {
            console.error('Db error ' + event.target.errorCode);
        };


        // starts transaction
//        var transaction = db.transaction(["clients"], "readwrite");
//        transaction.oncomplete = function(event) {
//            console.log("transaction complete");
//        };
//        transaction.onerror = function(event) {
//            console.error("transaction error");
//        };
    };
    request.onupdateneeded = function(event) {
        console.log('upgrade the db');
        //var db = event.target.result;
        // create object stores
        var objectStore = db.createObjectStore("clients", {keyPath: "id"});
        objectStore.createIndex("name", "name", {unique: true});
    };
    return {
        query: function(store, id) {
            console.log('querying object ' + store);
            if (id) {
                var transaction = db.transaction([store]);
                var objectStore = transaction.objectStore(store);
                var request = objectStore.get(store);
                request.onerror = function(event) {
                      // Handle errors!
                };
                request.onsuccess = function(event) {
                    // Do something with the request.result!
                    alert("Name for ID " + id + " is " + request.result.name);
                };
            } else {
                var objectStore = db.transaction(store).objectStore(store);

                objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        console.log("Client for id " + cursor.key + " is " + cursor.value.name);
                        cursor.continue();
                    } else {
                        console.log("No more entries!");
                    }
                };
            }
        },
        save: function(store, data) {
            console.log('save object ' + store);
            var transaction = db.transaction([store], "readwrite");
            transaction.oncomplete = function(event) {
                console.log("Data saved!");
            };
            transaction.onerror = function(event) {
                console.error("Data not saved!");
            };
            var objectStore = transaction.objectStore(store);
            var request = objectStore.add(data);
            request.onsuccess = function(event) {
                event.target.result == data['id'];
            };
        },
        delete: function(store, id) {
            var request = db.transaction([store], "readwrite")
                .objectStore(store)
                .delete(id);
            request.onsuccess = function(event) {
                console.log("Record deleted!");
            };
        }
    };
});
*/
