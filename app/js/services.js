var pmServices = angular.module('pmServices', ['ngResource']);

pmServices.factory('Client', function($resource) {
    return $resource('/rest/clients/:clientId', {}, {
        'query': {method:'GET', params:{clientId:'clients'}, isArray:true},
        'save': {method:'POST', params:{clientId:''}},
        'update': {method:'UPDATE'}
    });
});

pmServices.factory('Project', function($resource) {
    return $resource('/rest/projects/:projectId.json', {}, {
        query: {method:'GET', params:{projectId:'projects'}, isArray:true}
    });
});

pmServices.factory('Ticket', function($resource) {
    return $resource('/rest/tickets/:ticketId.json', {}, {
        query: {method:'GET', params:{ticketId:'tickets'}, isArray:true}
    });
});

/*pmLocalServices = angular.module('pmLocalServices', ['gwIndexedDb']);

pmLocalServices.factory('LocalClient', function($indexedDb) {
    return $indexedDb('my_db', 1, {
        'clients' : {
            params: {keyPath: "id"},
            indexes: {
                'name': { keyPath: "name", params: {"unique": true}}
            }
        }
    });
});*/
