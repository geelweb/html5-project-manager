angular.module('pm', ['roService']) // use mongoService instead of roService to be able to edit values
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {templateUrl:'partials/home.html', controller: HomeCtrl})
            .when('/about', {templateUrl:'partials/about.html', controller: AboutCtrl})
            .when('/contact', {templateUrl:'partials/contact.html', controller: ContactCtrl})
            .when('/dashboard', {templateUrl:'partials/dashboard.html', controller: DashboardCtrl})
            .when('/clients', {templateUrl:'partials/clients/list.html', controller: ClientListCtrl})
            .when('/client/:clientId', {templateUrl:'partials/clients/add-edit.html', controller: ClientAddEditCtrl})
            .when('/projects', {templateUrl:'partials/projects/list.html', controller: ProjectListCtrl})
            .when('/project/:projectId', {templateUrl:'partials/projects/add-edit.html', controller: ProjectAddEditCtrl})
            .when('/tickets', {templateUrl:'partials/tickets/list.html', controller: TicketListCtrl})
            .when('/ticket/:ticketId', {templateUrl:'partials/tickets/add-edit.html', controller: TicketAddEditCtrl})
            .when('/settings', {templateUrl:'partials/settings.html', controller: SettingsCtrl})
            .otherwise({redirectTo: '/home'});
    }])
;
