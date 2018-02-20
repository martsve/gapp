var SetActiveTab = function(active) {
    if ($('#'+active).length == 0) {
        active = 'general-tab';
    }
    $('#tab-selection a[data-tab]').each(function(){
        var id = $(this).data('tab');
        var $target = $('#'+$(this).data('tab'));
        $target.toggleClass('d-none', active != id);
        $(this).closest('li').toggleClass('selected', active == id);
    });
}

$(function() {
    $('#tab-selection a[data-tab]').on('click', function() {
        var active = $(this).data('tab');
        Gloomhaven.SetActiveTab(active);
        SetActiveTab(active);
    });

    SetActiveTab(Gloomhaven.data.ActiveTab);
});