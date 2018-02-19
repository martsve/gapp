var MonsterCards = {
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
        3: { Image: "res/Cultist/3.jpg", Initiative: 31, Move: -1, HealRange: 3, Range: 3 },
        4: { Image: "res/Cultist/4.jpg", Initiative: 63, Text: "Summon normal Living Bones.", DamageSelf: 2, Shuffle: true },
        5: { Image: "res/Cultist/5.jpg", Initiative: 10, Move: -1, Attack: -1, DeathAttack: 2 },
        6: { Image: "res/Cultist/6.jpg", Initiative: 10, Move: -1, Attack: -1, DeathAttack: 2 },
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
            Attack: 1,
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
        4: { Image: "res/FrostDemon/4.jpg", Initiative: 18, Immobilizie: "Target all enemies within Range 2", Consume: {
            Type: "Frost",
            HealSelf: 3
        } },
        5: { Image: "res/FrostDemon/5.jpg", Initiative: 38, Move: 1, Attack: -1},
        6: { Image: "res/FrostDemon/6.jpg", Initiative: 18, Immobilizie: "Target all enemies within Range 2", Consume: {
            Type: "Frost",
            HealSelf: 3
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
            CurseSelf: true,
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
            InvisibleSelf: true
        } },
        8: { Image: "res/NightDemon/8.jpg", Initiative: 22, Move: 0, Attack: 0, Night: true }
    },

};

var Monsters = {
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
            Retaliate: [0, 0, 0, [2,2]]
        },
        Elite: {
            HP: [3,3,4,5],
            Move: [3,3,3,3],
            Attack: [2,2,3,3],
            Range: [3,4,4,5],

            Shield: [3,4,4,4],
            Retaliate: [0, [2,2], [3,2], [3,3]]
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