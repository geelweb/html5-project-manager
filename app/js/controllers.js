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

function ClientListCtrl($scope, Client, LocalClient) {
    $scope.clients = Client.query();
    //LocalClient.getAll('clients');
}

function ClientAddEditCtrl($scope, $routeParams, Client) {
    if ($routeParams.clientId > 0) {
        $scope.client = Client.get({clientId: $routeParams.clientId}, function(client) {
            $scope.id = client.id;
            $scope.name = client.name;
        });
    }

    $scope.submit = function() {
        if (this.id) {
            $scope.client.name = this.name;
            $scope.client.$update({clientId: this.id});
        } else {
            var client = Client;
            client.name = this.name;
            client.save();
        }
    };
}

function ProjectListCtrl($scope, Project) {
    $scope.projects = Project.query();
}

function ProjectDetailCtrl($scope) {
}

function TicketListCtrl($scope, Ticket) {
    $scope.tickets = Ticket.query();
}

function TicketDetailCtrl($scope) {
}
