var Gloomhaven = {};
(function(self) { 

    /*
        Initialization
    */
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
        Monsters: {},
        ActiveMonsters: {},
        ActiveMonster: null,
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
            return GloomhavenData.GetProsperityLevel(self.data.Prosperity);
        if (key == 'ReputationPrice')
            return GloomhavenData.GetReputationPrice(self.data.Reputation);

        if (key == 'GoldConversion')
            return GloomhavenData.GetGoldConversion(self.data.ScenarioLevel);
        if (key == 'TrapDamage')
            return GloomhavenData.GetTrapDamage(self.data.ScenarioLevel);
        if (key == 'BonusExperience')
            return GloomhavenData.GetBonusExperience(self.data.ScenarioLevel);

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
    };


    /*
        Start/end scenario
    */
    
    self.StartScenario = function(key) {
        self.data.ActiveTab = 'scenario-tab';
        self.data.ScenarioIsActive = true;
        self.data.ScenarioKey = key;
        self.data.showTileList = true;
        self.data.showMonsterList = true;
        self.data.Monsters = {};
        self.data.ActiveMonsters = {};
        self.data.ActiveMonster = null;
        self.data.ActiveMonsterOrder = [];
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

    self.QuitScenario = function() {
        self.data.ActiveTab = 'location-tab';
        self.data.ScenarioIsActive = false;
        self.data.ScenarioKey = '';
        self.SaveAll();
    };

    
    /*
        Control turn structure
    */
    
    self.StartRound = function() {
        self.data.ShuffleAtEndOfRund = false;
        self.data.ActiveMonster = null;

        for (var key in self.data.ActiveMonsters) {
            self.data.ActiveMonsters[key].Active = true;
        }

        for (var i in self.data.Monsters)
            self.data.Monsters[i].ActiveCard = null;

        UpdateMonsterOrder();
        self.SaveAll();
    };

    var StartRoundInitiative = function() {
        self.data.ShuffleAtEndOfRund = false;
        self.data.ActiveMonster = null;

        FlipMissingInitiativeCards();
    };

    self.GotoNextMonsterTurn = function() {
        if (!self.data.ActiveMonster)
            StartRoundInitiative();

        if (self.data.ActiveMonster)
            EndMonsterTurn(self.data.ActiveMonster);

        var key = GetNextMonster();
        if (key) {
            StartMonsterTurn(key);
            self.SaveAll();
        }
        else {
            self.EndRound();
        }
        Persistent.Trigger('ActiveMonster');
    };

    var StartMonsterTurn = function(key) {
        self.data.ActiveMonster = key;
        if (self.data.ActiveStatuses[key]) {
            for (var status in self.data.ActiveStatuses[key])
                self.data.ActiveStatuses[key][status] = 1;
        }
    };

    var EndMonsterTurn = function(key) {
        self.data.ActiveMonsters[key].Active = false;

        self.data.ActiveMonster = null;
        if (self.data.ActiveStatuses[key]) {
            for (var status in self.data.ActiveStatuses[key])
                if (self.data.ActiveStatuses[key][status] == 1)
                    delete self.data.ActiveStatuses[key][status];

            Persistent.Trigger('ActiveStatuses');
        }
    };

    self.EndRound = function() {
        self.data.ActiveMonster = null;

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
        Persistent.Trigger('ActiveMonster');
        Persistent.Trigger('ActiveElements');
        Persistent.Trigger('EndRound');
    };


    /*
        Adding/Removing monsters
    */

    var GetNextMonsterNumber = function(key) {
        var keys = [1,2,3,4,5,6,7,8,9];        
        for (var item in self.data.ActiveMonsters) {
            if (self.data.ActiveMonsters[item].Id == key) {
                var index = keys.indexOf(self.data.ActiveMonsters[item].Number);                
                keys.splice(index, 1);
            }
        }
        var randomKey = keys[Math.floor(Math.random()*keys.length)];        
        return randomKey;
    };

    self.AddActiveMonster = function(key, elite, summon) {
        var number = GetNextMonsterNumber(key);
        var name = key + '_' + number + '_' + (elite ? "elite" : "normal");
        self.data.ActiveMonsters[name] = {
            Id: key,
            Name: Monsters[key].Name,
            TypeNumber: Object.keys(Monsters).indexOf(key),
            Number: number,
            Elite: elite,
            Active: !summon,
            Summon: summon
        };
        AddMonsterDeck(key);
        UpdateMonsterOrder();
        self.SaveAll();
    };

    var AddMonsterDeck = function(key) {
        if (!self.data.Monsters[key]) {
            self.data.Monsters[key] = {
                ActiveCard: null,
                Deck: [],
                Graveyard: [],
            };
            var library = MonsterCards[Monsters[key].Cards];
            for (var item in library)
            self.data.Monsters[key].Deck.push(library[item]);
            ShuffleMonsterDeck(key);
        }
    }

    var ShuffleMonsterDeck = function(key) {      
        for (var i in self.data.Monsters[key].Graveyard) {
            self.data.Monsters[key].Deck.push(self.data.Monsters[key].Graveyard[i]);
        }
        self.data.Monsters[key].Graveyard = [];
        self.data.Monsters[key].Deck = shuffle(self.data.Monsters[key].Deck);
    }

    self.RemoveActiveMonster = function(key) {
        if (self.data.ActiveMonster == key) {
            EndMonsterTurn(self.data.ActiveMonster);
        }
        delete self.data.ActiveMonsters[key];
        UpdateMonsterOrder();
        self.SaveAll();
    };

    /*
        Modifier deck
    */

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
        result.Result = result.Selected == 0 ? result.Card1.Value : result.Card2.Value;
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


    /*
        Control elements and statuses
    */

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


    /*
        Determine monster order
    */
    var DrawInitiativeCard = function(key) {
        self.data.Monsters[key].ActiveCard = self.data.Monsters[key].Deck.pop();
        self.data.Monsters[key].Graveyard.push(self.data.Monsters[key].ActiveCard);
        if (self.data.Monsters[key].ActiveCard.Shuffle) {
            ShuffleMonsterDeck(key);
        }
    }

    var UpdateMonsterOrder = function() {
        var keyValues = [];
        for (var key in self.data.ActiveMonsters) {
            var type = self.data.ActiveMonsters[key].Id;
            var activeCard = self.data.Monsters[type].ActiveCard;
            var activeVal = self.data.ActiveMonsters[key].Active ? 1000000 : 0;
            var initiativeVal = (1 + (activeCard ? activeCard.Initiative : 0)) * 1000;
            var typeVal = self.data.ActiveMonsters[key].TypeNumber * 30;
            var eliteVal = self.data.ActiveMonsters[key].Elite ? 0 : 15;
            var numberVal = self.data.ActiveMonsters[key].Number;
            var val = activeVal + initiativeVal + typeVal + eliteVal + numberVal;
            keyValues.push([ key, val ])
        }

        if (keyValues.length > 0) {
            keyValues.sort(function compare(kv1, kv2) {
                return kv1[1] - kv2[1]
            });
        }

        self.data.ActiveMonsterOrder = [];
        for (var i = 0; i < keyValues.length; i++) {
            self.data.ActiveMonsterOrder.push(keyValues[i][0]);
        }
        Persistent.Trigger('ActiveMonsterOrder');
    };

    var GetNextMonster = function() {
        for (var i in self.data.ActiveMonsterOrder) {
            var key = self.data.ActiveMonsterOrder[i];
            if (self.data.ActiveMonsters[key].Active) {
                return key;
            }
        }
        return null;
    };

    var FlipMissingInitiativeCards = function() {
        for (var key in self.data.ActiveMonsters) {
            var id = self.data.ActiveMonsters[key].Id;
            var hasRevealed = self.data.Monsters[id].ActiveCard != null;
            if (!hasRevealed && self.data.ActiveMonsters[key].Active) {
                DrawInitiativeCard(id);
            }
        }
        Persistent.Trigger('ActiveMonsterOrder');
        UpdateMonsterOrder();
    };
    



    /*
        Locations
    */
    
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

    
    /*
        Trigger checks for opening stuff
    */

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

    
    /*
        Game info - players
    */

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
        Persistent.Trigger('ScenarioLevel');
    };

    
    /*
        Game data
    */

    self.SetName = function(val) {
        self.data.Name = val;
        self.SaveAll();
    };

    self.SetActiveTab = function(val) {
        self.data.ActiveTab = val;
        self.SaveAll();
    };

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

var GloomhavenData = {};
(function(self) { 

    self.GetGoldConversion = function(lvl) {
        var goldConversion = [2,2,3,3,4,4,5,6];
        return goldConversion[lvl];
    };

    self.GetTrapDamage = function(lvl) {
        var trapDamage = [2,3,4,5,6,7,8,9];
        return trapDamage[lvl];
    };

    self.GetBonusExperience = function(lvl) {
        var bonusExp = [4,6,8,10,12,14,16,18];
        return bonusExp[lvl];
    };

    self.GetReputationPrice = function(rep) { 
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

    self.GetProsperityLevel = function(prosp) {
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

})(GloomhavenData);

Gloomhaven.Initialize();