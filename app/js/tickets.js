angular.module('pmTickets', [])
    .directive('initTicketList', function() {
        return function(scope, element, attrs) {
            $('#add_ticket').modal({
                keyboard: false,
                show: false
            });

            $('a[href=#add_ticket]').click(function(e) {
                $('#id').val(0);
                $('#title').val('');
                $('#project').val(0);
                $('#priority').val('normal');
                $('#add_ticket').modal('show');

                e.preventDefault();
                e.stopPropagation();
            });
        };
    })
    .directive('initTicketItem', function() {
        return function(scope, element, attrs) {
            $('a[href=#edit_ticket]', element).click(function(e) {
                $('#id').val(scope.ticket.id);
                $('#title').val(scope.ticket.title);
                $('#project').val(scope.ticket.id_project);
                $('#priority').val(scope.ticket.priority);
                $('#add_ticket').modal('show');

                e.preventDefault();
                e.stopPropagation();
            });

            $('a[href=#remove_ticket]', element).click(function(e) {
                console.log('Remove the ticket ' + scope.ticket.title);

                e.preventDefault();
                e.stopPropagation();
            });

            if (scope.ticket.warning) {
                $('a[rel=tooltip]', element).tooltip({
                    animation: true,
                    placement: 'top',
                    title: scope.ticket.warning
                });
            }
        };
    })
;
