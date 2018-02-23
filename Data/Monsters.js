var MonsterCards = {
    "earthdemon": {
        1: { Image: "res/EarthDemon/1.jpg", Initiative: 83, Move: -1, Attack: 1, Green: true },
        2: { Image: "res/EarthDemon/2.jpg", Initiative: 87, Move: 0, Attack: -1, Consume: { Type: "Any", Green: true }, Pattern: 'img/ref/earthdemon-1.png' },
        3: { Image: "res/EarthDemon/3.jpg", Initiative: 79, Move: 1, Attack: 0, Consume: {Type: "Wind", Attack: -2 } },
        4: { Image: "res/EarthDemon/4.jpg", Initiative: 62, Move: 0, Attack: 0, Green: true },
        5: { Image: "res/EarthDemon/5.jpg", Initiative: 71, Attack: 0, Range: 4, Consume: { Type: "Green", Target: 2 } },
        6: { Image: "res/EarthDemon/6.jpg", Initiative: 40, HealSelf: 3, Consume: { Type: "Green", Immobilize: "Target all enemies within Range {Range} 3" }, Shuffle: true },
        7: { Image: "res/EarthDemon/7.jpg", Initiative: 42, Move: 1, Attack: -1, Shuffle: true },
        8: { Image: "res/EarthDemon/8.jpg", Initiative: 93, Move: -1, Attack: [-1, "Target all adjacent enemies"], Consume: { Type: "Green", Push: 1 } },
    },
    "sundemon": {
        1: { Image: "res/SunDemon/1.jpg", Initiative: 50, Move: 0, Attack: 0, Range: 3, Consum: { Type: "Any", Sun: true } },
        2: { Image: "res/SunDemon/2.jpg", Initiative: 88, Move: -1, Attack: [-1, "Target all adjacent enemies"], Consume: { Type: "Any", Muddle: -1 }  },
        3: { Image: "res/SunDemon/3.jpg", Initiative: 36, Move: 0, Attack: [0, "Target all adjacent enemies"], Sun: true  },
        4: { Image: "res/SunDemon/4.jpg", Initiative: 68, Move: 0, Attack: 1, Sun: true },
        5: { Image: "res/SunDemon/5.jpg", Initiative: 36, Move: 0, Attack: [1, "Target all adjacent enemies"], Sun: true  },
        6: { Image: "res/SunDemon/6.jpg", Initiative: 17, Heal: [3,3], Consume: { Type: "Sun", Text: "Target all allies within range" }, Shuffle: true },
        7: { Image: "res/SunDemon/7.jpg", Initiative: 95, Move: -1, Attack: 0, Range: 4, Consume: { Type: "Sun", Text: "Target all allies within range" } },
        8: { Image: "res/SunDemon/8.jpg", Initiative: 73, Move: 0, Attack: 1, Consume: { Type: "Sun", HealSelf: 3 }, Shuffle: true },
    },
    "hound": {
        1: { Image: "res/Hound/1.jpg", Initiative: 6, Move: -1, Attack: 0, Immobilize: true },
        2: { Image: "res/Hound/2.jpg", Initiative: 7, Move: 0, Muddle: "Target all adjacent enemies" },
        3: { Image: "res/Hound/3.jpg", Initiative: 72, Attack: -1, Pierce: 2, Move: -2, AttackAgain: { Attack: -1, Pierce: 2 } },
        4: { Image: "res/Hound/4.jpg", Initiative: 19, Move: 0, Attack: 0, Text: "Add +2 Attack {Attack} if the target is adjacent to any of the Hound's allies.", Shuffle: true },
        5: { Image: "res/Hound/5.jpg", Initiative: 19, Move: 0, Attack: 0, Text: "Add +2 Attack {Attack} if the target is adjacent to any of the Hound's allies.", Shuffle: true },
        6: { Image: "res/Hound/6.jpg", Initiative: 26, Move: 0, Attack: 0 },
        7: { Image: "res/Hound/7.jpg", Initiative: 26, Move: 0, Attack: 0 },
        8: { Image: "res/Hound/8.jpg", Initiative: 83, Move: -2, Attakc: 1, },
    },
    "livingspirit": {
        1: { Image: "res/LivingSpirit/1.jpg", Initiative: 55, Move: 0, Curse: "Target all enemies within range", Frost: true },
        2: { Image: "res/LivingSpirit/2.jpg", Initiative: 33, Move: 0, Attack: [-1, "Target all enemies within range"], Shuffle: true },
        3: { Image: "res/LivingSpirit/3.jpg", Initiative: 61, Attack: 0, Range: -1, Target: 2 },
        4: { Image: "res/LivingSpirit/4.jpg", Initiative: 75, Move: -1, Attack: 1, Range: -1, HealSelf: 1 },
        5: { Image: "res/LivingSpirit/5.jpg", Initiative: 67, Move: -1, Attack: 1, Consume: {Type:"Frost", Stun: true} },
        6: { Image: "res/LivingSpirit/6.jpg", Initiative: 48, Move: 0, Attack: 0 },
        7: { Image: "res/LivingSpirit/7.jpg", Initiative: 22, Move: -1, Attack: -1, Muddle: true, Shuffle: true },
        8: { Image: "res/LivingSpirit/8.jpg", Initiative: 48, Move: 0, Attack: 0 },
    },
    "livingcorpse": {
        1: { Image: "res/LivingCorpse/1.jpg", Initiative: 71, Move: 0, Attack: 1, Poison: "Target all adjacent enemies" },
        2: { Image: "res/LivingCorpse/2.jpg", Initiative: 91, Move: 1, DamageSelf: 1 },
        3: { Image: "res/LivingCorpse/3.jpg", Initiative: 32, Attack: 2, Push: 1, DamageSelf: 1 },
        4: { Image: "res/LivingCorpse/4.jpg", Initiative: 47, Move: 1, Attack: -1 },
        5: { Image: "res/LivingCorpse/5.jpg", Initiative: 66, Move: 0, Attack: 0, Shuffle: true },
        6: { Image: "res/LivingCorpse/6.jpg", Initiative: 66, Move: 0, Attack: 0, Shuffle: true },
        7: { Image: "res/LivingCorpse/7.jpg", Initiative: 82, Move: -1, Attack: 1 },
        8: { Image: "res/LivingCorpse/8.jpg", Initiative: 21, Move: 1, Text: "MUDDLE {Muddle} and IMMOBILIZE {Immobilize} one adjacent enemy"},
    },
    "archer": {
        1: { Image: "res/Archer/14.jpg", Initiative: 14, Move: -1, Attack: -1, Text: "Create a 3 damage trap in an adjacent empty hex closest to an enemy" },
        2: { Image: "res/Archer/16.jpg", Initiative: 16, Move: 1, Attack: -1 },
        3: { Image: "res/Archer/29.jpg", Initiative: 29, Move: 0, Attack: -1, Range: 1, Immobilize: true, Shuffle: true },
        4: { Image: "res/Archer/31.jpg", Initiative: 31, Move: 0, Attack: 0 },
        5: { Image: "res/Archer/32.jpg", Initiative: 32, Move: 0, Attack: 1, Range: -1 },
        6: { Image: "res/Archer/44.jpg", Initiative: 44, Move: -1, Attack: 1 },
        7: { Image: "res/Archer/56.jpg", Initiative: 56, Attack: -1, Target: 2 },
        8: { Image: "res/Archer/68.jpg", Initiative: 68, Attack: 1, Range: 1, Shuffle: true },
    },
    "shaman": {
        1: { Image: "res/Shaman/1.jpg", Initiative: 8, Move: 0, Attack: -1, Disarm: true },
        2: { Image: "res/Shaman/2.jpg", Initiative: 23, Move: 0, Heal: [3,3], Shuffle: true },
        3: { Image: "res/Shaman/3.jpg", Initiative: 89, Move: -1, Heal: [1, "Affect all adjacent allies"], Bless: true },
        4: { Image: "res/Shaman/4.jpg", Initiative: 62, Move: 0, Attack: 0 },
        5: { Image: "res/Shaman/5.jpg", Initiative: 8, Move: -1, Attack: 0, Immobilize: true },
        6: { Image: "res/Shaman/6.jpg", Initiative: 9, Move: 1, Attack: -1, Curse: true, Target: 2 },
        7: { Image: "res/Shaman/7.jpg", Initiative: 23, Move: 0, Heal: [3,3], Shuffle: true },
        8: { Image: "res/Shaman/8.jpg", Initiative: 74, Move: -1, Attack: 1 },
    },

    "AncientArtillery": {
        1: { Image: "res/AncientArtillery/1.jpg", Initiative: 0, },
        2: { Image: "res/AncientArtillery/2.jpg", Initiative: 0, },
        3: { Image: "res/AncientArtillery/3.jpg", Initiative: 0, },
        4: { Image: "res/AncientArtillery/4.jpg", Initiative: 0, },
        5: { Image: "res/AncientArtillery/5.jpg", Initiative: 0, },
        6: { Image: "res/AncientArtillery/6.jpg", Initiative: 0, },
        7: { Image: "res/AncientArtillery/7.jpg", Initiative: 0, },
        8: { Image: "res/AncientArtillery/8.jpg", Initiative: 0, },
    },
    "boss":{
        1: { Image: "res/boss/1.jpg", Initiative: 52, Move: -1, Attack: -1, Range: 3, Target: 2 },
        2: { Image: "res/boss/2.jpg", Initiative: 17, Shuffle: true, Special: 2 },
        3: { Image: "res/boss/3.jpg", Initiative: 85, Shuffle: true, Special: 1 },
        4: { Image: "res/boss/4.jpg", Initiative: 79, Shuffle: true, Special: 1 },
        5: { Image: "res/boss/5.jpg", Initiative: 73, Shuffle: true, Special: 1 },
        6: { Image: "res/boss/6.jpg", Initiative: 36, Move: 0, Attack: 0 },
        7: { Image: "res/boss/7.jpg", Initiative: 14, Shuffle: true, Special: 2 },
        8: { Image: "res/boss/8.jpg", Initiative: 11, Shuffle: true, Special: 2 },
    },
    "CaveBear":{
        1: { Image: "res/CaveBear/1.jpg", Initiative: 0, },
        2: { Image: "res/CaveBear/2.jpg", Initiative: 0, },
        3: { Image: "res/CaveBear/3.jpg", Initiative: 0, },
        4: { Image: "res/CaveBear/4.jpg", Initiative: 0, },
        5: { Image: "res/CaveBear/5.jpg", Initiative: 0, },
        6: { Image: "res/CaveBear/6.jpg", Initiative: 0, },
        7: { Image: "res/CaveBear/7.jpg", Initiative: 0, },
        8: { Image: "res/CaveBear/8.jpg", Initiative: 0, },
    },
    "DeepTerror":{
        1: { Image: "res/DeepTerror/1.jpg", Initiative: 75, Attack: 0, Poison: true, AttackAgain: { Attack: -1, Range: 5, Immobilize: true } },
        2: { Image: "res/DeepTerror/2.jpg", Initiative: 75, Attack: [-2, "Target all adjacent enemies"], Disarm: true, AttackAgain: { Attack: 0, Range: 3, Target: 2 }  },
        3: { Image: "res/DeepTerror/3.jpg", Initiative: 96, Attack: -2, Range: 6, Text: "Summon normal Deep Terror in a hex adjacent to the target" },
        4: { Image: "res/DeepTerror/4.jpg", Initiative: 54, Text: "WOUND {Wound} and POISION {Poison} all adjacent enemies", Attack: 0, Range: 4 },
        5: { Image: "res/DeepTerror/5.jpg", Initiative: 84, Attack: [-1, "Target all adjacent enemies"], AttackAgain: { Attack: 0, Range: 4, Wound: true } },
        6: { Image: "res/DeepTerror/6.jpg", Initiative: 60, Attack: 0, Pierce: 3, Pattern: "img/ref/deepterror-1.png", Shuffle: true },
        7: { Image: "res/DeepTerror/7.jpg", Initiative: 60, Attack: 0, Pierce: 3, Pattern: "img/ref/deepterror-1.png", Shuffle: true },
        8: { Image: "res/DeepTerror/8.jpg", Initiative: 65, Attack: 0, Range: 3, Target: 3, Curse: true },
    },
    "GiantViper":{
        1: { Image: "res/GiantViper/1.jpg", Initiative: 0, },
        2: { Image: "res/GiantViper/2.jpg", Initiative: 0, },
        3: { Image: "res/GiantViper/3.jpg", Initiative: 0, },
        4: { Image: "res/GiantViper/4.jpg", Initiative: 0, },
        5: { Image: "res/GiantViper/5.jpg", Initiative: 0, },
        6: { Image: "res/GiantViper/6.jpg", Initiative: 0, },
        7: { Image: "res/GiantViper/7.jpg", Initiative: 0, },
        8: { Image: "res/GiantViper/8.jpg", Initiative: 0, },
    },
    "HarrowerInfester":{
        1: { Image: "res/HarrowerInfester/1.jpg", Initiative: 0, },
        2: { Image: "res/HarrowerInfester/2.jpg", Initiative: 0, },
        3: { Image: "res/HarrowerInfester/3.jpg", Initiative: 0, },
        4: { Image: "res/HarrowerInfester/4.jpg", Initiative: 0, },
        5: { Image: "res/HarrowerInfester/5.jpg", Initiative: 0, },
        6: { Image: "res/HarrowerInfester/6.jpg", Initiative: 0, },
        7: { Image: "res/HarrowerInfester/7.jpg", Initiative: 0, },
        8: { Image: "res/HarrowerInfester/8.jpg", Initiative: 0, },
    },
    "Imp":{
        1: { Image: "res/Imp/1.jpg", Initiative: 42, Move: 1, Heal: [2,3] },
        2: { Image: "res/Imp/2.jpg", Initiative: 37, Move: 0, Attack: 0 },
        3: { Image: "res/Imp/3.jpg", Initiative: 24, Strengthen: "Affect all allies within Range {Range} 2", Muddle: "Target all enemies within Range {Range} 2" },
        4: { Image: "res/Imp/4.jpg", Initiative: 5, Shield: 5, HealSelf: 1 },
        5: { Image: "res/Imp/5.jpg", Initiative: 37, Move: 0, Attack: 0 },
        6: { Image: "res/Imp/6.jpg", Initiative: 76, Move: -1, Attack: -1 },
        7: { Image: "res/Imp/7.jpg", Initiative: 43, Move: 0, Attack: -1, Target: 2, Curse: true, Shuffle: true },
        8: { Image: "res/Imp/8.jpg", Initiative: 43, Move: 0, Attack: -1, Target: 2, Poison: true, Shuffle: true },
    },
    "Lurker": {
        1: { Image: "res/Lurker/1.jpg", Initiative: 0, },
        2: { Image: "res/Lurker/2.jpg", Initiative: 0, },
        3: { Image: "res/Lurker/3.jpg", Initiative: 0, },
        4: { Image: "res/Lurker/4.jpg", Initiative: 0, },
        5: { Image: "res/Lurker/5.jpg", Initiative: 0, },
        6: { Image: "res/Lurker/6.jpg", Initiative: 0, },
        7: { Image: "res/Lurker/7.jpg", Initiative: 0, },
        8: { Image: "res/Lurker/8.jpg", Initiative: 0, },
    },
    "Ooze":{
        1: { Image: "res/Ooze/1.jpg", Initiative: 0, },
        2: { Image: "res/Ooze/2.jpg", Initiative: 0, },
        3: { Image: "res/Ooze/3.jpg", Initiative: 0, },
        4: { Image: "res/Ooze/4.jpg", Initiative: 0, },
        5: { Image: "res/Ooze/5.jpg", Initiative: 0, },
        6: { Image: "res/Ooze/6.jpg", Initiative: 0, },
        7: { Image: "res/Ooze/7.jpg", Initiative: 0, },
        8: { Image: "res/Ooze/8.jpg", Initiative: 0, },
    },
    "RendingDrake":{
        1: { Image: "res/RendingDrake/1.jpg", Initiative: 0, },
        2: { Image: "res/RendingDrake/2.jpg", Initiative: 0, },
        3: { Image: "res/RendingDrake/3.jpg", Initiative: 0, },
        4: { Image: "res/RendingDrake/4.jpg", Initiative: 0, },
        5: { Image: "res/RendingDrake/5.jpg", Initiative: 0, },
        6: { Image: "res/RendingDrake/6.jpg", Initiative: 0, },
        7: { Image: "res/RendingDrake/7.jpg", Initiative: 0, },
        8: { Image: "res/RendingDrake/8.jpg", Initiative: 0, },
    },
    "SavvasIcestorm":{
        1: { Image: "res/SavvasIcestorm/1.jpg", Initiative: 0, },
        2: { Image: "res/SavvasIcestorm/2.jpg", Initiative: 0, },
        3: { Image: "res/SavvasIcestorm/3.jpg", Initiative: 0, },
        4: { Image: "res/SavvasIcestorm/4.jpg", Initiative: 0, },
        5: { Image: "res/SavvasIcestorm/5.jpg", Initiative: 0, },
        6: { Image: "res/SavvasIcestorm/6.jpg", Initiative: 0, },
        7: { Image: "res/SavvasIcestorm/7.jpg", Initiative: 0, },
        8: { Image: "res/SavvasIcestorm/8.jpg", Initiative: 0, },
    },
    "SavvasLavaflow":{
        1: { Image: "res/SavvasLavaflow/1.jpg", Initiative: 0, },
        2: { Image: "res/SavvasLavaflow/2.jpg", Initiative: 0, },
        3: { Image: "res/SavvasLavaflow/3.jpg", Initiative: 0, },
        4: { Image: "res/SavvasLavaflow/4.jpg", Initiative: 0, },
        5: { Image: "res/SavvasLavaflow/5.jpg", Initiative: 0, },
        6: { Image: "res/SavvasLavaflow/6.jpg", Initiative: 0, },
        7: { Image: "res/SavvasLavaflow/7.jpg", Initiative: 0, },
        8: { Image: "res/SavvasLavaflow/8.jpg", Initiative: 0, },
    },
    "SpittingDrake":{
        1: { Image: "res/SpittingDrake/1.jpg", Initiative: 0, },
        2: { Image: "res/SpittingDrake/2.jpg", Initiative: 0, },
        3: { Image: "res/SpittingDrake/3.jpg", Initiative: 0, },
        4: { Image: "res/SpittingDrake/4.jpg", Initiative: 0, },
        5: { Image: "res/SpittingDrake/5.jpg", Initiative: 0, },
        6: { Image: "res/SpittingDrake/6.jpg", Initiative: 0, },
        7: { Image: "res/SpittingDrake/7.jpg", Initiative: 0, },
        8: { Image: "res/SpittingDrake/8.jpg", Initiative: 0, },
    },
    "StoneGolem":{ 
        1: { Image: "res/StoneGolem/1.jpg", Initiative: 0, },
        2: { Image: "res/StoneGolem/2.jpg", Initiative: 0, },
        3: { Image: "res/StoneGolem/3.jpg", Initiative: 0, },
        4: { Image: "res/StoneGolem/4.jpg", Initiative: 0, },
        5: { Image: "res/StoneGolem/5.jpg", Initiative: 0, },
        6: { Image: "res/StoneGolem/6.jpg", Initiative: 0, },
        7: { Image: "res/StoneGolem/7.jpg", Initiative: 0, },
        8: { Image: "res/StoneGolem/8.jpg", Initiative: 0, },
    },
    "VermlingScout":{
        1: { Image: "res/VermlingScout/1.jpg", Initiative: 53, Move: 0, Attack: 0 },
        2: { Image: "res/VermlingScout/2.jpg", Initiative: 54, Move: -2, Attack: 0, Range: 3, Poison: true },
        3: { Image: "res/VermlingScout/3.jpg", Initiative: 69, Move: -1, Attack: 1 },
        4: { Image: "res/VermlingScout/4.jpg", Initiative: 40, Move: 1, Attack: -1 },
        5: { Image: "res/VermlingScout/5.jpg", Initiative: 79, Attack: -1, Range: 4, Target: 2 },
        6: { Image: "res/VermlingScout/6.jpg", Initiative: 35, Move: 1, Jump: true, Loot: 1, Shuffle: true  },
        7: { Image: "res/VermlingScout/7.jpg", Initiative: 92, Attack: 2, Poison: true, Shuffle: true },
        8: { Image: "res/VermlingScout/8.jpg", Initiative: 29, Move: -1, Attack: -1, Range: 3 },
    },
    "WindDemon":{
        1: { Image: "res/WindDemon/1.jpg", Initiative: 21, Move: 0, Attack: 0, Pull: 1, Wind: true, Shuffle: true },
        2: { Image: "res/WindDemon/2.jpg", Initiative: 29, Move: 0, Attack: -1, Target: 2, Consume: { Type: "Wind", Push: 2 } },
        3: { Image: "res/WindDemon/3.jpg", Initiative: 9, Attack: -1, HealSelf: 1, Consume: { Type: "Wind", Invisible: -1 } },
        4: { Image: "res/WindDemon/4.jpg", Initiative: 43, Move: -1, Attack: 1, Consume: { Type: "Wind", Target: 2 } },
        5: { Image: "res/WindDemon/5.jpg", Initiative: 2, Shield: 1, Move: -1, Attack: -1, Consume: { Type: "Any", Wind: true } },
        6: { Image: "res/WindDemon/6.jpg", Initiative: 37, Move: 0, Attack: 0, Consume: { Type: "Wind", Text: "+1 Attack {Attack}", Pattern: "img/ref/winddemon-1.png" }, Pattern: "img/ref/earthdemon-1.png" },
        7: { Image: "res/WindDemon/7.jpg", Initiative: 43, Push: [1, "Target all adjacent enemies"], Attack: 0, Consume: {Type: "Green", Range: -2 } },
        8: { Image: "res/WindDemon/8.jpg", Initiative: 21, Move: 0, Attack: 0, Pull: 1, Wind: true, Shuffle: true },
    },

    "guard": {
        1: { Image: "res/Guard/1.jpg", Initiative: 35, Move: -1, Attack: 0, Range: 2 },
        2: { Image: "res/Guard/2.jpg", Initiative: 55, Move: -1, Attack: 0, Strengthen: true },
        3: { Image: "res/Guard/3.jpg", Initiative: 50, Move: 0, Attack: 0 },
        4: { Image: "res/Guard/4.jpg", Initiative: 50, Move: 0, Attack: 0 },
        5: { Image: "res/Guard/5.jpg", Initiative: 15, Shield: 1, Attack: 0, Poison: true, Shuffle: true },
        6: { Image: "res/Guard/6.jpg", Initiative: 15, Shield: 1, Retaliate: 2 },
        7: { Image: "res/Guard/7.jpg", Initiative: 30, Move: 1, Attack: -1 },
        8: { Image: "res/Guard/8.jpg", Initiative: 70, Move: -1, Attack: 1 },
    },

    "cultist": {
        1: { Image: "res/Cultist/1.jpg", Initiative: 27, Move: 0, Attack: 0 },
        2: { Image: "res/Cultist/2.jpg", Initiative: 63, Text: "Summon normal Living Bones.", DamageSelf: 2, Shuffle: true },
        3: { Image: "res/Cultist/3.jpg", Initiative: 31, Move: -1, Heal: [3, 3] },
        4: { Image: "res/Cultist/4.jpg", Initiative: 63, Text: "Summon normal Living Bones.", DamageSelf: 2, Shuffle: true },
        5: { Image: "res/Cultist/5.jpg", Initiative: 10, Move: -1, Attack: -1, Conditional: { Attack: 2, Type: "On death" } },
        6: { Image: "res/Cultist/6.jpg", Initiative: 10, Move: -1, Attack: -1, Conditional: { Attack: 2, Type: "On death" } },
        7: { Image: "res/Cultist/7.jpg", Initiative: 39, Move: -1, Attack: 0, HealSelf: 1 },
        8: { Image: "res/Cultist/8.jpg", Initiative: 27, Move: 0, Attack: 0 },
    },

    "flamedemon": {
        1: { Image: "res/FlameDemon/1.jpg", Initiative: 30, Consume: {
            Type: "Fire",
            Text: "All adjacent enemies suffer 2 damage"
        }, Move: 0, Attack: -2, Wound: true, Target: 2, Shuffle: true },
        2: { Image: "res/FlameDemon/2.jpg", Initiative: 77, Attack: [0, "Target all adjacent enemies"], Consume: {
            Type: "Frost",
            DamageSelf: 1
        } },
        3: { Image: "res/FlameDemon/3.jpg", Initiative: 8, Move: -1, Text: "Create a 4 damage trap in an adjacent empty hex closest to an enemy.", Consume: {
            Type: "Any",
            Fire: true,
        } },
        4: { Image: "res/FlameDemon/4.jpg", Initiative: 49, Attack: 0, Consume: {
            Type: "Fire",
            Text: "+1 Attack {Attack}",
            Wound: true,   
        }},
        5: { Image: "res/FlameDemon/5.jpg", Initiative: 46, Attack: 0, Consume: { Type: "Fire" }, Shuffle: true },
        6: { Image: "res/FlameDemon/6.jpg", Initiative: 3, Move: 1, Attack: -1, Fire: true },
        7: { Image: "res/FlameDemon/7.jpg", Initiative: 24, Move: 0, Attack: 0, Fire: true },
        8: { Image: "res/FlameDemon/8.jpg", Initiative: 67, Move: -1, Attack: 1, Range: -1, Fire: true },
    },
    
    "frostdemon": {
        1: { Image: "res/FrostDemon/1.jpg", Initiative: 58, Move: -1, Attack: 0, Range: 2, Consume: {
            Type: "Frost",
            Attack: 2,
            Range: 1
        } },
        2: { Image: "res/FrostDemon/2.jpg", Initiative: 78, Move: -1, Attack: 0, Frost: true, Shuffle: true },
        3: { Image: "res/FrostDemon/3.jpg", Initiative: 78, Move: -1, Attack: 0, Frost: true, Shuffle: true },
        4: { Image: "res/FrostDemon/4.jpg", Initiative: 18, Immobilize: "Target all enemies within Range 2", Consume: {
            Type: "Frost",
            HealSelf: 3
        } },
        5: { Image: "res/FrostDemon/5.jpg", Initiative: 38, Move: 1, Attack: -1},
        6: { Image: "res/FrostDemon/6.jpg", Initiative: 18, Shield: 2, Move: 1, Consume: {
            Type: "Fire",
            DamageSelf: 3
        } },
        7: { Image: "res/FrostDemon/7.jpg", Initiative: 58, Move: -1, Attack: -1, Pierce: 3, Consume: {
            Type: "Any",
            Frost: true
        }},
        8: { Image: "res/FrostDemon/8.jpg", Initiative: 58, Move: 0, Attack: 0 },
    },

    "livingbones": {
        1: { Image: "res/LivingBones/1.jpg", Initiative: 81, Attack: 2 },
        2: { Image: "res/LivingBones/2.jpg", Initiative: 12, Shield: 1, HealSelf: 2, Shuffle: true },
        3: { Image: "res/LivingBones/3.jpg", Initiative: 74, Move: 0, Attack: [0, "Target one enemy with all attacks"] },
        4: { Image: "res/LivingBones/4.jpg", Initiative: 25, Move: 1, Attack: -1 },
        5: { Image: "res/LivingBones/5.jpg", Initiative: 45, Move: 0, Attack: 0 },
        6: { Image: "res/LivingBones/6.jpg", Initiative: 45, Move: 0, Attack: 0 },
        7: { Image: "res/LivingBones/7.jpg", Initiative: 64, Move: -1, Attack: 1 },
        8: { Image: "res/LivingBones/8.jpg", Initiative: 20, Move: -2, Attack: 0, HealSelf: 2, Shuffle: true }
    },
    
    "nightdemon": {
        1: { Image: "res/NightDemon/1.jpg", Initiative: 41, Shuffle: true, Move: -1, Attack: 1, Night: true },
        2: { Image: "res/NightDemon/2.jpg", Initiative: 35, Attack: -1, Attack: [-1, "Pierce 2"], Consume: {
            Type: "Sun",
            Curse: true,
        } },
        3: { Image: "res/NightDemon/3.jpg", Initiative: 15, Move: 0, Attack: [-1, "All adjacent enemies and allies suffer 1 damage"], Consume: { 
            Type: "Any",
            Night: true
        } },
        4: { Image: "res/NightDemon/4.jpg", Initiative: 4, Move: 1, Attack: -1, Night: true },
        5: { Image: "res/NightDemon/5.jpg", Initiative: 46, Shuffle: true, Move: -1, Attack: 1, Consume: {
            Type: "Night",
            Attack: 2
        } },
        6: { Image: "res/NightDemon/6.jpg", Initiative: 26, Attack: -2, Range: 3, Target: 3, Consume: {
            Type: "Night",
            Muddle: true
        } },
        7: { Image: "res/NightDemon/7.jpg", Initiative: 7, Move: 1, Attack: -1, Consume: {
            Type: "Night",
            Invisible: -1
        } },
        8: { Image: "res/NightDemon/8.jpg", Initiative: 22, Move: 0, Attack: 0, Night: true }
    },

};


var Monsters = {
    "thebetrayer": {
        Name: "The Betrayer",
        LowLevel: "res/boss/betrayer-a.jpg",
        HighLevel: "res/boss/betrayer-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "inoxbodyguard": {
        Name: "Inox Bodyguard",
        LowLevel: "res/boss/guard-a.jpg",
        HighLevel: "res/boss/guard-b.jpg",
        Cards: "boss",
        Protection: { Poison: true, Stun: true, Disarm: true, Muddle: true },
        Boss: {
            HP: ['6*C','7*C','9*C','10*C'],
            Move: [2,2,2,3],
            Attack: ['C', '1+C', '1+C', '2+C'],
            Special1: [
                { Move: -1, Attack: -1, Pattern: "img/ref/inoxbodyguard-1.png" },
                { Move: -1, Attack: -1, Pattern: "img/ref/inoxbodyguard-1.png" },
                { Move: -1, Attack: -1, Pattern: "img/ref/inoxbodyguard-1.png" },
                { Move: -1, Attack: -1, Pattern: "img/ref/inoxbodyguard-1.png" }],
            Special2: [
                { Move: 0, Attack: 0, Retaliate: 3 },
                { Move: 0, Attack: 0, Retaliate: 3 },
                { Move: 0, Attack: 0, Retaliate: 3 },
                { Move: 0, Attack: 0, Retaliate: 4 }]
        },
    },
    "thecolorless": {
        Name: "The Colorless",
        LowLevel: "res/boss/colorless-a.jpg",
        HighLevel: "res/boss/colorless-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "banditcommander": {
        Name: "Bandit Commander",
        LowLevel: "res/boss/commander-a.jpg",
        HighLevel: "res/boss/commander-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "primedemon": {
        Name: "Prime Demon",
        LowLevel: "res/boss/demon-a.jpg",
        HighLevel: "res/boss/demon-b.jpg",
        Cards: "boss",
        Protection: { Poison: true, Stun: true, Disarm: true, Muddle: true, Immobilize: true, Wound: true },
        Boss: {
            HP: ['8*C','9*C','10*C','12*C'],
            Move: [3,4,4,4],
            Attack: [4,4,5,6],
            Special1: { Text: "Throne moves. Summon Demon.", Move: 2, Attack: -1 },
            Special2: { Text: "Throne moves. Summon Demon.", Move: 2, Attack: -1 },
        },
    },
    "elderdrake": {
        Name: "Elder Drake",
        LowLevel: "res/boss/drake-a.jpg",
        HighLevel: "res/boss/drake-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "thesightlesseye": {
        Name: "The Sightless Eye",
        LowLevel: "res/boss/eye-a.jpg",
        HighLevel: "res/boss/eye-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "thegloom": {
        Name: "The Gloom",
        LowLevel: "res/boss/gloom-a.jpg",
        HighLevel: "res/boss/gloom-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "captainoftheguard": {
        Name: "Captain of the Guard",
        LowLevel: "res/boss/guard-a.jpg",
        HighLevel: "res/boss/guard-b.jpg",
        Cards: "boss",
        Cards: "boss",
        Protection: { Wound: true, Stun: true, Disarm: true, Muddle: true },
        Boss: {
            HP: ['7*C','9*C','11*C','14*C'],
            Move: [2,2,2,3],
            Attack: [3,3,4,4],
            Special1: { Text: "Heal {Heal} 2. Affect self and all allies" },
            Special2: { Text: "All allies add +1 Attack {Attack} to all attacks this round", Attack: 1 },
        },
    },
    "wingedhorror": {
        Name: "Winged Horror",
        LowLevel: "res/boss/horror-a.jpg",
        HighLevel: "res/boss/horror-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "jekserah": {
        Name: "Jekserah",
        LowLevel: "res/boss/jakserah-a.jpg",
        HighLevel: "res/boss/jakserah-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },
    "mercilessoverseer": {
        Name: "Merciless Overseer",
        LowLevel: "res/boss/overseer-a.jpg",
        HighLevel: "res/boss/overseer-b.jpg",
        Cards: "boss",
        Protection: { Wound: true, Stun: true, Disarm: true, Curse: true },
        Boss: {
            HP: ['6*C','8*C','9*C','11*C'],
            Move: [2,2,3,3],
            Attack: 'V',
            Special1: { Text: "All Scouts act again" },
            Special2: { Text: "Summon Vermling Scouts" },
        },
    },
    "darkrider": {
        Name: "Dark Rider",
        LowLevel: "res/boss/rider-a.jpg",
        HighLevel: "res/boss/rider-b.jpg",
        Cards: "boss",
        Normal: {
        },
        Elite: {
        },
    },


    "ancientartillery": {
        Name: "Ancient Artillery",
        LowLevel: "res/AncientArtillery/a.jpg",
        HighLevel: "res/AncientArtillery/b.jpg",
        Cards: "AncientArtillery",
        Normal: {
        },
        Elite: {
        },
    },
    "cavebear":{
        Name: "Cave Bear",
        LowLevel: "res/CaveBear/a.jpg",
        HighLevel: "res/CaveBear/b.jpg",
        Cards: "CaveBear",
        Normal: {
        },
        Elite: {
        },
    },
    "deepterror":{
        Name: "Deep Terror",
        LowLevel: "res/DeepTerror/a.jpg",
        HighLevel: "res/DeepTerror/b.jpg",
        Cards: "DeepTerror",
        Normal: {
            HP: [3,4,4,5],
            Attack: [2,2,3,3],
            Retaliate: [0,1,1,2],
        },
        Elite: {
            HP: [5,6,7,8],
            Attack: [3,3,4,4],
            Retaliate: [0,1,1,2],
        },
    },
    "giantviper":{
        Name: "Giant Viper",
        LowLevel: "res/GiantViper/a.jpg",
        HighLevel: "res/GiantViper/b.jpg",
        Cards: "GiantViper",
        Normal: {
        },
        Elite: {
        },
    },
    "harrowerinfester":{
        Name: "Harrower Infester",
        LowLevel: "res/HarrowerInfester/a.jpg",
        HighLevel: "res/HarrowerInfester/b.jpg",
        Cards: "HarrowerInfester",
        Normal: {
        },
        Elite: {
        },
    },
    "blackimp":{
        Name: "Black Imp",
        LowLevel: "res/Imp/black-a.jpg",
        HighLevel: "res/Imp/black-b.jpg",
        Cards: "Imp",
        Normal: {
            HP: [3,4,5,5],
            Move: [1,1,1,1],
            Attack: [1,1,1,2],
            Range: [3,3,4,4],
            Poison: [0,1,1,1]
        },
        Elite: {
            HP: [4,6,8,8],
            Move: [1,1,1,1],
            Attack: [2,2,2,3],
            Range: [3,3,4,4],
            Poison: [1,1,1,1],
            Disadvantage: [0,0,0,1]
        },
    },
    "forestimp":{
        Name: "Forest Imp",
        LowLevel: "res/Imp/forest-a.jpg",
        HighLevel: "res/Imp/forest-b.jpg",
        Cards: "Imp",
        Normal: {
        },
        Elite: {
        },
    },
    "lurker":{
        Name: "Lurker",
        LowLevel: "res/Lurker/a.jpg",
        HighLevel: "res/Lurker/b.jpg",
        Cards: "Lurker",
        Normal: {
        },
        Elite: {
        },
    },
    "ooze":{
        Name: "Ooze",
        LowLevel: "res/Ooze/a.jpg",
        HighLevel: "res/Ooze/b.jpg",
        Cards: "Ooze",
        Normal: {
        },
        Elite: {
        },
    },
    "rendingdrake":{
        Name: "Rending Drake",
        LowLevel: "res/RendingDrake/a.jpg",
        HighLevel: "res/RendingDrake/b.jpg",
        Cards: "RendingDrake",
        Normal: {
        },
        Elite: {
        },
    },
    "savvasicestorm":{
        Name: "Savvas Icestorm",
        LowLevel: "res/SavvasIcestorm/a.jpg",
        HighLevel: "res/SavvasIcestorm/b.jpg",
        Cards: "SavvasIcestorm",
        Normal: {
        },
        Elite: {
        },
    },
    "savvaslavaflow":{
        Name: "Savvas Lavaflow",
        LowLevel: "res/SavvasLavaflow/a.jpg",
        HighLevel: "res/SavvasLavaflow/b.jpg",
        Cards: "SavvasLavaflow",
        Normal: {
        },
        Elite: {
        },
    },
    "spittingdrake":{
        Name: "Spitting Drake",
        LowLevel: "res/SpittingDrake/a.jpg",
        HighLevel: "res/SpittingDrake/b.jpg",
        Cards: "SpittingDrake",
        Normal: {
        },
        Elite: {
        },
    },
    "stonegolem":{
        Name: "Stone Golem",
        LowLevel: "res/StoneGolem/a.jpg",
        HighLevel: "res/StoneGolem/b.jpg",
        Cards: "StoneGolem",
        Normal: {
        },
        Elite: {
        },
    },
    "vermlingscout":{
        Name: "Vermling Scout",
        LowLevel: "res/VermlingScout/a.jpg",
        HighLevel: "res/VermlingScout/b.jpg",
        Cards: "VermlingScout",
        Normal: {
            HP: [2,3,3,5],
            Move: [3,3,3,3],
            Attack: [1,1,2,2],
        },
        Elite: {
            HP: [4,5,5,7],
            Move: [3,3,4,4],
            Attack: [2,2,3,3],
        },
    },
    "winddemon":{
        Name: "Wind Demon",
        LowLevel: "res/winddemon/a.jpg",
        HighLevel: "res/winddemon/b.jpg",
        Cards: "WindDemon",
        Normal: {
            HP: [3,3,4,5],
            Move: [3,3,4,4],
            Attack: [2,2,2,3],
            Range: [3,3,3,3],
            Shield: [1,2,2,2]
        },
        Elite: {
            HP: [5,5,7,8],
            Move: [4,4,5,5],
            Attack: [3,3,3,4],
            Range: [4,4,4,4],
            Shield: [1,2,2,2]
        },
    },



    "earthdemon": {
        Name: "Earth Demon",
        LowLevel: "res/EarthDemon/a.jpg",
        HighLevel: "res/EarthDemon/b.jpg",
        Cards: "earthdemon",
        Normal: {
            HP: [7,9,12,13],
            Move: [1,1,1,2],
            Attack: [3,3,3,3],
        },
        Elite: {
            HP: [10,13,18,20],
            Move: [2,2,2,2],
            Attack: [4,4,4,4],
        },
    },
    "sundemon": {
        Name: "Sun Demon",
        LowLevel: "res/SunDemon/a.jpg",
        HighLevel: "res/SunDemon/b.jpg",
        Cards: "sundemon",
        Normal: {
            HP: [5,7,9,10],
            Move: [2,2,2,2],
            Attack: [2,2,2,3],
            Shield: [1,1,1,1],
            Advantage: true,
            Flying: true,
        },
        Elite: {
            HP: [9,12,13,15],
            Move: [2,2,2,3],
            Attack: [3,3,4,4],
            Shield: [1,1,1,1],
            Advantage: true,
            Flying: true,
        },
    },
    "hound": {
        Name: "Hound",
        LowLevel: "res/Hound/a.jpg",
        HighLevel: "res/Hound/b.jpg",
        Cards: "hound",
        Normal: {
            HP: [4,4,6,8],
            Move: [3,4,4,4],
            Attack: [2,2,2,2],
            Retaliate: [0,1,1,1]
        },
        Elite: {
            HP: [6,6,7,8],
            Move: [5,5,5,5],
            Attack: [2,2,3,4],
            Retaliate: [0,2,2,2]
        },
    },
    "livingspirit": {
        Name: "Living Spirit",
        LowLevel: "res/LivingSpirit/a.jpg",
        HighLevel: "res/LivingSpirit/b.jpg",
        Cards: "livingspirit",
        Normal: {
            HP: [2,2,2,3],
            Move: [2,2,3,3],
            Attack: [2,2,2,3],
            Range: [2,2,3,3],
            Shield: [1,2,2,2]
        },
        Elite: {
            HP: [3,3,3,4],
            Move: [3,3,4,4],
            Attack: [3,3,3,4],
            Range: [3,3,4,4],
            Shield: [2,3,3,3]
        },
    },
    "livingcorpse": {
        Name: "Living Corpse",
        LowLevel: "res/LivingCorpse/a.jpg",
        HighLevel: "res/LivingCorpse/b.jpg",
        Cards: "livingcorpse",
        Normal: {
            HP: [5,7,9,10],
            Move: [1,1,1,1],
            Attack: [3,3,3,4],
        },
        Elite: {
            HP: [10,10,13,13],
            Move: [1,1,1,1],
            Attack: [3,4,4,5],
        },
    },
    "inoxguard": {
        Name: "Inox Guard",
        LowLevel: "res/Guard/inox_a.jpg",
        HighLevel: "res/Guard/inox_b.jpg",
        Cards: "guard",
        Normal: {
            HP: [5,8,9,11],
            Move: [2,2,2,3],
            Attack: [2,2,3,3]
        },
        Elite: {
            HP: [9,10,12,15],
            Move: [1,2,2,2],
            Attack: [3,3,4,4],
            Retaliate: [1,2,2,3]
        },
    },
    "cityarcher": {
        Name: "City Archer",
        LowLevel: "res/Archer/city-a.jpg",
        HighLevel: "res/Archer/city-b.jpg",
        Cards: "archer",
        Normal: {
            HP: [4,5,6,6],
            Move: [1,1,1,2],
            Attack: [2,2,3,3],
            Range: [3,4,4,4],
            Shield: [0,0,0,1],
            Pierce: [0,0,0,0],
        },
        Elite: {
            HP: [6,6,7,8],
            Move: [1,1,1,2],
            Attack: [3,3,4,4],
            Range: [4,5,5,5],
            Shield: [0,1,1,2],
            Pierce: [0,1,2,2]
        },
    },
    "inoxarcher": {
        Name: "Inox Archer",
        LowLevel: "res/Archer/inox-a.jpg",
        HighLevel: "res/Archer/inox-b.jpg",
        Cards: "archer",
        Normal: {
            HP: [5,6,8,9],
            Move: [2,2,2,2],
            Attack: [2,2,2,3],
            Range: [2,3,3,3]
        },
        Elite: {
            HP: [7,8,11,13],
            Move: [2,2,2,2],
            Attack: [3,3,3,4],
            Range: [3,4,4,4]
        },
    },
    "banditarcher": {
        Name: "Bandit Archer",
        LowLevel: "res/Archer/bandit-a.jpg",
        HighLevel: "res/Archer/bandit-b.jpg",
        Cards: "archer",
        Normal: {
        },
        Elite: {
        },
    },

    "vermlingshaman": {
        Name: "Vermling Shaman",
        LowLevel: "res/Shaman/vermling-a.jpg",
        HighLevel: "res/Shaman/vermling-b.jpg",
        Cards: "shaman",
        Normal: {
        },
        Elite: {
        },
    },

    "inoxshaman": {
        Name: "Inox Shaman",
        LowLevel: "res/Shaman/inox-a.jpg",
        HighLevel: "res/Shaman/inox-b.jpg",
        Cards: "shaman",
        Normal: {
            HP: [4,6,7,9],
            Move: [1,1,2,2],
            Attack: [2,2,2,2],
            Range: [3,3,3,4]
        },
        Elite: {
            HP: [6,9,11,14],
            Move: [2,2,3,3],
            Attack: [3,3,3,3],
            Range: [3,3,3,4]
        },
    },

    "banditguard": {
        Name: "Bandit Guard",
        LowLevel: "res/Guard/bandit_a.jpg",
        HighLevel: "res/Guard/bandit_b.jpg",
        Cards: "guard",
        Normal: {
            HP: [5,6,6,9,10,11,14,16],
            Move: [2,3,3,3,4,4,4,5],
            Attack: [2,2,3,3,3,4,4,4],
        },
        Elite: {
            HP: [9,9,10,10,11,12,14,14],
            Move: [2,2,2,3,3,3,3,3],
            Attack: [3,3,4,4,4,5,5,5],
            Shield: [0,1,1,2,2,2,2,3],
            Muddle: [0,0,0,0,1,1,1,1]
        },
    },
    
    "cityguard": {
        Name: "City Guard",
        LowLevel: "res/Guard/city_a.jpg",
        HighLevel: "res/Guard/city_b.jpg",
        Cards: "guard",
        Normal: {
            HP: [5,5,7,8],
            Move: [2,2,2,2],
            Attack: [2,2,2,3],
            Shield: [0,1,1,1],
            Retaliate: [0,0,0,0]
        },
        Elite: {
            HP: [6,6,9,9],
            Move: [2,2,2,2],
            Attack: [3,3,3,4],
            Shield: [1,2,2,2],
            Retaliate: [0,0,0,1]
        },
    },

    "cultist": {
        Name: "Cultist",
        LowLevel: "res/Cultist/a.jpg",
        HighLevel: "res/Cultist/b.jpg",
        Cards: "cultist",
        Normal: {
            HP: [4,5,7,9],
            Move: [2,2,2,3],
            Attack: [1,1,1,1],
        },
        Elite: {
            HP: [7,9,12,13],
            Move: [2,2,2,3],
            Attack: [2,2,2,2],

            Curse: [0,0,0,1]
        },
    },

    "flamedemon": {
        Name: "Flame Demon",
        LowLevel: "res/FlameDemon/a.jpg",
        HighLevel: "res/FlameDemon/b.jpg",
        Cards: "flamedemon",
        Normal: {
            HP: [2,2,3,3],
            Move: [3,3,3,3],
            Attack: [2,2,3,3],
            Range: [3,3,3,4],

            Shield: [2,3,3,3],
            Retaliate: [0, 0, 0, [2,2]],
            Flying: true
        },
        Elite: {
            HP: [3,3,4,5],
            Move: [3,3,3,3],
            Attack: [2,2,3,3],
            Range: [3,4,4,5],

            Shield: [3,4,4,4],
            Retaliate: [0, [2,2], [3,2], [3,3]],
            Flying: true
        },
    },

    "frostdemon": {
        Name: "Frost Demon",
        LowLevel: "res/FrostDemon/a.jpg",
        HighLevel: "res/FrostDemon/b.jpg",
        Cards: "frostdemon",
        Normal: {
            HP: [5,6,7,8],
            Move: [2,2,3,3],
            Attack: [3,3,3,4],

            Retaliate: [0,1,2,2]
        },
        Elite: {
            HP: [10,10,12,14],
            Move: [3,3,4,4],
            Attack: [3,3,4,4],

            Retaliate: [0,2,2,3]
        },
    },

    "livingbones": {
        Name: "Living Bones",
        LowLevel: "res/LivingBones/a.jpg",
        HighLevel: "res/LivingBones/b.jpg",
        Cards: "livingbones",
        Normal: {
            HP: [5,5,5,7],
            Move: [2,3,3,3],
            Attack: [1,1,2,2],

            Shield: [0,1,1,1],
            Target: [2,2,2,2]
        },
        Elite: {
            HP: [6,6,7,10],
            Move: [4,4,4,4],
            Attack: [2,2,3,3],

            Shield: [0,1,1,1],
            Target: [2,3,3,3]
        },
    },

    "nightdemon": {
        Name: "Night Demon",
        LowLevel: "res/NightDemon/a.jpg",
        HighLevel: "res/NightDemon/b.jpg",
        Cards: "nightdemon",
        Normal: {
            HP: [3,5,6,7],
            Move: [3,3,3,4],
            Attack: [3,3,4,4],

            Text: "Attackers gain Disadvantage"
        },
        Elite: {
            HP: [5,8,11,13],
            Move: [4,4,4,4],
            Attack: [4,4,4,5],

            Text: "Attackers gain Disadvantage"
        },
    },
};

function GetMonsterStats(monster, elite, lvl) {
    var stats = elite ? monster.Elite : monster.Normal;
    var flat = { Elite: elite, Level: lvl };
    for (var key in stats) {
        if (Array.isArray(stats[key])) {
            flat[key] = stats[key][lvl];
        }
        else {
            flat[key] = stats[key];
        }
    }
    return flat;
}

function StatsTextToImages(text) {
    if (Number.isInteger(text))
        text = "" + text;
    text = text.replace(/\{Attack\}/g,'<img src="img/icons/attack.png" class="statIcon">');
    text = text.replace('{Move}','<img src="img/icons/move.png" class="statIcon">');
    text = text.replace(/\{Range\}/g,'<img src="img/icons/range.png" class="statIcon">');
    text = text.replace('{Shield}','<img src="img/icons/shield.png" class="statIcon">');
    text = text.replace('{Retaliate}','<img src="img/icons/retaliate.png" class="statIcon">');

    text = text.replace('{Disarm}','<img src="img/icons/disarmed.png" class="statIcon">');
    text = text.replace('{Curse}','<img src="img/icons/curse.png" class="statIcon">');
    text = text.replace('{Stunned}','<img src="img/icons/stunned.png" class="statIcon">');
    text = text.replace('{Strengthen}','<img src="img/icons/strengthen.png" class="statIcon">');
    text = text.replace('{Poison}','<img src="img/icons/poisoned.png" class="statIcon">');
    text = text.replace('{Muddle}','<img src="img/icons/muddled.png" class="statIcon">');
    text = text.replace('{Wound}','<img src="img/icons/wound.png" class="statIcon">');
    text = text.replace('{Invisible}','<img src="img/icons/invisible.png" class="statIcon">');
    text = text.replace('{Immobilize}','<img src="img/icons/immobilized.png" class="statIcon">');

    text = text.replace('{Pierce}','<img src="img/icons/pierce.png" class="statIcon">');
    text = text.replace('{Pull}','<img src="img/icons/pull.png" class="statIcon">');
    text = text.replace('{Push}','<img src="img/icons/push.png" class="statIcon">');

    text = text.replace('{Fire}','<img src="img/icons/e-fire.png" class="statIcon">');
    text = text.replace('{Green}','<img src="img/icons/e-green.png" class="statIcon">');
    text = text.replace('{Night}','<img src="img/icons/e-night.png" class="statIcon">');
    text = text.replace('{Sun}','<img src="img/icons/e-sun.png" class="statIcon">');
    text = text.replace('{Wind}','<img src="img/icons/e-wind.png" class="statIcon">');
    text = text.replace('{Frost}','<img src="img/icons/e-snow.png" class="statIcon">');

    text = text.replace('{Flying}','<img src="img/icons/flying.png" class="statIcon">');
    text = text.replace('{Consume}','<img src="img/icons/consume.png" class="consume statIcon">');      

    text = text.replace('{Any}','<img src="img/icons/any.png" class="statIcon">');
    text = text.replace('{Target}','<img src="img/icons/target.png" class="statIcon">');
    text = text.replace(/\{Heal\}/g,'<img src="img/icons/heal.png" class="statIcon">');
    text = text.replace('{Shuffle}','<img src="img/icons/shuffle.png" class="statIcon">');
    return text;
}

function GetSimpleStatTable(monster, initiative, lvl) {
    var normal = GetMonsterStats(monster, false, lvl);
    var elite = GetMonsterStats(monster, true, lvl);

    if (!initiative) 
        initiative = {};

    var normalKeys = {}, eliteKeys = {}, initKeys = {};

    var allKeys = {};
    for (var key in normal) 
        if (!StatIgnoreStat(key, normal[key])) {
            allKeys[key] = true;
            normalKeys[key] = true;
        }

    var allKeys = {};
    for (var key in elite) 
        if (!StatIgnoreStat(key, elite[key])) {
            allKeys[key] = true;    
            eliteKeys[key] = true;
        }

    for (var key in initiative) 
        if (!StatIgnoreStat(key, initiative[key])) {
            allKeys[key] = true;
            initKeys[key] = true;
        }

    var table = {};
    for (var key in allKeys) {
        var headerData = initiative[key] != undefined ? initiative[key] : elite[key];
        table[key] = {
            "Key": key,
            "Header": StatsTextToImages(StatHeaderFromKey(key, headerData)),
            "Normal": normalKeys[key] != undefined ? StatsTextToImages(StatDataFromStat(key, normal[key])) : "",
            "Elite": eliteKeys[key] != undefined ? StatsTextToImages(StatDataFromStat(key, elite[key])) : "",
            "Initiative": initKeys[key] != undefined ? StatsTextToImages(StatDataFromStat(key, initiative[key], true)) : "",
            "Order": StatOrderFromKey(key),
            "InitiativeImage": initiative.Image, 
        };
    }

    var keyValues = [];
    for (var key in table) 
        keyValues.push([ key, table[key].Order ])
    keyValues.sort(function compare(kv1, kv2) { return kv1[1] - kv2[1] });

    var list = [];
    for (var i = 0; i < keyValues.length; i++)  {
        var key = keyValues[i][0];
        list.push(table[key]);
    }

    return list;
}


function GetStatsOutcome(monster, initiative, elite, lvl, modifier) {
    var stats = GetMonsterStats(monster, elite, lvl);
    var total = CombineStats(initiative, stats);
    var modified = CombineStats(initiative, stats, modifier);

    var allKeys = {};
    for (var key in total) 
        if (!StatIgnoreStat(key, total[key])) {
            allKeys[key] = true;
        }

    var table = {};
    for (var key in allKeys) {
        var headerData = total[key];
        table[key] = {
            "Key": key,
            "Order": StatOrderFromKey(key),
            "Header": StatsTextToImages(StatHeaderFromKey(key, headerData)),
            "Stats": stats[key] != undefined ? StatsTextToImages(StatDataFromStat(key, stats[key])) : "",
            "Initiative": initiative[key] != undefined ? StatsTextToImages(StatDataFromStat(key, initiative[key], true)) : "",
            "Total": total[key] != undefined ? StatsTextToImages(StatDataFromStat(key, total[key])) : "",
            "Modified": modified[key] != undefined ? StatsTextToImages(StatDataFromStat(key, modified[key])) : "",
        };
    }

    var keyValues = [];
    for (var key in table) 
        keyValues.push([ key, table[key].Order ])
    keyValues.sort(function compare(kv1, kv2) { return kv1[1] - kv2[1] });

    var list = [];
    for (var i = 0; i < keyValues.length; i++)  {
        var key = keyValues[i][0];
        list.push(table[key]);
    }

    return list;
}

function CombineStats(initiative, stats, modifier) {
    var result = Object.assign({}, stats);
    if (result.Attack && initiative.Attack == undefined)
        delete result.Attack;

    if (result.Move && initiative.Move == undefined)
        delete result.Attack;

    for (var key in initiative) {
        if (key == "Image") continue;
        else if (key == "Conditional") {
            result[key] = Object.assign({}, initiative[key]);
            if (result[key].Attack != undefined && stats.Attack != undefined)
                result[key].Attack += stats.Attack;
        }
        else if (result[key] != undefined) {
            if (Array.isArray(result[key]) || Array.isArray(initiative[key]) )
                console.log('array add', key, result[key],initiative[key]);
            else {
                result[key] += initiative[key];
            }
        }
        else {
            result[key] = initiative[key]; 
        }
    }

    if (modifier && result.Attack != undefined) {
        if (modifier == -3) result.Attack = 0;
        else if (modifier == 3) result.Attack = result.Attack * 2;
        else result.Attack = result.Attack + modifier;
    }
    
    if (modifier && result.Conditional != undefined && result.Conditional.Attack != undefined) {
        if (modifier == -3) result.Conditional.Attack = 0;
        else if (modifier == 3) result.Conditional.Attack = result.Conditional.Attack * 2;
        else result.Conditional.Attack = result.Conditional.Attack + modifier;
    }

    return result;
}

function StatOrderFromKey(key) {
    var index = ["Initiative", "HP", "Move", "Attack", "Pattern", "Range"].indexOf(key);
    if (index >= 0)
        return index;
    
    if (key == "Text")
        return 150;

    if (key == "Shuffle")
        return 200;

    return 100;
}

function StatHeaderFromKey(key, data) {
    
    if (key == "HP") return "{Heal}";
    
    if (["Attack", "Range", "Move", "Shield", "Retaliate"].indexOf(key) >= 0) { 
        return "{"+key+"}";    
    }

    if (["Heal", "Pierce", "Push", "Pull", "Target", "Immobilize"].indexOf(key) >= 0) { 
        return key + " {"+key+"}";    
    }

    if (["Flying", "Pattern", "Invisible","Special", "Advantage","Text", "Shuffle","Strengthen", "Curse", "Muddle", "Poison", "Wound", "Sun", "Night", "Frost", "Green", "Fire", "Wind", "Any"].indexOf(key) >= 0) { 
        return "";
    }

    if (key == "DamageSelf") return "Gives itself";
    if (key == "HealSelf") return "Heal {Heal}";
    if (key == "Conditional") return data.Type;    
    if (key == "Consume") return "{"+data.Type+"}{Consume}:";

    return key;
}

function StatIgnoreStat(key, data) {   
    if (["Elite", "Level", "Image", "Type"].indexOf(key) >= 0) { 
        return true;
    }

    if (["Retaliate", "Curse", "Muddle", "Poison", "Wound", "Sun", "Night", "Frost", "Green", "Fire", "Wind", "Shuffle", "Any"].indexOf(key) >= 0) { 
        return (!data || (Array.isArray(data) && data[0] == 0));
    }

    return false;   
}

function StatDataFromStat(key, data, pluss) {
    if (["HP", "Attack", "Move", "Range", "Shield", "Target", "Pierce", "Pull", "Push"].indexOf(key) >= 0) { 
        if (Array.isArray(data))
            return (data[0] >= 0 && pluss ? '+' : '') + data[0] + " [" + data[1] + "]";
     
        return (data >= 0 && pluss ? '+' : '') + data;        
    }

    if (["Retaliate", "Immobilize", "Heal"].indexOf(key) >= 0) {
        if (Array.isArray(data)) {
            if (typeof data[1] === 'string')
                return data[0] + " [ " + data[1] + "]";
            return data[0] + " ["+GetStatText('Range', data[1]) + "]";
        }
        if (typeof data === 'string')
            return "[ " + data + "]";
        return data;        
    }

    if (key == "HealSelf") { 
        return data + " Self";
    }

    if (key == "DamageSelf") { 
        return data + " damage";
    }

    if (["Strengthen", "Curse", "Muddle", "Poison", "Wound", "Invisible"].indexOf(key) >= 0) { 
        return key.toUpperCase() + " {"+key+"}" + (data < 0 ? " self" :"");
    }

    if (["Flying", "Sun", "Night", "Frost", "Green", "Fire", "Wind", "Any"].indexOf(key) >= 0) { 
        return "{"+key+"}";
    }

    if (key == "Initiative")
        return data;

    if (key == "Advantage")
        return "Advantage";

    if (key == "Text")
        return data;

    if (key == "Shuffle")
        return "{Shuffle}";

    if (key == "Conditional") 
        return StatsToText(data, ', ', true);

    if (key == "Consume") 
        return StatsToText(data, ', ', true);
                    
    if (key == "Special")
        return "Special " + data;

    if (key == "Pattern")
        return "<img src='"+data+"' class='pattern' />";

    alert('missing key: '+ key);
    console.log('missing key', key, data);
}

function GetStatText(key, data, pluss) {
    return StatHeaderFromKey(key, data) + " " + StatDataFromStat(key, data, pluss);
}

function StatsToText(stats, del, pluss) {
    var keyValues = [];
    for (var key in stats) 
        keyValues.push([ key, StatOrderFromKey(key) ])
    keyValues.sort(function compare(kv1, kv2) { return kv1[1] - kv2[1] });

    var text = [];
    for (var i = 0; i < keyValues.length; i++)  {
        var key = keyValues[i][0];
        var data = stats[key];
        if (!StatIgnoreStat(key, data)) {
           text.push(GetStatText(key,data, pluss));
        }
    }

    return text.join(del || '<br />');
}