$(function() {

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

    $('#status_modal #remove_monster').on('click', function() {
        var key = $(this).closest('.modal').data('content');
        $(this).closest('.modal').trigger('closeModal');
        Gloomhaven.RemoveActiveMonster(key);
    });

    $('#status_modal #drawModifier').on('click', function() {
        var $modal = $(this).closest('.modal');
        var key = $modal.data('content');

        var statuses = Gloomhaven.data.ActiveStatuses[key] || {};
        var adv = !!statuses.Strengthen;
        var dis = !!statuses.Muddled;
        var result = Gloomhaven.DrawFromModifierDeck(adv, dis);

        var activeMonster = Gloomhaven.data.ActiveMonsters[key];
        var id = activeMonster.Id;
        var initiative = Gloomhaven.data.Monsters[id] ? Gloomhaven.data.Monsters[id].ActiveCard : null;

        var table = GetStatsOutcome(Monsters[id], initiative, activeMonster.Elite, Gloomhaven.data.ScenarioLevel, result.Result);

        console.log(result, table);
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

    $('#end_round').on('click', function() {
        Gloomhaven.EndRound();
        window.scrollTo(0, 0);
    });

    $('#GotoNextMonsterTurn').on('click', function() {
        Gloomhaven.GotoNextMonsterTurn();
    });

    $('#monsterStatsList').on('update', function() {
        CreateMonsterStatsList();
    });

    $('#monsterStatsList .template').on('update', function() {
        CreateMonsterStatsList(true);
    });

    var CreateActiveMonsterList = function(monster, obj) {
        var $list = obj.find('.activeMonsters');
        $list.find('li:not(.template)').remove();
        for (var i in Gloomhaven.data.ActiveMonsterOrder)
        {
            var name = Gloomhaven.data.ActiveMonsterOrder[i];
            var item = Gloomhaven.data.ActiveMonsters[name]; 
            var key = item.Id;
            if (key == monster.Key) {
                var clone = $list.find('.template').clone();
                clone.toggleClass('template', false);
                clone.toggleClass('elite', item.Elite);
                clone.toggleClass('summon', item.Summon);
                clone.toggleClass('active', name == Gloomhaven.data.ActiveMonster);
                clone.find('.number').text(item.Number);
                clone.data('id', name);
                clone.find('button').data('content', name);
                clone.appendTo($list);
            }
        }
    }

    var UpdateMonsterStatsObject = function(monster, level, initiative, obj) {
        var table = GetSimpleStatTable(monster, initiative, level);

        for (var i = 0; i < table.length; i++) {
            var item = table[i];
            if (item.Normal == item.Elite && item.Normal.length == 0) continue;
            var row = obj.find('.c-row .template').clone();
            row.toggleClass('template', false);
            row.find('.c-header').html(item.Header);
            if (item.Normal == item.Elite && item.Normal.length > 5) {
                row.find('.c-same').html(item.Normal).toggleClass('d-none', false);
                row.find('.c-normal').toggleClass('d-none', true);
                row.find('.c-elite').toggleClass('d-none', true);
            } else {
                row.find('.c-normal').html(item.Normal);
                row.find('.c-elite').html(item.Elite);
            }
            row.find('.c-initiative').html(item.Initiative);
            row.appendTo(obj.find('.c-row'));
        }
                
        for (var i = 0; i < table.length; i++) {
            var item = table[i];
            if (item.Initiative.length == 0) continue;
            var row = obj.find('.initiative .template').clone();
            row.toggleClass('template', false);
            if (item.Key == "Initiative") row.toggleClass("init-number", true);
            if (item.Key == "Shuffle") row.toggleClass("shuffle", true);

            if (item.Key == "Initiative")  {
                row.toggleClass("init-number", true);
                row.find('.c-initiative').html(item.Initiative);
            }
            else 
                row.find('.c-initiative').html(item.Header + " " + item.Initiative);
            row.appendTo(obj.find('.initiative'));
        }
    }

    var CreateMonsterStatsObject = function(monster, level, initiative, $template) {
        var obj = $template.clone();
        obj.toggleClass('template', false);
        obj.toggleClass(monster.Key, true);

        UpdateMonsterStatsObject(monster, level, initiative, obj);

        CreateActiveMonsterList(monster, obj);

        var image = 'img/Monsters/'+monster.Key+'.jpg';
        
        obj.find('.c-name').text(monster.Name);
        obj.find('.c-img img').attr('src', image);
        obj.data('id', monster.Key);

        return obj;
    };


    var CreateMonsterStatsList = function(skipRemove) {
        if (Gloomhaven.data.ScenarioIsActive) {
            var location = Locations[Gloomhaven.data.ScenarioKey];

            var $list = $('#monsterStatsList');
            if (!skipRemove)
                $list.children('li:not(.template)').remove();
            var $template = $list.children('.template');

            var activeMonsterTypes = {};
            for (var name in Gloomhaven.data.ActiveMonsters) {
                var key = Gloomhaven.data.ActiveMonsters[name].Id;
                activeMonsterTypes[key] = true;
            }
            
            var keyValues = [];
            for (var i in location.Monsters)  {
                var key = location.Monsters[i].toLowerCase().replace(/ /g, '');
                if (activeMonsterTypes[key]) {
                    var initiative = Gloomhaven.data.Monsters[key] ? Gloomhaven.data.Monsters[key].ActiveCard : null;
                    keyValues.push([ key, initiative ? initiative.Initiative : 0 ])
                }
            }
            keyValues.sort(function compare(kv1, kv2) { return kv1[1] - kv2[1] });

            for (var i = 0; i < keyValues.length; i++)  {
                var key = keyValues[i][0];               
                var initiative = Gloomhaven.data.Monsters[key] ? Gloomhaven.data.Monsters[key].ActiveCard : null;
                Monsters[key].Key = key;
                var $existing = $list.children("li."+key);
                if ($existing.length) {
                    UpdateMonsterStatsObject(Monsters[key], Gloomhaven.data.ScenarioLevel, initiative, $existing);
                }
                else {
                    var clone = CreateMonsterStatsObject(Monsters[key], Gloomhaven.data.ScenarioLevel, initiative, $template);
                    clone.appendTo($list);
                }
            }    
    
        }   

    };

    Persistent.Trigger('ActiveMonster');
    Persistent.Trigger('ActiveElements');
});