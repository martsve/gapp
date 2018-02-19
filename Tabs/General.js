function AddPlayer() {
    var name = $('#player_name').val();
    if (name.length == 0 || Gloomhaven.data.PlayerList[name])  
        return;
    Gloomhaven.AddPlayer(name);
    $('#scenario_level').trigger('update');
    AddPlayerToDom(name, 1);
}

var AddPlayerToDom = function(name, level) {
    var clone = $('#level_list .template').clone();
    clone.toggleClass('template');
    clone.find('.player_name').text(name);
    clone.find('.level').val(level);
    clone.find('.equip').text(Math.ceil(level/2));
    clone.appendTo($('#level_list'));
}

$(function() {

    $('#player_name').on('keyup', function(e) {
        if (e.originalEvent.keyCode == 13) {
            AddPlayer();
            $(this).val('').focus();
        }
    });

    $('#level_list').on('click', '.remove', function() {
        var $li = $(this).closest('li');
        var name = $li.find('.player_name').text();
        Gloomhaven.RemovePlayer(name);
        $('#scenario_level').trigger('update');
        $li.remove();
    });

    $('#level_list').on('click', '.up', function() {
        var $li = $(this).closest('li');
        var name = $li.find('.player_name').text();
        var level = Gloomhaven.data.PlayerList[name].level + 1;
        if (level > 9) 
            level = 9;
        Gloomhaven.UpdateLevel(name, level);
        $li.find('.equip').text(Math.ceil(level/2));
        $li.find('.level').val(level);
        $('#scenario_level').trigger('update');
    });

    $('#level_list').on('click', '.down', function() {
        var $li = $(this).closest('li');
        var name = $li.find('.player_name').text();
        var level = Gloomhaven.data.PlayerList[name].level - 1;
        if (level < 0) 
            level = 0;
        Gloomhaven.UpdateLevel(name, level);
        $li.find('.equip').text(Math.ceil(level/2));
        $li.find('.level').val(level);
        $('#scenario_level').trigger('update');
    });

    $('#level_list').on('keyup blur', '.level', function() {
        var $li = $(this).closest('li');
        var name = $li.find('.player_name').text();
        var level = parseInt($(this).val());
        if (level > 0) {
            $li.find('.equip').text(Math.ceil(level/2));
            Gloomhaven.UpdateLevel(name, level);
            $('#scenario_level').trigger('update');
        }
    });

    $('#reputation_content').on('click', '.up', function() {
        Gloomhaven.CheckReputationLevel(function(msg) { alert(msg); });
    });
    
    $('#reputation_content').on('click', '.down', function() {
        Gloomhaven.CheckReputationLevel(function(msg) { alert(msg); });
    });

    $('#donations_content').on('click', '.up', function() {
        Gloomhaven.CheckDonations(function(){
            alert('Donated 100g total! Open letter B!');
        })
    });    

    for (var key in Gloomhaven.data.PlayerList) {
        AddPlayerToDom(key, Gloomhaven.data.PlayerList[key].level);
    }
});