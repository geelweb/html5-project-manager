angular.module('pmProjects', [])
    .directive('initProjectList', function() {
        return function(scope, element, attrs) {
            $('#add_project').modal({
                keyboard: false,
                show: false
            });

            $('a[href=#add_project]').click(function(e) {
                $('#id').val(0);
                $('#name').val('');
                $('#client').val(0);
                $('#add_project').modal('show');

                e.preventDefault();
                e.stopPropagation();
            });
        };
    })
    .directive('initProjectItem', function() {
        return function(scope, element, attrs) {
            $('a[href=#edit_project]', element).click(function(e) {
                $('#id').val(scope.project.id);
                $('#name').val(scope.project.name);
                $('#client').val(scope.project.id_client);
                $('#add_project').modal('show');

                e.preventDefault();
                e.stopPropagation();
            });

            $('a[href=#remove_project]', element).click(function(e) {
                console.log('Remove the project ' + scope.project.name);

                e.preventDefault();
                e.stopPropagation();
            });
        };
    })
;
