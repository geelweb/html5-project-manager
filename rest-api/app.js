// Setup mongoose and the database
var mongoose = require('mongoose/');
var db = mongoose.connect('mongodb://localhost/pm_database_v2'),
    Schema = mongoose.Schema;

var fs = require('fs');

// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');
var server = restify.createServer();
server.use(function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
server.use(restify.bodyParser());


// Create the schema
var ClientSchema = new Schema({
    name: String,
    created: {type: Date, default: Date.now},
    modified: Date
});

var ProjectSchema = new Schema({
    name: String,
    _client: {type: Schema.Types.ObjectId, ref: 'Client'},
    created: {type: Date, default: Date.now},
    modified: Date
});

var TicketSchema = new Schema({
    subject: String,
    _project: {type: Schema.Types.ObjectId, ref: 'Project'},
    description: String,
    priority: {type:String, enum: ['low', 'normal', 'high']},
    warning: String,
    created: {type: Date, default: Date.now},
    modified: Date
});

// Use the schema to register a model
mongoose.model('Client', ClientSchema);
var Client = mongoose.model('Client');

mongoose.model('Project', ProjectSchema);
var Project = mongoose.model('Project');

mongoose.model('Ticket', TicketSchema);
var Ticket = mongoose.model('Ticket');

// setup the generic routes

/**
 * Display public/index.html
 */
server.get('/', function(req, res, next) {
    fs.readFile(__dirname + '/public//index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });
});

/**
 * Handle Cross-Origin Resource Sharing on all routes call with the verb OPTION
 */
server.opts('/api/.*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // we have to restrict to some pre-defined domains here
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Method", "POST, GET, PUT, DELETE, OPTIONS");
    res.send(200);
});

// Setup the clients routes

/**
 * Get all clients
 */
server.get('/api/clients', function(req, res, next) {
    Client.find().execFind(function (err, client) {
        res.send(client);
    });
});

/**
 * Get client details
 */
server.get('/api/clients/:id', function(req, res, next) {
    Client.findById(req.params.id, function(err, client) {
        if (!err && client) {
            res.send(client);
        } else {
            res.send('');
        }
    });
});

/**
 * Create a client
 */
server.post('/api/clients', function(req, res, next) {
    var client = new Client();
    client.name = req.params.name;
    client.modified = new Date()
    client.save(function () {
        res.send(req.body);
    });
});

/**
 * Update a client
 */
server.put('/api/clients/:id', function(req, res, next) {
    Client.findById(req.params.id, function(err, client) {
        client.name = req.params.name;
        client.modified = new Date()
        client.save(function (err) {
            if (err) {
                console.error(err);
            }
            res.send(req.body);
        });
    });
});


/**
 * Delete a client
 */
server.del('/api/clients/:id', function(req, res, next) {
    Client.findById(req.params.id, function(err, client) {
        return client.remove(function (err) {
            if (!err) {
                return res.send('');
            } else {
                console.log(err);
            }
         });
    });
});


// Setup project routes

/**
 * Get all projects
 */
server.get('/api/projects', function(req, res, next) {
    Project.find().populate('_client').execFind(function (err, data) {
        res.send(data);
    });
});

/**
 * Get project details
 */
server.get('/api/projects/:id', function(req, res, next) {
    Project.findById(req.params.id, function(err, data) {
        if (!err && data) {
            res.send(data);
        } else {
            res.send('');
        }
    });
});

/**
 * Create a project
 */
server.post('/api/projects', function(req, res, next) {
    var project = new Project();
    project.name = req.params.name;
    project._client = req.params._client;
    project.save(function () {
        res.send(req.body);
    });
});

/**
 * Update a project
 */
server.put('/api/projects/:id', function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
        project.name = req.params.name;
        project._client = req.params._client;
        project.modified = new Date()
        project.save(function (err) {
            if (err) {
                console.error(err);
            }
            res.send(req.body);
        });
    });
});


/**
 * Delete a project
 */
server.del('/api/projects/:id', function(req, res, next) {
    Project.findById(req.params.id, function(err, project) {
        return project.remove(function (err) {
            if (!err) {
                return res.send('');
            } else {
                console.log(err);
            }
         });
    });
});

// Setup ticket routes

/**
 * Get all tickets
 */
server.get('/api/tickets', function(req, res, next) {
    Ticket.find().populate('_project').execFind(function (err, data) {
        res.send(data);
    });
});

/**
 * Get ticket details
 */
server.get('/api/tickets/:id', function(req, res, next) {
    Ticket.findById(req.params.id, function(err, data) {
        if (!err && data) {
            res.send(data);
        } else {
            res.send('');
        }
    });
});

/**
 * Create a ticket
 */
server.post('/api/tickets', function(req, res, next) {
    var ticket = new Ticket();
    ticket.subject = req.params.subject;
    ticket.description = req.params.description;
    ticket._project = req.params._project;
    ticket.priority = req.params.priority;
    ticket.save(function () {
        res.send(req.body);
    });
});

/**
 * Update a ticket
 */
server.put('/api/tickets/:id', function(req, res, next) {
    Ticket.findById(req.params.id, function(err, ticket) {
        ticket.subject = req.params.subject;
        ticket.description = req.params.description;
        ticket._project = req.params._project;
        ticket.priority = req.params.priority;
        ticket.modified = new Date()
        ticket.save(function (err) {
            if (err) {
                console.error(err);
            }
            res.send(req.body);
        });
    });
});


/**
 * Delete a ticket
 */
server.del('/api/tickets/:id', function(req, res, next) {
    Ticket.findById(req.params.id, function(err, ticket) {
        return ticket.remove(function (err) {
            if (!err) {
                return res.send('');
            } else {
                console.log(err);
            }
         });
    });
});


server.listen(4242, function() {
    console.log('%s listening at %s', server.name, server.url);
});
