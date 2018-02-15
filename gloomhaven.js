var Gloomhaven = {};
(function(self) { 

    self.data = {
        Name: "Gloomhaven",
        PlayerList: {},
        Reputation: 0,
        Prosperity: 0,
        Donations: 0,
        Difficulty: 0,
        ActiveTab: 'general-tab',
        HasDonatedEnough: false,
    };

    self.GetReputationPrice = function() { 
        return self.data.Reputation == 0 ? 0 : -1*(self.data.Reputation / Math.abs(self.data.Reputation) *  Math.ceil( Math.abs(self.data.Reputation) / 5));
    };

    self.GetProsperityLevel = function() {
        return Math.floor(self.data.Prosperity / 5);
    };

    self.SetName = function(val) {
        self.data.Name = val;
        self.SaveAll();
    }

    self.SetDifficulty = function(val) {
        self.data.Difficulty = val;
        self.SaveAll();
    }

    self.SetActiveTab = function(val) {
        self.data.ActiveTab = val;
        self.SaveAll();
    }

    self.IncreaseDonations = function(val, callback) {
        self.data.Donations = self.data.Donations + val;
        self.SaveAll();
        if (!self.data.HasDonatedEnough && self.data.Donations >= 100)
        {
            callback();
        }
    }
    
    self.IncreaseProsperity = function(val) {
        self.data.Prosperity = self.data.Prosperity + val;
        self.SaveAll();
    }

    self.IncreaseReputationLevel = function(val) {
        self.data.Reputation = self.data.Reputation + val;
        self.SaveAll();
    }

    self.UpdateLevel = function(name, level) {
        self.data.PlayerList[name].level = level;
        self.SaveAll();
    }

    self.GetScenarioLevel = function() {
        var level = 0;
        var N = Object.keys(self.data.PlayerList).length;
        for (var key in self.data.PlayerList) {
            var item = self.data.PlayerList[key];
            level = level + item['level'];
        }
        level = N == 0 ? 0 : Math.ceil(level / (N * 2));
        return level + self.data.Difficulty;
    }

    // Add or remove players
    self.AddPlayer = function(name) {
        var level = 1;
        self.data.PlayerList[name] = { level: level };
        self.SaveAll();
    }

    self.RemovePlayer = function(name) {
        delete self.data.PlayerList[name];
        self.SaveAll();
    }

    // Load and save data
    self.LoadData = function(data) { 
        self.data = data;
        self.SaveAll();
        window.location.reload();
    };

    self.SaveAll = function() {
        var item = JSON.stringify(self.data);
        localStorage.setItem("gloomhaven.data", item);
    }

    self.Initialize = function() {
        var data = localStorage.getItem("gloomhaven.data");
        
        if (data) {
            data = JSON.parse(data);
            for (var key in data) {
                self.data[key] = data[key];
            }
        }
    }

})(Gloomhaven);

Gloomhaven.Initialize();