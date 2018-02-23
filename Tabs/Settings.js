$(function() {
 
    function download(content, filename, contentType)
    {
        if(!contentType) contentType = 'application/octet-stream';
            var a = document.createElement('a');
            var blob = new Blob([JSON.stringify(content)], {'type':contentType});
            a.href = window.URL.createObjectURL(blob);
            a.download = filename;
            a.click();
    }
    
    function upload($input, callback) 
    {
        $input[0].onchange = function(evt) {
            if(!window.FileReader) return; // Browser is not compatible    
            var reader = new FileReader();    
            reader.onload = function(evt) {
                if(evt.target.readyState != 2) return;
                if(evt.target.error) {
                    alert('Error while reading file');
                    return;
                }    
                filecontent = evt.target.result;    
                callback(evt.target.result);
            };    
            reader.readAsText(evt.target.files[0]);
        };        
    }
    
    $('#load_file_button').click(function() {
        $('#load_file').click();
    });

    $('#save_file_button').on('click', function() {
        download(Gloomhaven.data, Gloomhaven.data.Name + '.txt');
    });

    $('#refresh').on('click', function() {
        location.reload();
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

    $('#player_name').on('keyup', function(e) {
        if (e.originalEvent.keyCode == 13) {
            AddPlayer();
            $(this).val('').focus();
        }
    });


    $('#checkData').on('click', function() {
        var images = {};
        var tiles = {};
        for (var key in Locations) {
            for (var i = 0; i < Locations[key].Maps.length; i++) 
            {
                if (!tiles[Locations[key].Maps[i]]) tiles[Locations[key].Maps[i]] = 0;
                tiles[Locations[key].Maps[i]]++;
                images[Locations[key].Maps[i]] = 'img/Tiles/'+Locations[key].Maps[i]+'.png';
            }

            for (var i = 0; i <Locations[key].Monsters.length; i++) 
            {
                var name = Locations[key].Monsters[i].toLowerCase().replace(/ /g, '');
                var monster = Monsters[name];
                if (monster == undefined) {
                    console.log('cant find monster ', Locations[key].Monsters[i], name, key);
                    continue;
                }

                images[name] = 'img/Monsters/'+name+'.jpg';

                var cards = MonsterCards[monster.Cards];
                if (monster == undefined) {
                    console.log('cant find monster card ', monster.Cards, name, key);
                    continue;
                }

                for (var acard in cards) 
                    images[monster.Cards + acard] = cards[acard].Image;
        

               images[monster.Cards + 'low'] = cards[acard].LowLevel;
               images[monster.Cards + 'high'] = cards[acard].HighLevel;                
            }
        }

        var nextLocations = {};
        for (var key in Gloomhaven.data.AvailibleLocations) {
            nextLocations[key] = true;
            for (var i in Locations[key].Next) 
                nextLocations[Locations[key].Next[i]] = true;
        }
        var nextMonsters = {};
        for (var key in nextLocations) {
            for (var i in Locations[key].Monsters) {
                var type = Locations[key].Monsters[i].toLowerCase().replace(/ /g, '');
                nextMonsters[type] = true;
            }
        }
        for (var key in nextMonsters) {
            if (Monsters[key].Boss == undefined && Monsters[key].Normal.Attack == undefined)
                console.log('Missing stats for monster ', key);
            var cards = MonsterCards[Monsters[key].Cards];
            for (var acard in cards) 
                if (!cards[acard].Initiative) {
                    console.log('Missing initiative cards of type ', Monsters[key].Cards, key);
                    break;
                }
        }

        var imagesToLoad = [];
        for (var k in images)
            if (k.length)
                imagesToLoad.push(images[k]);

          var tmpImg = new Image() ;
          tmpImg.src = imagesToLoad.pop();
          tmpImg.onload = function() {
              var src = imagesToLoad.pop();
              if (src == undefined) return;
              tmpImg.src = src;
          };
    });
});