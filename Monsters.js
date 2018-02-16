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
};

var Monsters = {
    "banditguard": {
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
};