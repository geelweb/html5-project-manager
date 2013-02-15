angular.module('mongoService', ['ngResource'])
    .factory('Client', function($resource) {
        var Client = $resource('http://127.0.0.1\\:4242/api/clients/:clientId', {}, {
            query: {method:'GET', params:{clientId:''}, isArray: true},
            update: {method: 'PUT'},
        });

        Client.prototype.update = function(success, error) {
            return Client.update({clientId: this._id}, angular.extend({}, this, {_id:undefined}), success, error);
        };

        Client.prototype.save = function(success, error) {
            return Client.save({clientId: ''}, {name: this.name}, success, error);
        };

        Client.prototype.remove = function(success, error) {
            return Client.remove({clientId: this._id}, success, error);
        };

        return Client;
    })

    .factory('Project', function($resource) {
        var Project = $resource('http://127.0.0.1\\:4242/api/projects/:projectId', {}, {
            query: {method:'GET', params:{projectId:''}, isArray: true},
            update: {method: 'PUT'},
        });

        Project.prototype.update = function(success, error) {
            return Project.update({projectId: this._id}, angular.extend({}, this, {_id:undefined, _client: this._client._id}), success, error);
        };

        Project.prototype.save = function(success, error) {
            return Project.save({projectId: ''}, angular.extend({}, this, {_id:undefined, _client: this._client._id}), success, error);
        };

        Project.prototype.remove = function(success, error) {
            return Project.remove({projectId: this._id}, success, error);
        };

        return Project;
    })

    .factory('Ticket', function($resource) {
        var Ticket = $resource('http://127.0.0.1\\:4242/api/tickets/:ticketId', {}, {
            query: {method:'GET', params:{ticketId:''}, isArray: true},
            update: {method: 'PUT'},
        });

        Ticket.prototype.update = function(success, error) {
            return Ticket.update({ticketId: this._id}, angular.extend({}, this, {_id:undefined, _project: this._project._id}), success, error);
        };

        Ticket.prototype.save = function(success, error) {
            return Ticket.save({ticketId: ''}, angular.extend({}, this, {_id:undefined, _project: this._project._id}), success, error);
        };

        Ticket.prototype.remove = function(success, error) {
            return Ticket.remove({ticketId: this._id}, success, error);
        };

        return Ticket;
    })
;

angular.module('roService', ['ngResource'])
    .factory('Client', function($resource) {
        var Client = $resource('../rest/clients/:clientId.json', {}, {
            query: {method:'GET', params:{clientId:'clients'}, isArray:true}
        });

        Client.prototype.update = function(success, error) {
            console.log('read-only mode');
        };

        Client.prototype.save = function(success, error) {
            console.log('read-only mode');
        };

        Client.prototype.remove = function(success, error) {
            console.log('read-only mode');
        };
        return Client;
    })

    .factory('Project', function($resource) {
        var Project = $resource('../rest/projects/:projectId.json', {}, {
            query: {method:'GET', params:{projectId:'projects'}, isArray:true}
        });

        Project.prototype.update = function(success, error) {
            console.log('read-only mode');
        };

        Project.prototype.save = function(success, error) {
            console.log('read-only mode');
        };

        Project.prototype.remove = function(success, error) {
            console.log('read-only mode');
        };
        return Project;
    })

    .factory('Ticket', function($resource) {
        var Ticket = $resource('../rest/tickets/:ticketId.json', {}, {
            query: {method:'GET', params:{ticketId:'tickets'}, isArray:true}
        });

        Ticket.prototype.update = function(success, error) {
            console.log('read-only mode');
        };

        Ticket.prototype.save = function(success, error) {
            console.log('read-only mode');
        };

        Ticket.prototype.remove = function(success, error) {
            console.log('read-only mode');
        };
        return Ticket;
    })
;
