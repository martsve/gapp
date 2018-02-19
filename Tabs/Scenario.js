var UpdateScenarioView = function() {
    $('#manual_scenario_start').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive == true);
    $('#scenario_view').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive != true);
    if (Gloomhaven.data.ScenarioIsActive) {
        var loc = Locations[Gloomhaven.data.ScenarioKey];
        var name = loc.Name;
        $('#scenario_view h1').text(name);
    
        var $list = $('#tile_list');
        for (var key in loc.Maps) {
            var clone = $list.find('.template').clone();
            clone.toggleClass('template', false);
            clone.find('img')[0].src = 'img/Tiles/'+loc.Maps[key]+'.png';
            clone.find('span').text(loc.Maps[key]);
            clone.appendTo($list);
        }

        var $list = $('#monster_list');
        for (var key in loc.Monsters)
        {
            var name = loc.Monsters[key].toLowerCase().replace(' ', '');
            var clone = $list.find('.template').clone();
            clone.toggleClass('template', false);
            clone.find('img')[0].src = 'img/Monsters/'+name+'.png';
            clone.find('span').text(loc.Monsters[key]);
            clone.data('id', name);
            clone.appendTo($list);
        }

        PopulateActiveMonsterList();
    }   

    SetActiveTab(Gloomhaven.data.ActiveTab);
};

var PopulateActiveMonsterList = function() {
    var $list = $('#active_monster_list');
    $list.find('li:not(.template)').remove();
    for (var item in Gloomhaven.data.ActiveMonsters)
    {
        if (Gloomhaven.data.ActiveMonsters[item] == null) continue;

        var name = Gloomhaven.data.ActiveMonsters[item].Name;
        var key = Gloomhaven.data.ActiveMonsters[item].Id;
        var clone = $list.find('.template').clone();
        clone.toggleClass('template', false);
        clone.find('img')[0].src = 'img/Monsters/'+key+'.png';
        clone.find('span').text(name);
        clone.data('id', item);
        clone.appendTo($list);
    }
}

$(function() {

    $('#complete_scenario').on('click', function(){
        var key = Gloomhaven.data.ScenarioKey;
        var name = Locations[key].Name;
        if (confirm('Are you sure you have completed #'+ key +' "'+ name+'"?'))
        {
            Gloomhaven.CompleteLocation(key);
            PopulateLocations();
            UpdateScenarioView();
        }
    });
    
    $('#quit_scenario').on('click', function(){
        var key = Gloomhaven.data.ScenarioKey;
        var name = Locations[key].Name;
        if (confirm('Are you sure you want to quit scenario #'+ key +' "'+ name+'"?'))
        {
            Gloomhaven.QuitScenario();
            PopulateLocations();
            UpdateScenarioView();
        }
    });
    
    $('#start_scenario').on('click', function() {
        var key = $('#scenario_key').val();
        var name = Locations[key].Name;
        if (confirm('You will now start scenario #'+ key +' "'+ name+'"')) {            
            Gloomhaven.StartScenario(key);
            UpdateScenarioView();
        }
    });

    var $loc = $('#scenario_key');
    for (var key in Locations) {
        $loc.append($('<option>', {
            value: key,
            text: key+". "+ Locations[key].Name
        }));
    }

    $('#monster_list').on('click', 'li .add', function() {
        var type = $(this).closest('li').data('id');
        Gloomhaven.AddActiveMonster(type);
        PopulateActiveMonsterList();
    });    

    $('#active_monster_list').on('click', 'li .remove', function() {
        var key = $(this).closest('li').data('id');
        Gloomhaven.RemoveActiveMonster(key);
        PopulateActiveMonsterList();
    });    

    $('#start_new_round').on('click', function() {
        // perform round stuff
    });

    // Initialize
    UpdateScenarioView(Gloomhaven.data.ActiveTab);

});