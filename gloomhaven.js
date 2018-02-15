var Gloomhaven = {};
(function(self) { 

    self.data = {
        Name: "Gloomhaven",
        PlayerList: {},
        Reputation: 0,
        Prosperity: 0,
        Donations: 0,
        Difficulty: 0,
        ScenarioLevel: 0,
        ActiveTab: 'general-tab',
    };

    self.GetGoldConversion = function() {
        var lvl = self.data.ScenarioLevel;
        var goldConversion = [2,2,3,3,4,4,5,6];
        return goldConversion[lvl];
    };

    self.GetTrapDamage = function() {
        var lvl = self.data.ScenarioLevel;
        var trapDamage = [2,3,4,5,6,7,8,9];
        return trapDamage[lvl];
    };

    self.GetBonusExperience = function() {
        var lvl = self.data.ScenarioLevel;
        var bonusExp = [4,6,8,10,12,14,16,18];
        return bonusExp[lvl];
    };

    self.GetReputationPrice = function() { 
        var rep = self.data.Reputation;
        if (rep < -18) return 5;
        if (rep < -14) return 4;
        if (rep < -10) return 3;
        if (rep < -6) return 2;
        if (rep < -2) return 1;
        if (rep < 3) return 0;
        if (rep < 7) return -1;
        if (rep < 11) return -2;
        if (rep < 15) return -3;
        if (rep < 19) return -4;
        return 5;
    };

    self.GetProsperityLevel = function() {
        var prosp = self.data.Prosperity;
        if (prosp < 4) return 1;
        if (prosp < 9) return 2;
        if (prosp < 15) return 3;
        if (prosp < 22) return 4;
        if (prosp < 30) return 5;
        if (prosp < 39) return 6;
        if (prosp < 50) return 7;
        if (prosp < 64) return 8;
        return 9;
    };

    self.SetName = function(val) {
        self.data.Name = val;
        self.SaveAll();
    };

    self.SetDifficulty = function(val) {
        self.data.Difficulty = val;
        self.SetScenarioLevel();
        self.SaveAll();
    };

    self.SetActiveTab = function(val) {
        self.data.ActiveTab = val;
        self.SaveAll();
    };

    self.IncreaseDonations = function(val, callback) {
        self.data.Donations = self.data.Donations + val;
        if (!self.data.HasDonatedEnough && self.data.Donations >= 100)
        {
            self.data.HasDonatedEnough = true;
            callback();
        }
        self.SaveAll();
    };
    
    self.IncreaseProsperity = function(val) {
        self.data.Prosperity = self.data.Prosperity + val;
        self.SaveAll();
    };

    self.IncreaseReputationLevel = function(val, callback) {
        self.data.Reputation = self.data.Reputation + val;
        if (self.data.Reputation < -20) self.data.Reputation = -20
        if (self.data.Reputation > 20) self.data.Reputation = 20

        if (self.data.Reputation >= 10 && !self.data.HasRepPlus10) {
            callback('Party Reputation pluss 10! Open box Sun');
            self.data.HasRepPlus10 = true;
        }

        if (self.data.Reputation >= 20 && !self.data.HasRepPlus20) {
            callback('Party Reputation pluss 20! Add City Event 76 and Road Event 67 to the decks.');
            self.data.HasRepPlus20 = true;
        }

        if (self.data.Reputation <= -10 && !self.data.HasRepNeg10) {
            callback('Party Reputation negative 10! Open box Moons');
            self.data.HasRepNeg10 = true;
        }

        if (self.data.Reputation <= -20 && !self.data.HasRepNeg20) {
            callback('Party Reputation negative 20! Add City Event 77 and Road Event 68 to the decks.');
            self.data.HasRepNeg20 = true;
        }

        self.SaveAll();
    };

    self.UpdateLevel = function(name, level) {
        self.data.PlayerList[name].level = level;
        self.SetScenarioLevel();
        self.SaveAll();
    };

    self.SetScenarioLevel = function() {
        var level = 0;
        var N = Object.keys(self.data.PlayerList).length;
        for (var key in self.data.PlayerList) {
            var item = self.data.PlayerList[key];
            level = level + item['level'];
        }
        level = N == 0 ? 1 : Math.ceil(level / (N * 2));
        self.data.ScenarioLevel = level + self.data.Difficulty;
    };

    // Add or remove players
    self.AddPlayer = function(name) {
        var level = 1;
        self.data.PlayerList[name] = { level: level };
        self.SetScenarioLevel();
        self.SaveAll();
    };

    self.RemovePlayer = function(name) {
        delete self.data.PlayerList[name];
        self.SetScenarioLevel();
        self.SaveAll();
    };

    // Load and save data
    self.LoadData = function(data) { 
        self.data = data;
        self.SaveAll();
        window.location.reload();
    };

    self.SaveAll = function() {
        var item = JSON.stringify(self.data);
        localStorage.setItem("gloomhaven.data", item);
    };

    self.Initialize = function() {
        var data = localStorage.getItem("gloomhaven.data");
        
        if (data) {
            data = JSON.parse(data);
            for (var key in data) {
                self.data[key] = data[key];
            }
        }
    };

})(Gloomhaven);

Gloomhaven.Initialize();