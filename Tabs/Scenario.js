var UpdateScenarioView = function() {
    $('#manual_scenario_start').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive == true);
    $('#scenario_view').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive != true);
    if (Gloomhaven.data.ScenarioIsActive) {
        var loc = Locations[Gloomhaven.data.ScenarioKey];
        var name = loc.Name;
        $('#scenario_view h1').text(Gloomhaven.data.ScenarioKey + ". " + name);
    
        var $list = $('#tile_list');
        $list.children('li:not(.template)').remove();
        for (var key in loc.Maps) {
            var clone = $list.find('.template').clone();
            clone.toggleClass('template', false);
            clone.find('img')[0].src = 'img/Tiles/'+loc.Maps[key]+'.png';
            clone.find('span').text(loc.Maps[key]);
            clone.appendTo($list);
        }

        var $list = $('#monster_list');
        $list.children('li:not(.template)').remove();
        for (var key in loc.Monsters)
        {
            var name = loc.Monsters[key].toLowerCase().replace(' ', '');
            var monster = Monsters[name];
            var clone = $list.find('.template').clone();
            var level = Gloomhaven.data.ScenarioLevel;
            var level_version = 'LowLevel';
            
            if (level > 3) {
                level_version = 'HighLevel';
                level = level - 4;
            }

            var level_rotate = 'lvl' + level;

            clone.toggleClass('template', false);
            clone.find('.avatar img')[0].src = 'img/Monsters/'+name+'.png';
            clone.find('.initiative img')[0].src = 'img/initiative_back.jpg';
            clone.find('.stats img')[0].src = monster[level_version];
            clone.find('.stats img').toggleClass(level_rotate);
            clone.find('span').text(loc.Monsters[key]);
            clone.data('id', name);
            clone.appendTo($list);
        }    

        // Populate active monster
        var $list = $('#active_monster');
        $list.children('li:not(.template)').remove();
        var key = Object.keys(Gloomhaven.data.ActiveMonsters)[0];
        var name = loc.Monsters[key].toLowerCase().replace(' ', '');
        var monster = Monsters[name];
        var clone = $list.find('.template').clone();
        var level = Gloomhaven.data.ScenarioLevel;
        var level_version = 'LowLevel';
        
        if (level > 3) {
            level_version = 'HighLevel';
            level = level - 4;
        }

        var level_rotate = 'lvl' + level;

        clone.toggleClass('template', false);
        clone.find('.initiative img')[0].src = 'img/initiative_back.jpg';
        clone.find('.stats img')[0].src = monster[level_version];
        clone.find('.stats img').toggleClass(level_rotate);
        clone.data('id', name);
        clone.appendTo($list);

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
        clone.find('button').data('content', name);
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
        Gloomhaven.StartRound();
    });

    $('#end_round').on('click', function() {
        Gloomhaven.EndRound();
    });

    $('#modifier_shuffle').on('click', function() {
        Gloomhaven.ShuffleModifierDeck();
    });


    var showDraws = function(result) {
        var $box = $('#modifier_deck_draws');
        $box.children('div:not(.template,.static)').remove();

        var clone = $box.find('.template').clone();
        clone.toggleClass('template', false);
        clone.toggleClass('selected', result.Selected == 0);
        clone.find('img')[0].src = result.Card1.Image;
        clone.appendTo($box);

        if (result.Card2) {
            var clone = $box.find('.template').clone();
            clone.toggleClass('template', false);
            clone.toggleClass('selected', result.Selected == 1);
            clone.find('img')[0].src = result.Card2.Image;
            clone.appendTo($box);    
        }   
    };

    $('#modifier_draw').on('click', function() {
        var result = Gloomhaven.DrawFromModifierDeck();
        showDraws(result);
    });

    $('#modifier_draw_adv').on('click', function() {
        var result = Gloomhaven.DrawFromModifierDeck(true, false);
        showDraws(result);
    });

    $('#modifier_draw_dis').on('click', function() {
        var result = Gloomhaven.DrawFromModifierDeck(false, true);
        showDraws(result);
    });

    $('#modifier_bless').on('click', function() {
        Gloomhaven.AddBless();
    });

    $('#modifier_curse').on('click', function() {
        Gloomhaven.AddCurse();
    });

    $('#add_elements .element').on('click', function() {
        var $this = $(this);
        if ($this.is('.fire'))
            Gloomhaven.CycleElement('Fire');
        if ($this.is('.green'))
            Gloomhaven.CycleElement('Green');
        if ($this.is('.snow'))
            Gloomhaven.CycleElement('Snow');
        if ($this.is('.sun'))
            Gloomhaven.CycleElement('Sun');
        if ($this.is('.wind'))
            Gloomhaven.CycleElement('Wind');
        if ($this.is('.night'))
            Gloomhaven.CycleElement('Night');
    });

    $('#add_elements').on('update', function() {
        var data = Gloomhaven.data.ActiveElements;
        var $this = $(this);
        $this.find('.element.fire').toggleClass('active', data['Fire'] == 2)
                                   .toggleClass('waning', data['Fire'] == 1)
                                   .toggleClass('disabled', !data['Fire']);

        $this.find('.element.green').toggleClass('active', data['Green'] == 2)
                                   .toggleClass('waning', data['Green'] == 1)
                                   .toggleClass('disabled', !data['Green']);

        $this.find('.element.snow').toggleClass('active', data['Snow'] == 2)
                                   .toggleClass('waning', data['Snow'] == 1)
                                   .toggleClass('disabled', !data['Snow']);

        $this.find('.element.sun').toggleClass('active', data['Sun'] == 2)
                                   .toggleClass('waning', data['Sun'] == 1)
                                   .toggleClass('disabled', !data['Sun']);

        $this.find('.element.wind').toggleClass('active', data['Wind'] == 2)
                                   .toggleClass('waning', data['Wind'] == 1)
                                   .toggleClass('disabled', !data['Wind']);

        $this.find('.element.night').toggleClass('active', data['Night'] == 2)
                                   .toggleClass('waning', data['Night'] == 1)
                                   .toggleClass('disabled', !data['Night']);
    });

    // Initialize
    UpdateScenarioView(Gloomhaven.data.ActiveTab);
    Persistent.Trigger('ActiveElements');

});