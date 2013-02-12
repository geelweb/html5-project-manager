/*angular.module('pmClients', [])
    .directive('initClientList', function() {
        return function(scope, element, attrs) {
            $('#add_client').modal({
                keyboard: false,
                show: false
            });

            $('a[href=#add_client]').click(function(e) {
                $('#id').val(0);
                $('#name').val('');
                $('#add_client').modal('show');
                e.preventDefault();
                e.stopPropagation();
            });
        };
    })
    .directive('initClientItem', function() {
        return function(scope, element, attrs) {

            $('a[href=#edit_client]', element).click(function(e) {
                console.log('Edit the client ' + scope.client.name + ' #' + scope.client.id);
                $('#id').val(scope.client.id);
                $('#name').val(scope.client.name);
                $('#add_client').modal('show');

                e.preventDefault();
                e.stopPropagation();
            });

            $('a[href=#remove_client]', element).click(function(e) {
                console.log('Remove the client ' + scope.client.name + ' #' + scope.client.id);

                e.preventDefault();
                e.stopPropagation();
            });
        };
    })
;*/
