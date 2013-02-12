describe('Project Manager controllers', function() {
    beforeEach(module('pmServices'));

    describe('ClientListCtrl', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/rest/clients/clients.json')
            .respond([
                {"id": 1, "name": "Client A"},
                {"id": 2, "name": "Client B"},
                {"id": 3, "name": "Client C"}
            ]);

            scope = $rootScope.$new();
            ctrl = $controller(ClientListCtrl, {$scope: scope});
        }));


        it('should create "clients" model with 3 clients fetched from xhr', function() {
            expect(scope.clients).toEqual([]);
            $httpBackend.flush();

            expect(scope.clients.length).toBe(3);
        });
    });

    describe('ProjectListCtrl', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/rest/projects/projects.json')
            .respond([
                {"id": 1, "name": "Project A", "id_client": 1},
                {"id": 2, "name": "Project B", "id_client": 2},
                {"id": 3, "name": "Project C", "id_client": 1}
            ]);

            scope = $rootScope.$new();
            ctrl = $controller(ProjectListCtrl, {$scope: scope});
        }));


        it('should create "projects" model with 3 projects fetched from xhr', function() {
            expect(scope.projects).toEqual([]);
            $httpBackend.flush();

            expect(scope.projects.length).toBe(3);
        });
    });
});
