var Gloomhaven = {};
(function(self) { 

    var playerList = {};

    self.AddPlayerToDom = function(name, level) {
        var clone = $('#level_list .template').clone();
        clone.toggleClass('template');
        clone.find('.player_name').text(name);
        clone.find('.level').val(level);
        clone.appendTo($('#level_list'));
    }

    self.SavePlayerList = function() {
        var item = JSON.stringify(playerList);
        localStorage.setItem("players", item);
    }

    self.AddPlayer = function(name) {
        var level = 1;
        self.AddPlayerToDom(name, level);

        playerList[name] = { level: level };
        self.SavePlayerList();
        self.UpdateLevelInfo();
    }

    self.RemovePlayer = function(name, $domObject) {
        delete playerList[name];
        self.SavePlayerList();
        self.UpdateLevelInfo();
        $domObject.remove();
    }

    self.UpdateLevel = function(name, level) {
        playerList[name].level = level;
        self.UpdateLevelInfo();
        self.SavePlayerList();
    }

    self.LoadPlayers = function() {
        var players = localStorage.getItem("players");

        if (players) {
            playerList = JSON.parse(players);
        }

        for (var key in playerList) {
            var item = playerList[key];
            self.AddPlayerToDom(key, item['level']);
        }
    }

    self.UpdateLevelInfo = function() {
        var level = 0;
        var N = Object.keys(playerList).length;
        for (var key in playerList) {
            var item = playerList[key];
            level = level + item['level'];
        }
        level = Math.ceil(level / (N * 2));
        $('#scenario_level').val(level);
    }

})(Gloomhaven);