const questions = [
    {
        level: 1,
        name: "隅の死活第１型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWW",
                "    BWWW ",
                "    BW N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWW",
                "    BWWW ",
                "    BW B ",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第4型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      WW ",
                "      WB ",
                "    WWWB ",
                "    WBBB ",
                "        N",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      WW ",
                "      WB ",
                "    WWWB ",
                "    WBBB ",
                "        B",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第5型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      BB ",
                "      BW ",
                "    BBBW ",
                "    BWWW ",
                "     W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      BB ",
                "      BWW",
                "    BBBW ",
                "    BWWWN",
                "     W B ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      BB ",
                "      BWW",
                "    BBBW ",
                "    BWWWB",
                "     W B ",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第6型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWW",
                "   BWWW  ",
                "       N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWW",
                "   BWWWW ",
                "       BN",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWW",
                "   BWWWW ",
                "    W NBB",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWW",
                "   BWWWW ",
                "    W BBB",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第7型",
        steps: [
            [
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBB ",
                "    WB   ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBB ",
                "    WB WN",
                "      B  ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      WN ",
                "    WWBB ",
                "    WB WB",
                "      BW ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W W ",
                "      WBN",
                "    WWBB ",
                "    WB WB",
                "      BW ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W W ",
                "      WBB",
                "    WWBB ",
                "    WB WB",
                "      BW ",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第7型変化",
        steps: [
            [
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBB ",
                "    WB   ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBB ",
                "    WB NW",
                "      B  ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBB ",
                "    WB BW",
                "    W B N",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBBN",
                "    WB BW",
                "    W BW ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBBB",
                "    WB BW",
                "    W BW ",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第8型",
        steps: [
            [
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B   ",
                "      B  ",
                "    BBWW ",
                "    BW   ",
                "     W N ",
            ],[
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B   ",
                "      B  ",
                "    BBWW ",
                "    BW W ",
                "    NW B ",
            ],[
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B   ",
                "      B  ",
                "    BBWW ",
                "    BW W ",
                "    BW B ",
            ]
        ]
    },
    {
        level: 3,
        name: "隅の死活第9型",
        steps: [
            [
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B B ",
                "      BW ",
                "    BBWW ",
                "    BW  N",
                "      W  ",
            ],[
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B B ",
                "      BW ",
                "    BBWW ",
                "    BW WB",
                "    N W  ",
            ],[
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B B ",
                "      BW ",
                "    BBWW ",
                "    BW WB",
                "    BNW W",
            ],[
                "         ",
                "         ",
                "     B   ",
                "         ",
                "     B B ",
                "      BW ",
                "    BBWW ",
                "    BW WB",
                "    BBW W",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第10型",
        steps: [
            [
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      WN ",
                "    WWBB ",
                "    WB   ",
                "    W B  ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W W ",
                "      WB ",
                "    WWBB ",
                "    WB  N",
                "    W B  ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W W ",
                "      WBW",
                "    WWBB ",
                "    WB  B",
                "    W BN ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W W ",
                "      WBW",
                "    WWBB ",
                "    WB  B",
                "    W BB ",
            ]
        ]
    },
    {
        level: 1,
        name: "辺の死活第10型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   WWW   ",
                " WWBBBWW ",
                " WB   BW ",
                "  N   B  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   WWW   ",
                " WWBBBWW ",
                " WB   BW ",
                "  B   B  ",
            ]
        ]
    },
    {
        level: 1,
        name: "辺の死活第13型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W   WB ",
                "    N W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W  NWB ",
                "   WB W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W  BWB ",
                "   WB W  ",
            ]
        ]
    },
    {
        level: 1,
        name: "辺の死活第13型変化",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W   WB ",
                "    N W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W W WB ",
                "   NB W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W W WB ",
                "  WBBNW  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBB   ",
                "BBBWWWBB ",
                "  W W WB ",
                "  WBBBW  ",
            ]
        ]
    }
];
