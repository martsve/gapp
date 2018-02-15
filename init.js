$(function() {
    $('#add_player').on('click', function() {
        var name = $('#player_name').val();
        if (name.length == 0 || Gloomhaven.GetPlayerList()[name])  
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

    $('#load_file_button').click(function() {
        $('#load_file').click();
    });

    $('#reputation_content').on('click', '.up', function() {
        $('#reputation_level').val(Gloomhaven.IncreaseReputationLevel(1));
        $('#reputation_price').val(Gloomhaven.GetReputationPrice());
    });
    
    $('#reputation_content').on('click', '.down', function() {
        $('#reputation_level').val(Gloomhaven.IncreaseReputationLevel(-1));
        $('#reputation_price').val(Gloomhaven.GetReputationPrice());
    });
    
    $('#properity_content').on('click', '.up', function() {
        $('#prosperity_number').val(Gloomhaven.IncreaseProsperity(1));
        $('#prosperity_level').val(Gloomhaven.GetProsperityLevel());
    });
    
    $('#properity_content').on('click', '.down', function() {
        $('#prosperity_number').val(Gloomhaven.IncreaseProsperity(-1));
        $('#prosperity_level').val(Gloomhaven.GetProsperityLevel());
    });

    $('#donations_content').on('click', '.up', function() {
        $('#donations').val(Gloomhaven.IncreaseDonations(10, function(){
            alert('Open letter B!');
        }));
    });
    
    $('#donations_content').on('click', '.down', function() {
        $('#donations').val(Gloomhaven.IncreaseDonations(-10, function(){}));
    });

    $('#difficulty button').on('click', function() {
        Gloomhaven.SetDifficulty(parseInt($(this).data('val')));
        $('#difficulty button').toggleClass('selected', false);
        $(this).toggleClass('selected', true);
    });

    $('#save_file_button').on('click', function() {
        download(Gloomhaven.GetData(), Gloomhaven.Name() + '.txt');
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

    Gloomhaven.Initialize();

    $('#reputation_level').val(Gloomhaven.ReputationLevel());
    $('#reputation_price').val(Gloomhaven.GetReputationPrice());
    
    $('#prosperity_level').val(Gloomhaven.GetProsperityLevel());
    $('#prosperity_number').val(Gloomhaven.IncreaseProsperity(0));  

    $('#prosperity_number').val(Gloomhaven.IncreaseProsperity(0));  

    $('#donations').val(Gloomhaven.GetDonations());
    
    var difficulty = Gloomhaven.GetDifficulty();
    $('#difficulty button[data-val="'+difficulty+'"]').toggleClass('selected', true);

});