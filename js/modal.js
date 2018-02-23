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

    $('.modal').on('closeModal', function() {
        $(this).toggleClass('d-none', true);
    });

    $('.modal').on('open', function() {
        var $modal = $(this);
        $modal.toggleClass('d-none', false);
        $modal.trigger('openModal');
    });

    $('.modal .modal-content').on('click', function(e) { e.stopPropagation(); });
    $('.modal').on('click', function(event) {
        $(this).toggleClass('d-none', true);
        $(this).trigger('closeModal');
    });
});