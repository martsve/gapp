var Gloomhaven = {};
(function(self) { 

    var playerList = {};
    var reputation = 0;
    var prosperity = 0;

    self.GetData = function() { 
        return {
            "playerList": playerList,
            "reputation": reputation,
            "prosperity": prosperity,
        };
    };

    self.GetPlayerList = function() { return playerList ;};
    self.ReputationLevel = function() { return reputation; };
    self.GetReputationPrice = function() { 
        return reputation == 0 ? 0 : -1*(reputation / Math.abs(reputation) *  Math.ceil( Math.abs(reputation) / 5));
    };
    self.GetProsperityLevel = function() {
        return Math.floor(prosperity / 5);
    };

    self.LoadData = function(data) { 
        playerList = data.playerList;
        reputation = data.reputation;
        prosperity = data.prosperity;

        self.SaveAll();
        window.location.reload();
    };

    self.SaveAll = function() {
        self.SavePlayerList();

        localStorage.setItem("prosperity", prosperity);
        localStorage.setItem("reputation", reputation);
    }

    self.Initialize = function() {
        self.LoadPlayers();
        self.UpdateLevelInfo();

        var val = localStorage.getItem("reputation");
        if (val) {
            reputation = parseInt(val);
        }
        
        var val = localStorage.getItem("prosperity");
        if (val) {
            prosperity = parseInt(val);
        }
    }

    self.IncreaseProsperity = function(val) {
        prosperity = prosperity + val;
        localStorage.setItem("prosperity", prosperity);
        return prosperity;
    }

    self.IncreaseReputationLevel = function(val) {
        reputation = reputation + val;
        localStorage.setItem("reputation", reputation);
        return reputation;
    }

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
        level = N == 0 ? 0 : Math.ceil(level / (N * 2));
        $('#scenario_level').val(level);
    }

})(Gloomhaven);