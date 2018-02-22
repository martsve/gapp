$(function() {
    var CreateMonsterStatsObject = function(monster, level, $template) {
        var obj = $template.clone();
        obj.toggleClass('template', false);

        console.log(monster.Key, Gloomhaven.data.Monsters);
        var initiative = Gloomhaven.data.Monsters[monster.Key] ? Gloomhaven.data.Monsters[monster.Key].ActiveCard : null;

        var table = GetSimpleStatTable(monster, initiative, level);

        console.log(table);
        
        for (var i = 0; i < table.length; i++) {
            var item = table[i];
            var row = obj.find('.template').clone();
            row.toggleClass('template', false);
            row.find('.c-header').html(item.Header);
            row.find('.c-normal').html(item.Normal);
            row.find('.c-elite').html(item.Elite);
            row.appendTo(obj);
        }

        var image = 'img/Monsters/'+monster.Key+'.png';
        
        obj.find('.c-name').text(monster.Name);
        obj.find('.c-img').text(image);
        obj.data('id', monster.Key);

        return obj;
    };


    var CreateMonsterStatsList = function() {

        if (Gloomhaven.data.ScenarioIsActive) {
            var location = Locations[Gloomhaven.data.ScenarioKey];

            var $list = $('#monsterStatsList');
            $list.children('li:not(.template)').remove();
            var $template = $list.children('.template');
            for (var i in location.Monsters)
            {
                var key = location.Monsters[i].toLowerCase().replace(' ', '');
                var monster = Monsters[key];
                monster.Key = key;
                var clone = CreateMonsterStatsObject(monster, Gloomhaven.data.ScenarioLevel, $template);
                clone.appendTo($list);
            }    
    
        }   

    };

    CreateMonsterStatsList();

});