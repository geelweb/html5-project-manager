function HomeCtrl($scope) {
}

function AboutCtrl($scope) {
}

function ContactCtrl($scope) {
}

function DashboardCtrl($scope) {
}

function SettingsCtrl($scope) {
}

function ClientListCtrl($scope, Client) {
    $scope.clients = Client.query();

    $scope.remove = function() {
        this.client.remove();
    };
}

function ClientAddEditCtrl($scope, $routeParams, Client) {
    if ($routeParams.clientId) {
        $scope.client = Client.get({clientId: $routeParams.clientId});
    }

    $scope.submit = function() {
        if (!$scope.client._id) {
            var client = new Client({name: $scope.client.name});
            client.save();
        } else {
            $scope.client.update();
        }
    };
}

function ProjectListCtrl($scope, Project) {
    $scope.projects = Project.query();

    $scope.remove = function() {
        this.project.remove();
    };
}

function ProjectAddEditCtrl($scope, $routeParams, Project, Client) {
    $scope.clients = Client.query();

    if ($routeParams.projectId) {
        $scope.project = Project.get({projectId: $routeParams.projectId});
    }

    $scope.submit = function() {
        if (!$scope.project._id) {
            var project = new Project({
                name: $scope.project.name,
                _client: $scope.project._client
            });
            project.save();
        } else {
            $scope.project.update();
        }
    };
}

function TicketListCtrl($scope, Ticket) {
    $scope.tickets = Ticket.query();

    $scope.remove = function() {
        this.ticket.remove();
    };
}

function TicketAddEditCtrl($scope, $routeParams, Ticket, Project) {
    $scope.projects = Project.query();

    if ($routeParams.ticketId) {
        $scope.ticket = Ticket.get({ticketId: $routeParams.ticketId});
    }

    $scope.submit = function() {
        if (!$scope.ticket._id) {
            var ticket = new Ticket({
                subject: $scope.ticket.subject,
                priority: $scope.ticket.priority,
                description: $scope.ticket.description,
                _project: $scope.ticket._project
            });
            ticket.save();
        } else {
            $scope.ticket.update();
        }
    };
}
