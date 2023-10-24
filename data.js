const datas = [{
    title: "隅の死活 第1型",
    setup: "*********| *********| *********| *********| *********| *******B*| ********B| *****BBBWW *****BWWW| -----BW--+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [],
            nextHands: {97: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [{108: "+"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第2型",
    setup: "*********| *********| *********| *********| *********| *******W*| ********W| *****WWWBB *****WBBB| ------B-W+",
    nextHands: {108: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [{108: "+"}],
            nextHands: {106: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {108: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [{97: "|"}, {107: "-"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第4型",
    setup: "*********| *********| *********| *********| *********| *******WW| *******WB| *****WWWB| *****WBBB| ---------+",
    nextHands: {108: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第5型",
    setup: "*********| *********| *********| *********| *********| *******BB| *******BW| *****BBBW| *****BWWW| ------W--+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {97: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "隅のマガリ四目で死。",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第6型",
    setup: "*********| *********| *********| *********| *********| *******B*| ********B| ****BBBBWW ****BWWW*| ---------+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {108: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {106: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "隅のマガリ四目で死。",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第7型",
    setup: "*********| *********| *********| ******W**| *********| ******W**| *******W*| *****WWBB| *****WB**| ---------+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {97: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {74: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 63,
            removeBlackStones: [],
            nextHands: {75: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第7型 変化",
    setup: "*********| *********| *********| ******W**| *********| ******W**| *******W*| *****WWBB| *****WB**| ---------+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {96: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {108: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [{108: "+"}],
            nextHands: {86: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {95: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 74,
            removeBlackStones: [],
            nextHands: {108: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [{97: "|"}, {107: "-"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第8型",
    setup: "*********| *********| *********| ******B**| *********| ******B**| *******B*| *****BBWW| *****BW**| ------W--+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {104: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第9型",
    setup: "*********| *********| *********| ******B**| *********| ******B*B| *******BW| *****BBWW| *****BW**| -------W-+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {104: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [],
            nextHands: {105: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        }
    }
},{
    title: "隅の死活 第10型",
    setup: "*********| *********| *********| ******W**| *********| ******W**| *******W*| *****WWBB| *****WB**| -----W-B-+",
    nextHands: {74: "a", 97: "d"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 63,
            removeBlackStones: [],
            nextHands: {97: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {107: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 74,
            removeBlackStones: [],
            nextHands: {107: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第11型",
    setup: "*********| *********| *********| *********| *********| ******W**| *******WW| ***W*WWBB| ******B**| ---------+",
    nextHands: {96: "a", 107: "c"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {105: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "正解だが、やや薄い形。",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第12型",
    setup: "*********| *********| *********| *********| *********| ******B**| *******BB| ***B*BBWW| ******W**| -------W-+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {86: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {92: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {107: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第13型",
    setup: "*********| *********| *********| *********| *********| ******B**| *******BBB ***B*BBWW| ******W*W| ---------+",
    nextHands: {107: "a", 97: "p"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {106: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [],
            nextHands: {93: "c", 97: "g"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {97: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [{108: "+"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "黒取り番のコウ。これが最善。",
            status: "correct"
        },
        g: {
            removeWhiteStones: [{108: "+"}],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {93: "h"},
            message: "",
            status: "continue"
        },
        h: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "白取り番のコウで黒不利。",
            status: "incorrect"
        },
        p: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {107: "q"},
            message: "",
            status: "continue"
        },
        q: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [{97: "|"}],
            nextHands: {},
            message: "白取り番のコウで黒不利。",
            status: "incorrect"
        },
    }
},{
    title: "隅の死活 第14型",
    setup: "*********| *********| *********| *********| *********| ******B**| *******BB| ***B*BBWW| ******WBW| ---------+",
    nextHands: {106: "a", 97: "c"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {86: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "無条件死。",
            status: "correct"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [{95: "*"}],
            nextHands: {86: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {92: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {107: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウは失敗。",
            status: "incorrect"
        },
    }
},{
    title: "隅の死活 第15型",
    setup: "*********| *********| *********| *********| *********| ******B**| *******BBB ***B*BBWW| ******W**| --------W+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {105: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {92: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {95: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "両アタリ。",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第16型",
    setup: "*********| *********| *********| *********| ********B| *********| *******BB| *****BBWW| ***B*BW**W -------W-+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {104: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第17型",
    setup: "*********| *********| *********| *********| *********| *********| ******BBB| ****BBWW*| ****BW**W| ------W--+",
    nextHands: {103: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {85: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {94: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第17型 変化",
    setup: "*********| *********| *********| *********| *********| *********| ******BBB| ****BBWW*| ****BW**W| ------W--+",
    nextHands: {103: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {86: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {94: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第18型",
    setup: "*********| *********| *********| *********| *********| *********| ******BBB| ****BBWW*| ****BW**W| -------W-+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {85: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {97: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第19型",
    setup: "*********| *********| *********| *********| *********| ******B**| *****B*BB| ***B*BWW*| **B*BW**W| ------W--+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {85: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {107: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第20型",
    setup: "*********| *********| *********| *********| *********| ******W**| *****W*WW| ***W*WBB*| ****WB**B| ---------+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {104: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {86: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第21型",
    setup: "*********| *********| *********| *********| *********| *********| *****BBBB| ****B*WW*| ****BW**W| ---------+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {85: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [{97: "|"}],
            nextHands: {106: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第22型",
    setup: "*********| *********| *********| *********| *********| *********| ******BBB| ****BBWW*| ****BW*W*| ------W--+",
    nextHands: {96: "a", 97: "e"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {86: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {108: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [{97: "|"}],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {},
            message: "黒の取り番のコウ。",
            status: "correct"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {107: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {85: "g"},
            message: "",
            status: "continue"
        },
        g: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウだが白の取り番。",
            status: "incorrect"
        },
    }
},{
    title: "隅の死活 第23型",
    setup: "*********| *********| *********| *********| *******B*| *********| *****BBB*| ***B*BWW*| **B*BW*W*| ---------+",
    nextHands: {75: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {97: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {107: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "無条件死。",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第23型 変化",
    setup: "*********| *********| *********| *********| *******B*| *********| *****BBB*| ***B*BWW*| **B*BW*W*| ---------+",
    nextHands: {75: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {103: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "隅の死活 第24型",
    setup: "*********| *********| *********| *******B*| *********| *****BBB*| *******W*| ***B*BBW*| ******W**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {64: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {97: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
}];
