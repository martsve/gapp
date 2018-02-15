$(function() {
    $('#add_player').on('click', function() {
        var name = $('#player_name').val();
        if (name.length == 0 || playerList[name])  
            return;
        Gloomhaven.AddPlayer($('#player_name').val());
    });

    $('#level_list').on('click', 'button.remove', function() {
        var $li = $(this).parent('li');
        var name = $li.find('.player_name').text();
        Gloomhaven.RemovePlayer(name, $li);
    });

    $('#level_list').on('keyup', '.level', function() {
        var $li = $(this).parent('li');
        var name = $li.find('.player_name').text();
        var level = parseInt($(this).val());
        Gloomhaven.UpdateLevel(name, level);
    });

    Gloomhaven.LoadPlayers();
    Gloomhaven.UpdateLevelInfo();
});