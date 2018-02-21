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

    }   

    SetActiveTab(Gloomhaven.data.ActiveTab);
};

$('#active_monster_list').on('update', function() {
    var $list = $('#active_monster_list');
    $list.find('li:not(.template)').remove();
    for (var i in Gloomhaven.data.ActiveMonsterOrder)
    {
        var item = Gloomhaven.data.ActiveMonsterOrder[i];
        var name = Gloomhaven.data.ActiveMonsters[item].Name;
        var number = Gloomhaven.data.ActiveMonsters[item].Number;
        var key = Gloomhaven.data.ActiveMonsters[item].Id;
        var clone = $list.find('.template').clone();
        clone.toggleClass('template', false);
        clone.toggleClass('elite', Gloomhaven.data.ActiveMonsters[item].Elite);
        clone.toggleClass('summon', Gloomhaven.data.ActiveMonsters[item].Summon);
        clone.find('img')[0].src = 'img/Monsters/'+key+'.png';
        clone.find('.name').text(name);
        clone.find('.number').text(number);
        clone.data('id', item);
        clone.find('button').data('content', item);
        clone.appendTo($list);
    }
    Persistent.Trigger('ActiveMonster');
});


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

$('#monster_list').on('click', 'li .addNormal', function() {
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, false, false);
});    

$('#monster_list').on('click', 'li .addElite', function() {
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, true, false);
});    

$('#monster_list').on('click', 'li .addSummon', function() {
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, false, true);
});    
$('#monster_list').on('click', 'li .addEliteSummon', function() {
    var type = $(this).closest('li').data('id');
    Gloomhaven.AddActiveMonster(type, true, true);
});    

$('#active_monster_list').on('click', 'li .remove', function() {
    var key = $(this).closest('li').data('id');
    Gloomhaven.RemoveActiveMonster(key);
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

$('#add_elements .element').on('click', function() {
    var $this = $(this);
    var element = $this.data('element');
    Gloomhaven.CycleElement(element);
});

$('#add_elements').on('update', function() {
    var data = Gloomhaven.data.ActiveElements;
    var $this = $(this);
        
    for (var key in data)
    {
        $this.find('.element[data-element="'+key+'"]').toggleClass('active', data[key] == 2)
            .toggleClass('waning', data[key] == 1)
            .toggleClass('disabled', !data[key]);
    }
});

$('#add_status .status').on('click', function() {
    var $this = $(this);
    var key = $(this).closest('.modal').data('content');
    console.log(key);
    var status = $this.data('status');
    var currentStatus = Gloomhaven.data.ActiveStatuses[key] || {};
    if (currentStatus[status]) {
        Gloomhaven.RemoveMonsterStatus(key, status);
    }
    else {
        Gloomhaven.SetMonsterStatus(key, status);
    }
});    

$('#status_modal').on('openModal', function() {
    Persistent.Trigger('ActiveStatuses');
});

$('#status_modal').on('update', function() {
    var key = $(this).data('content');
    var status = Gloomhaven.data.ActiveStatuses[key] || {};
    $('#add_status .status').toggleClass('inactive', true);
    for (var type in status)  {
        $(this).find('.status[data-status="'+type+'"]').toggleClass('inactive', false);
    }
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

        if (Gloomhaven.data.Monsters[name].ActiveCard) 
            clone.find('.initiative img.initCard')[0].src = Gloomhaven.data.Monsters[name].ActiveCard.Image;
        else 
            clone.find('.initiative img.initCard')[0].src = 'img/initiative_back.jpg';
            
        clone.find('.stats img.statCard')[0].src = monster[level_version];
        clone.find('.stats img.statCard').toggleClass(level_rotate);

        $('#active_monster_list .active').clone().appendTo(clone.find('.avatar'));

        clone.find('.drawModifiers').data('id', activeMonsterId);
        clone.data('id', activeMonsterId);
        clone.find('.avatar li button').data('content', activeMonsterId);

        clone.appendTo($list);

        ShowTotalStatsText();
    }
};

var ShowTotalStatsText = function(modifier) {
    var activeMonsterId = Gloomhaven.data.ActiveMonster;
    if (activeMonsterId) {
        var name = Gloomhaven.data.ActiveMonsters[activeMonsterId].Id;
        var monster = Monsters[name];
        var initiative = Gloomhaven.data.Monsters[name].ActiveCard;
        var table = GetStatTable(initiative, monster, Gloomhaven.data.ActiveMonsters[activeMonsterId].Elite, Gloomhaven.data.ScenarioLevel, modifier);

        var keyValues = [];
        for (var key in table) 
            keyValues.push([ key, StatOrderFromKey(key) ])
        keyValues.sort(function compare(kv1, kv2) { return kv1[1] - kv2[1] });
    
        var html = "<div class='row w8'><div class='w1'></div><div class='w1'>Stats</div><div class='w2'>Initiative</div><div class='w2'>Total</div><div class='w2'>Modifier</div></div>";
        for (var i = 0; i < keyValues.length; i++) {
            var key = keyValues[i][0];
            html += "<div class='row w8'><div class='w1'>"+table[key].Header+"</div><div class='w1'>"+table[key].Stats+"</div><div class='w2'>"+table[key].Init+"</div><div class='w2'>"+table[key].Total+"</div><div class='w2'>"+table[key].Modified+"</div></div>";
        }
        html = StatsTextToImages(html);

        $(".totalStatsText").html(html);
    }
    else {
        $(".totalStatsText").html('');
    }
};

$('#active_monster').on('click', '.drawModifiers', function() {
    var key = $(this).data('id');
    var statuses = Gloomhaven.data.ActiveStatuses[key] || {};
    var adv = !!statuses.Strengthen;
    var dis = !!statuses.Muddled;
    var result = Gloomhaven.DrawFromModifierDeck(adv, dis);
    ShowTotalStatsText(result.Result);
    showDraws(result, $('#active_monster'));
});

$('#GotoNextMonsterTurn').on('click', function() {
    Gloomhaven.GotoNextMonsterTurn();
});

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