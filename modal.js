$(function() {
    $(document).on('click', '[data-modal]', function() {
        var modal = $(this).data('modal');
        var $modal = $(modal);
        $modal.data('content', $(this).data('content'));
        $modal.toggleClass('d-none', false);
        $modal.trigger('openModal');
    });

    $('.modal .close').on('click', function() {
        $(this).closest('.modal').toggleClass('d-none', true);
        $(this).closest('.modal').trigger('closeModal');
    });

    $(document).on('click', function(event) {
        var activeModal = $('.modal:not(.d-none)')[0];
        if (event.target == activeModal) {
            $('.modal').toggleClass('d-none', true);
            $('.modal').trigger('closeModal');
        }
    });
});