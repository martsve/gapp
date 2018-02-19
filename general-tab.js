/**/
var AddPlayerToDom = function(name, level) {
    var clone = $('#level_list .template').clone();
    clone.toggleClass('template');
    clone.find('.player_name').text(name);
    clone.find('.level').val(level);
    clone.find('.equip').text(Math.ceil(level/2));
    clone.appendTo($('#level_list'));
}

var UpdateScenarioLevel = function() {
    $('#scenario_level').val(Gloomhaven.data.ScenarioLevel);
}

function AddPlayerList() {
    for (var key in Gloomhaven.data.PlayerList) {
        AddPlayerToDom(key, Gloomhaven.data.PlayerList[key].level);
    }
}

$(function() {

    $('#add_player').on('click', function() {
        var name = $('#player_name').val();
        if (name.length == 0 || Gloomhaven.data.PlayerList[name])  
            return;
        Gloomhaven.AddPlayer(name);
        UpdateScenarioLevel();
        AddPlayerToDom(name,1);
    });

    $('#level_list').on('click', 'button.remove', function() {
        var $li = $(this).parent('li');
        var name = $li.find('.player_name').text();
        Gloomhaven.RemovePlayer(name);
        UpdateScenarioLevel();
        $li.remove();
    });

    $('#level_list').on('keyup blur', '.level', function() {
        var $li = $(this).parent('li');
        var name = $li.find('.player_name').text();
        var level = parseInt($(this).val());
        if (level > 0) {
            $li.find('.equip').text(Math.ceil(level/2));
            Gloomhaven.UpdateLevel(name, level);
            UpdateScenarioLevel();
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

});