var AddPlayerToDom = function(name, level) {
    var clone = $('#level_list .template').clone();
    clone.toggleClass('template');
    clone.find('.player_name').text(name);
    clone.find('.level').val(level);
    clone.appendTo($('#level_list'));
}

var UpdateScenarioLevel = function() {
    $('#scenario_level').val(Gloomhaven.GetScenarioLevel());
} 

var SetActiveTab = function(active) {
    if ($('#'+active).length == 0) {
        active = 'general-tab';
    }
    $('#tab-selection a[data-tab]').each(function(){
        var id = $(this).data('tab');
        var $target = $('#'+$(this).data('tab'));
        $target.toggleClass('d-none', active != id);
    });
}

$(function() {
    $('#gameName').on('keyup blur', function() {
        Gloomhaven.SetName($(this).val());
    });

    $('#tab-selection a[data-tab]').on('click', function() {
        var active = $(this).data('tab');
        Gloomhaven.SetActiveTab(active);
        SetActiveTab(active);
    });

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
        Gloomhaven.UpdateLevel(name, level);
        UpdateScenarioLevel();
    });

    $('#load_file_button').click(function() {
        $('#load_file').click();
    });

    $('#reputation_content').on('click', '.up', function() {
        Gloomhaven.IncreaseReputationLevel(1);
        $('#reputation_level').val(Gloomhaven.data.Reputation);
        $('#reputation_price').val(Gloomhaven.GetReputationPrice());
    });
    
    $('#reputation_content').on('click', '.down', function() {
        Gloomhaven.IncreaseReputationLevel(-1)
        $('#reputation_level').val(Gloomhaven.data.Reputation);
        $('#reputation_price').val(Gloomhaven.GetReputationPrice());
    });
    
    $('#properity_content').on('click', '.up', function() {
        Gloomhaven.IncreaseProsperity(1)
        $('#prosperity_number').val(Gloomhaven.data.Prosperity);
        $('#prosperity_level').val(Gloomhaven.GetProsperityLevel());
    });
    
    $('#properity_content').on('click', '.down', function() {
        Gloomhaven.IncreaseProsperity(-1)
        $('#prosperity_number').val(Gloomhaven.data.Prosperity);
        $('#prosperity_level').val(Gloomhaven.GetProsperityLevel());
    });

    $('#donations_content').on('click', '.up', function() {
        Gloomhaven.IncreaseDonations(10, function(){
            alert('Open letter B!');
        })
        $('#donations').val(Gloomhaven.data.Donations);
    });
    
    $('#donations_content').on('click', '.down', function() {
        Gloomhaven.IncreaseDonations(-10, function(){})
        $('#donations').val(Gloomhaven.data.Donations);
    });

    $('#difficulty button').on('click', function() {
        Gloomhaven.SetDifficulty(parseInt($(this).data('val')));
        $('#difficulty button').toggleClass('selected', false);
        $(this).toggleClass('selected', true);
        UpdateScenarioLevel();
    });

    $('#save_file_button').on('click', function() {
        download(Gloomhaven.data, Gloomhaven.data.Name + '.txt');
    });

    upload($('#load_file'), function(data) {
        Gloomhaven.LoadData(JSON.parse(data));
    });

    $('#clear').on('click', function() {
        if (confirm("Are you sure you want to clear all data?")) {
            localStorage.clear();
            window.location.reload();        
        }
    });

    // Initialize
    SetActiveTab(Gloomhaven.data.ActiveTab);

    for (var key in Gloomhaven.data.PlayerList) {
        AddPlayerToDom(key, Gloomhaven.data.PlayerList[key].level);
    }

    $('#gameName').val(Gloomhaven.data.Name);
    $('#reputation_level').val(Gloomhaven.data.Reputation);
    $('#reputation_price').val(Gloomhaven.GetReputationPrice());
    
    $('#prosperity_level').val(Gloomhaven.GetProsperityLevel());
    $('#prosperity_number').val(Gloomhaven.data.Prosperity);  

    $('#prosperity_number').val(Gloomhaven.data.Prosperity);  

    $('#donations').val(Gloomhaven.data.Donations);
    
    $('#difficulty button[data-val="'+Gloomhaven.data.Difficulty+'"]').toggleClass('selected', true);

    UpdateScenarioLevel();
});