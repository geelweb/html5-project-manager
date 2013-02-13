angular.module('pm', ['pmProjects', 'pmTickets', 'pmServices'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {templateUrl:'partials/home.html', controller: HomeCtrl})
            .when('/about', {templateUrl:'partials/about.html', controller: AboutCtrl})
            .when('/contact', {templateUrl:'partials/contact.html', controller: ContactCtrl})
            .when('/dashboard', {templateUrl:'partials/dashboard.html', controller: DashboardCtrl})
            .when('/clients', {templateUrl:'partials/clients/list.html', controller: ClientListCtrl})
            .when('/client/:clientId', {templateUrl:'partials/clients/add-edit.html', controller: ClientAddEditCtrl})

            .when('/projects', {templateUrl:'partials/project-list.html', controller: ProjectListCtrl})
            .when('/tickets', {templateUrl:'partials/ticket-list.html', controller: TicketListCtrl})
            .when('/settings', {templateUrl:'partials/settings.html', controller: SettingsCtrl})
            .otherwise({redirectTo: '/home'});
    }])
;
