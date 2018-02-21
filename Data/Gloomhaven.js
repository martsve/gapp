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
        AvailibleLocations: {'1': true},
        CompletedLocations: {},
        ActiveMonsters: [],
        ActiveStatuses: {},
        ActiveElements: {},
        ActiveRound: 0,
        ModifierDeck: [],
        ModifierDeckDiscard: [],
        ShuffleAtEndOfRund: false,

        ScenarioIsActive: false,
        ScenarioKey: '',        
    };

    self.Get = function(key) {
        if (key == 'ProsperityLevel')
            return self.GetProsperityLevel();
        if (key == 'ReputationPrice')
            return self.GetReputationPrice();

        if (key == 'GoldConversion')
            return self.GetGoldConversion();
        if (key == 'TrapDamage')
            return self.GetTrapDamage();
        if (key == 'BonusExperience')
            return self.GetBonusExperience();

        if (key == 'ModifierDeckLength')
            return self.data.ModifierDeck.length;

        return self.data[key];
    }

    self.Set = function(key, val) {
        self.data[key] = val;

        if (key == 'Difficulty')
            self.SetScenarioLevel();

        if (key == 'Reputation')
        {
            if (self.data.Reputation < -20) self.data.Reputation = -20
            if (self.data.Reputation > 20) self.data.Reputation = 20   
        }

        self.SaveAll();
        return self.data[key];
    }

    self.Add = function(key, num) {
        var val = self.Get(key);
        self.Set(key, parseFloat(val) + parseFloat(num));
    }

    self.AddActiveMonster = function(name) {
        var N = self.data.ActiveMonsters.length;
        self.data.ActiveMonsters.push({
            Name: "#" + N + " " + name,
            Id: name
        });
        self.SaveAll();
    }

    self.RemoveActiveMonster = function(key) {
        self.data.ActiveMonsters.splice(key, 1);
        self.SaveAll();
    }

    self.StartScenario = function(key) {
        self.data.ActiveTab = 'scenario-tab';
        self.data.ScenarioIsActive = true;
        self.data.ScenarioKey = key;
        self.data.showTileList = true;
        self.data.showMonsterList = true;
        self.data.ActiveMonsters = [];
        self.data.ActiveStatuses = {};
        self.data.ActiveRound = 0;
        self.data.ActiveElements = {
            'Fire': 0,
            'Green': 0,
            'Snow': 0,
            'Sun': 0,
            'Wind': 0,
            'Night': 0
        };

        MakeNewModifierDeck();
        self.SaveAll();
        
        Persistent.Trigger('ActiveRound');
        Persistent.Trigger('showTileList');
        Persistent.Trigger('showMonsterList');
        Persistent.Trigger('ActiveElements');
        Persistent.Trigger('ActiveStatuses');
    };

    self.CycleElement = function(type) {
        var current = self.data.ActiveElements[type] || 0;
        current = current - 1;
        if (current == -1)
            current = 2;
        self.data.ActiveElements[type] = current;
        self.SaveAll();
        Persistent.Trigger('ActiveElements');
    };

    self.SetMonsterStatus = function(key, status) {
        if (!self.data.ActiveStatuses[key]) {
            self.data.ActiveStatuses[key] = {};
        }
        self.data.ActiveStatuses[key][status] = 2;
        self.SaveAll();
        Persistent.Trigger('ActiveStatuses');
    };

    self.RemoveMonsterStatus = function(key, status) {
        delete self.data.ActiveStatuses[key][status];
        self.SaveAll();
        Persistent.Trigger('ActiveStatuses');
    };

    self.StartMonsterTurn = function(key) {
        if (self.data.ActiveStatuses[key]) {
            for (var status in self.data.ActiveStatuses[key])
                self.data.ActiveStatuses[key][status] = 1;

            self.SaveAll();
        }
    };

    self.EndMonsterTurn = function(key) {
        if (self.data.ActiveStatuses[key]) {
            for (var status in self.data.ActiveStatuses[key])
                if (self.data.ActiveStatuses[key][status] == 1)
                    delete self.data.ActiveStatuses[key][status];

            self.SaveAll();
            Persistent.Trigger('ActiveStatuses');
        }
    };

    self.StartRound = function() {
        self.data.ShuffleAtEndOfRund = false;
    };

    self.EndRound = function() {
        if (self.data.ShuffleAtEndOfRund) {
            self.ShuffleModifierDeck();
        }

        for (var type in self.data.ActiveElements) {
            var current = self.data.ActiveElements[type] || 0;
            current = current - 1;
            if (current == -1)
                current = 0;
            self.data.ActiveElements[type] = current;
        }

        self.SaveAll();
        Persistent.Trigger('ActiveElements');
    };

    self.QuitScenario = function() {
        self.data.ActiveTab = 'location-tab';
        self.data.ScenarioIsActive = false;
        self.data.ScenarioKey = '';
        self.SaveAll();
    };

    self.ResetLocation = function(key) {
        var loc = self.data.CompletedLocations[key];    
        if (loc)    
            delete self.data.CompletedLocations[key];
        self.SaveAll();
    };

    self.AddLocation = function(key) {
        var loc = self.data.CompletedLocations[key];    
        if (loc)    
            delete self.data.CompletedLocations[key];
        self.data.AvailibleLocations[key] = true;
        self.SaveAll();
    };

    self.CompleteLocation = function(key) {
        var loc = self.data.AvailibleLocations[key];        
        if (loc)
            delete self.data.AvailibleLocations[key];
        
        self.data.CompletedLocations[key] = true;
        var next = Locations[key].Next;
        for (var item in next) {
            if (!self.data.CompletedLocations[next[item]])
                self.data.AvailibleLocations[next[item]] = true;
        }

        self.data.ActiveTab = 'location-tab';
        self.data.ScenarioIsActive = false;
        self.data.ScenarioKey = '';   

        self.SaveAll();
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

    self.SetActiveTab = function(val) {
        self.data.ActiveTab = val;
        self.SaveAll();
    };

    self.CheckDonations = function(callback) {
        if (!self.data.HasDonatedEnough && self.data.Donations >= 100)
        {
            self.data.HasDonatedEnough = true;
            self.SaveAll();
            callback();
        }
    };

    self.CheckReputationLevel = function(callback) {
        if (self.data.Reputation >= 10 && !self.data.HasRepPlus10) {
            callback('Party Reputation pluss 10! Open box Sun');
            self.data.HasRepPlus10 = true;
            self.SaveAll();
        }

        if (self.data.Reputation >= 20 && !self.data.HasRepPlus20) {
            callback('Party Reputation pluss 20! Add City Event 76 and Road Event 67 to the decks.');
            self.data.HasRepPlus20 = true;
            self.SaveAll();
        }

        if (self.data.Reputation <= -10 && !self.data.HasRepNeg10) {
            callback('Party Reputation negative 10! Open box Moons');
            self.data.HasRepNeg10 = true;
            self.SaveAll();
        }

        if (self.data.Reputation <= -20 && !self.data.HasRepNeg20) {
            callback('Party Reputation negative 20! Add City Event 77 and Road Event 68 to the decks.');
            self.data.HasRepNeg20 = true;
            self.SaveAll();
        }
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



    /* Modifier deck */
    var shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    self.AddCurse = function() {
        self.data.ModifierDeck.push(ModifierDeck_Curse);
        self.data.ModifierDeck = shuffle(self.data.ModifierDeck);
        self.SaveAll();
        Persistent.Trigger('ModifierDeckLength');
    };

    self.AddBless = function() {
        self.data.ModifierDeck.push(ModifierDeck_Bless);
        self.data.ModifierDeck = shuffle(self.data.ModifierDeck);
        self.SaveAll();
        Persistent.Trigger('ModifierDeckLength');
    };
        
    var MakeNewModifierDeck = function() {
        self.data.ModifierDeckDiscard = [];
        self.data.ModifierDeck = ModifierDeck_cards;
        self.data.ModifierDeck = shuffle(self.data.ModifierDeck);
    };

    self.DrawFromModifierDeck = function(advantage, disadvantage) {
        var result = {};
        result.Card1 = GetModifierDeckCard();
        result.Selected = 0;
        result.Advantage = (advantage != disadvantage) && advantage;
        result.Disadvantage = (advantage != disadvantage) && disadvantage;
        if (result.Advantage || result.Disadvantage) {
            result.Card2 = GetModifierDeckCard();
            if (advantage && result.Card2.Value > result.Card1.Value)
                result.Selected = 1;
            else if (disadvantage && result.Card2.Value < result.Card1.Value)
                result.Selected = 1;
        }
        self.SaveAll();
        Persistent.Trigger('ModifierDeckLength');
        return result;
    };

    self.ShuffleModifierDeck = function() {
        for (var i in self.data.ModifierDeckDiscard) {
            self.data.ModifierDeck.push(self.data.ModifierDeckDiscard[i]);
        }
        self.data.ModifierDeckDiscard = [];
        self.data.ModifierDeck = shuffle(self.data.ModifierDeck);
        self.SaveAll();
        Persistent.Trigger('ModifierDeckLength');
    };

    var GetModifierDeckCard = function() {
        if (self.data.ModifierDeck.length == 0) {
            self.ShuffleModifierDeck();
        }

        var card = self.data.ModifierDeck.pop();

        if (!card.Discard) {
            self.data.ModifierDeckDiscard.push(card);
        }

        if (card.Shuffle) {
            self.data.ShuffleAtEndOfRund = true;
        }

        return card;
    };
    
})(Gloomhaven);

Gloomhaven.Initialize();