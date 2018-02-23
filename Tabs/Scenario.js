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
            var name = loc.Monsters[key].toLowerCase().replace(/ /g, '');
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
            clone.find('.avatar img')[0].src = 'img/Monsters/'+name+'.jpg';
            clone.find('.stats img').toggleClass(level_rotate);
            clone.find('.name').text(loc.Monsters[key]);
            clone.data('id', name);
            clone.appendTo($list);
        }    

    }   

    SetActiveTab(Gloomhaven.data.ActiveTab);
};


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

function ShowPluss($div) {
    var obj = $('<img class="addSuccess" src="img/icons/pluss.png">');
    obj.appendTo($div);
    setTimeout(function() {
        obj.remove();
    }, 500);
};

$('#monster_list').on('click', 'li .addNormal', function() {
    ShowPluss($(this).parent());
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, false, false);
});    

$('#monster_list').on('click', 'li .addElite', function() {
    ShowPluss($(this).parent());
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, true, false);
});    

$('#monster_list').on('click', 'li .addSummon', function() {
    ShowPluss($(this).parent());
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, false, true);
});    
$('#monster_list').on('click', 'li .addEliteSummon', function() {
    ShowPluss($(this).parent());
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, true, true);
});    

$('#active_monster_list').on('click', 'li .remove', function() {
    var key = $(this).closest('li').data('id');
    Gloomhaven.RemoveActiveMonster(key);
});    

$('#modifier_shuffle').on('click', function() {
    Gloomhaven.ShuffleModifierDeck();
});                

var showDraws = function(result, target) {
    var $box = $('#modifier_deck_draws');
    target.find('.modifier_cards:not(.template,.static)').remove();
    var clone = $box.find('.modifier_cards.template').clone();
    clone.toggleClass('template', false);

    clone.find('.card1').toggleClass('d-none', !result.Card1).toggleClass('selected', result.Selected == 0);
    clone.find('.card2').toggleClass('d-none', !result.Card2).toggleClass('selected', result.Selected == 1);

    if (result.Card1) clone.find('.card1 .card img')[0].src = result.Card1.Image;
    if (result.Card2) clone.find('.card2 .card img')[0].src = result.Card2.Image;

    var resultCard = result.Selected == 0 ? result.Card1 : result.Card2;
    var value = resultCard.Value;

    clone.find('.result').text("Value: " + ((value == 3 || value == -3) ? resultCard['Type'] : value));

    clone.appendTo(target);
};

$('#modifier_draw').on('click', function() {
    var result = Gloomhaven.DrawFromModifierDeck();
    showDraws(result, $('#modifier_deck_draws'));
});

$('#modifier_draw_adv').on('click', function() {
    var result = Gloomhaven.DrawFromModifierDeck(true, false);
    showDraws(result, $('#modifier_deck_draws'));
});

$('#modifier_draw_dis').on('click', function() {
    var result = Gloomhaven.DrawFromModifierDeck(false, true);
    showDraws(result, $('#modifier_deck_draws'));
});

$('#modifier_bless').on('click', function() {
    Gloomhaven.AddBless();
});

$('#modifier_curse').on('click', function() {
    Gloomhaven.AddCurse();
});

$('#ActiveMonsterOrder').on('update', function() {
    var $list = $('#active_monster_list');
    $list.children('li').toggleClass('active', false);
    var active = Gloomhaven.data.ActiveMonster;
    if (active) {
        var current = $list.find('li').each(function() {
            if ($(this).data('id') == active) {
                $(this).toggleClass('active', true);
            }
        });
    }
    PopulateActiveMonster();
});

var PopulateActiveMonster = function() {
    var $list = $('#active_monster');
    $list.children('li:not(.template)').remove();
    var activeMonsterId = Gloomhaven.data.ActiveMonster;
    if (activeMonsterId) {
        var name = Gloomhaven.data.ActiveMonsters[activeMonsterId].Id;
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
            
        $('#active_monster_list .active').clone().appendTo(clone.find('.avatar'));

        clone.find('.drawModifiers').data('id', activeMonsterId);
        clone.data('id', activeMonsterId);
        clone.find('.avatar li button').data('content', activeMonsterId);

        clone.appendTo($list);
    }
};

$(function() {    
    var $loc = $('#scenario_key');
    for (var key in Locations) {
        $loc.append($('<option>', {
            value: key,
            text: key+". "+ Locations[key].Name
        }));
    }

    // Initialize
    UpdateScenarioView(Gloomhaven.data.ActiveTab);

    Persistent.Trigger('ActiveMonsterOrder');
    Persistent.Trigger('ActiveElements');
    Persistent.Trigger('ActiveStatuses');
});