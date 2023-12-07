const datas = [{
    title: "第1型",
    offence: true,
    answer: 1,
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
    title: "第2型",
    offence: false,
    answer: 0,
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
    title: "第4型",
    offence: false,
    answer: 0,
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
    title: "第5型",
    offence: true,
    answer: 0,
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
    title: "第6型",
    offence: true,
    answer: 0,
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
    title: "第7型",
    offence: false,
    answer: 0,
    memo: "小目の小ケイマジマリの中に入り込んだ時にできる形。白が⑥と外からオサえました。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┤<br>┼┼┼┼○┼┤<br>┼┼┼┼④┼┤<br>┼┼②○❸❺┤<br>┼┼⑥❶┼┼┤<br>┴┴┴┴┴┴┘</div>",
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
    title: "第7型 変化",
    offence: false,
    answer: 0,
    memo: "小目の小ケイマジマリの中に入り込んだ時にできる形。白が⑥と外からオサえました。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┤<br>┼┼┼┼○┼┤<br>┼┼┼┼④┼┤<br>┼┼②○❸❺┤<br>┼┼⑥❶┼┼┤<br>┴┴┴┴┴┴┘</div>",
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
    title: "第8型",
    offence: true,
    answer: 0,
    memo: "第7型での守り方を誤り、サガってしまった形。",
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
    title: "第9型",
    offence: true,
    answer: 1,
    memo: "第7型で、白①と広げてから③とカケツいだ形。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┤<br>┼┼┼┼●❷┤<br>┼┼┼┼●①┤<br>┼┼●●○○┤<br>┼┼●○┼┼┤<br>┴┴┴┴③┴┘<br></div>",
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
            nextWhiteHand: 105,
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
            message: "コウ。なお、本編の手順だと白が損。",
            status: "correct"
        }
    }
},{
    title: "第10型",
    offence: false,
    answer: 0,
    memo: "第7型からの生き形に対して、白が①とサガった形。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┤<br>┼┼┼┼○┼┤<br>┼┼┼┼○┼┤<br>┼┼○○●●┤<br>┼┼○●┼┼┤<br>┴┴①┴●┴┘<br></div>",
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
    title: "第11型",
    offence: false,
    answer: 0,
    memo: "第7型とは逆を白がオサえた形。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┤<br>┼┼┼┼○┼┤<br>┼┼┼┼○①┤<br>┼┼○○●●┤<br>┼┼┼●┼┼┤<br>┴┴┴┴┴┴┘</div>",
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
    title: "第12型",
    offence: true,
    answer: 1,
    memo: "第11型の生き方を間違えた形。",
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
    title: "第13型",
    offence: true,
    answer: 1,
    memo: "第11型の生き形に、❶のサガりがある形。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┤<br>┼┼┼●●❶<br>┼●●○○┤<br>┼┼○┼○┤<br>┴┴┴┴┴┘</div>",
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
    title: "第14型",
    offence: true,
    answer: 0,
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
    title: "第15型",
    offence: true,
    answer: 0,
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
    title: "第16型",
    offence: true,
    answer: 0,
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
    title: "第17型",
    offence: true,
    answer: 0,
    memo: "黒の小目からの一間ジマリに白が入り、⑤とナナメに動きました。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┼┤<br>┼┼┼●❷●┼┤<br>┼●┼❹①③┼┤<br>┼┼┼┼┼┼⑤┤<br>┼┴┴┴┴┴┴┘</div>黒❶と眼形を作らせず、白②④とハネカケツいだ形です。<div style='line-height:1rem;margin:10px'>┼┼┼┼┼┼┼┤<br>┼┼┼●●●❶┤<br>┼●┼●○○┼┤<br>┼┼❸②┼┼○┤<br>┼┴┴┴④┴┴┘</div>",
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
    title: "第17型 変化",
    offence: true,
    answer: 0,
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
    title: "第18型",
    offence: true,
    answer: 0,
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
    title: "第19型",
    offence: true,
    answer: 1,
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
    title: "第20型",
    offence: false,
    answer: 0,
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
    title: "第21型",
    offence: true,
    answer: 0,
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
    title: "第22型",
    offence: true,
    answer: 1,
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
    title: "第23型",
    offence: true,
    answer: 0,
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
    title: "第23型 変化",
    offence: true,
    answer: 0,
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
    title: "第24型",
    offence: true,
    answer: 0,
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
},{
    title: "第25型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| *****BBBBB *****BWWWW *****BW**| -----BW--+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
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
            message: "",
            status: "correct"
        },
    }
},{
    title: "第26型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *********| *****BBBBB *****BWWWW *****BW**| ------W--+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {106: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第27型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| *****WWWW| *****WBBBB *****WB**| ------B-W+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {108: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [{108: "+"}],
            nextHands: {95: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "オシツブシ。",
            status: "correct"
        },
    }
},{
    title: "第28型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ********B| *****BBBW| *****BWWW| ***B*BW**| ---------+",
    nextHands: {75: "a"},
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
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {96: "c"},
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
    title: "第28型 変化",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ********B| *****BBBW| *****BWWW| ***B*BW**| ---------+",
    nextHands: {75: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {106: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {86: "c", 107: "m"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
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
            message: "",
            status: "correct"
        },
        m: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {108: "n"},
            message: "",
            status: "continue"
        },
        n: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "隅のマガリ四目だが、最善ではない。",
            status: "incorrect"
        },
    }
},{
    title: "第28型 生き方",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| ********W| *****WWWB| *****WBBB| ***W*WB**| ---------+",
    nextHands: {107: "a"},
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
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {106: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {86: "d"},
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
    title: "第29型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| ********BW *****BBBW| *****BWWW| ***B*BW**| ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {96: "b"},
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
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第30型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| ********W| ********WB *****WWWBW *****WBBB| ***W*WB**| ---------+",
    nextHands: {107: "a"},
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
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第31型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| ********W| *********| *****WWWW| ***W*WBBB| ****WBB**| ---------+",
    nextHands: {96: "a", 107: "c", 106: "d"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {107: "b"},
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
            message: "生きだが、薄い。",
            status: "incorrect"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "生きだが、損。",
            status: "incorrect"
        },
    }
},{
    title: "第32型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| *****BBBB| ***B*BWWW| **B*BWW**| ----W----+",
    nextHands: {96: "a", 104: "f", 97: "p"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {97: "b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {104: "c"},
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
        f: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {106: "g"},
            message: "",
            status: "continue"
        },
        g: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "incorrect"
        },
        p: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "第33型を参照。コウになる。",
            status: "incorrect"
        },
    }
},{
    title: "第33型",
    offence: false,
    answer: 2,
    setup: "*********| *********| *********| *********| ********W| *********| *****WWWW| ***W*WBBB| **W*WBB**W ----B----+",
    nextHands: {86: "a"},
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
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {95: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {105: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 102,
            removeBlackStones: [],
            nextHands: {108: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [{96:"*"}, {97:"|"}, {106:"-"}, {107:"-"}],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {96: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第34型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| ********W| *****WWWBW ***W*WBBB| ****WBB**| ---------+",
    nextHands: {96: "a", 107: "b"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "生きだが、薄い。",
            status: "incorrect"
        },
    }
},{
    title: "第35型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| ********W| *****WWWB| ***W*WBBB| ****WBB*W| ---------+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {106:"b"},
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
    title: "第36型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *******B*| ********BB *****BBBW| ***B*BWWW| ****BWW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {106:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {108: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。二段コウのような形。",
            status: "correct"
        },
    }
},{
    title: "第36型 白手順ミス",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ********BB *****BBBW| ***B*BWWW| ****BWWWBW -------B-+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
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
            message: "サガリの影響でダメヅマリ。",
            status: "correct"
        },
    }
},{
    title: "第37型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ********B| *****BBBW| ***B*BWWW| ****BW***| ----B-W--+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [{94:"*"}],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {104: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {97:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "隅のマガリ四目。",
            status: "correct"
        },
    }
},{
    title: "第38型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| ********W| *****WWWB| ***W*WBBB| ****WB***| ----W-B-W+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {106:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {108: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [{107:"-"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第39型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ********B| ******BBW| ***BBBWWW| ***BWW***| ---B-----+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [{94:"*"}],
            nextHands: {103: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {104:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {97:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "隅のマガリ四目。",
            status: "correct"
        },
    }
},{
    title: "第40型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| ******BBB| ***BBBWWW| ***BWW***| ---------+",
    nextHands: {103: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {86:"b"},
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
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {102:"d"},
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
    title: "第41型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| ******BBBB ***BBBWWW| ***BWW***| ---B----W+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {96:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {105: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {103:"d", 104:"d"},
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
    title: "第42型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| ********W| *********| ******WWWB ***WWWBBB| ***WBB***| ----W----+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {96:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 102,
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
            message: "",
            status: "correct"
        },
    }
},{
    title: "第43型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *******B*| ******B**| *******B*| ****BBBWW| ****BWW**| ---------+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {96:"b"},
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
            removeWhiteStones: [{107:"-"}],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {86: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [{97:"|"}],
            nextWhiteHand: 74,
            removeBlackStones: [],
            nextHands: {63: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {64: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "一手ヨセコウ。",
            status: "correct"
        },
    }
},{
    title: "第44型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| ******W**| *******WW| ****WWWBB| ****WBB**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第45型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| ******B**| *******BB| ****BBBWW| ****BWW**| -------W-+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {86:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
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
    }
},{
    title: "第46型",
    offence: true,
    answer: 2,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBBB ****BWWWWW ****BW***| ----BW---+",
    nextHands: {95: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {96:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {97: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {},
            message: "黒の先手セキ。",
            status: "correct"
        },
    }
},{
    title: "第47型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| ****BBBBB| ****BWWWW| ****BW***| ----B----+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {86: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107:"d"},
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
    title: "第48型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBBB ****BWWWW| **B*BW***| ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {86:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {96: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {95:"d"},
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
    title: "第50型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBB| ****BWWWW| ****BW***| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {106: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {75:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {103:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "万年コウ。",
            status: "correct"
        },
    }
},{
    title: "第51型",
    offence: false,
    answer: 2,
    setup: "*********| *********| *********| *********| *******W*| ********W| ****WWWWBW ****WB*BB| ****WB***| ---------+",
    nextHands: {83: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {97:"b"},
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
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {104:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "万年コウ。",
            status: "correct"
        },
    }
},{
    title: "第52型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ********B| ****BBBBW| ****BW*WW| ****BW***| ---------+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {75:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {96: "c"},
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
    title: "第53型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| ********W| ****WWWWB| ****WBWBB| ****WBB**| -----W---+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {96:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {108: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {86: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [{97:"|"}],
            nextWhiteHand: 95,
            removeBlackStones: [{82:"*"},{93:"*"},{94:"*"}],
            nextHands: {94: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [{95:"*"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第54型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| *********| ****BBBB*| ****BW*WW| **B*BW***| ---------+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {74:"b"},
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
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {105: "d"},
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
    title: "第55型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *******B*| ****B***B| ****B*BBW| ****BW*WW| **B*BW***| ---------+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 83,
            removeBlackStones: [],
            nextHands: {103: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {94: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [{94:"*"}],
            nextHands: {106: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第56型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| ****W***W| ****W*WWB| ****WBWBB| **W*WBB**| -----WB-W+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {108:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [{108:"+"}],
            nextHands: {86: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 71,
            removeBlackStones: [],
            nextHands: {103: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [{104:"-"}],
            nextWhiteHand: 108,
            removeBlackStones: [],
            nextHands: {95: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [{97:"|"},{106:"-"},{107:"-"},{108:"+"}],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {108: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [{108:"+"}],
            nextHands: {106: "g"},
            message: "",
            status: "continue"
        },
        g: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第57型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ****B***BB ****B*BBW| ****BW*WW| **B*BW***| ---------+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {83:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {107: "c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {106: "d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [],
            nextHands: {86: "e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {97: "f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [{108:"+"}],
            nextWhiteHand: 108,
            removeBlackStones: [{86:"|"},{97:"|"}],
            nextHands: {97: "g"},
            message: "",
            status: "continue"
        },
        g: {
            removeWhiteStones: [{108:"+"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "隅のマガリ四目。",
            status: "correct"
        },
    }
},{
    title: "第58型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBB| ****BWWWB| ****BW**WW ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {95:"b"},
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
    title: "第59型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *******B*| ****BB*B*| ****BWWW*| ****BW***| ---------+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 74,
            removeBlackStones: [],
            nextHands: {75:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 64,
            removeBlackStones: [],
            nextHands: {86:"c"},
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
    title: "第60型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *******W*| *********| *****WWW*| ****WBBB*| ****WWB**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 74,
            removeBlackStones: [],
            nextHands: {106:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {86:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {108:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [{97: "|"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
    }
},{
    title: "第61型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBB| ****BWWWB| ****B***WW -------W-+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {94:"b"},
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
    title: "第62型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****WWWWW| ****WBBBW| ****W***BB ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {93:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {107:"c"},
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
    title: "第63型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBBB ****BWWWBW ****B***WW ------W--+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "白はどちらからもオセない。",
            status: "correct"
        },
    }
},{
    title: "第64型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBB| ***BBWWWB| ***BW***WW ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {95:"b"},
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
    title: "第64型 変化",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ****BBBBB| ***BBWWWB| ***BW***WW ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {104:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {95:"c"},
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
    title: "第65型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *****B**B| *****B*B*| ***BBWWWBB ***BW***WW ---------+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {93:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {102:"d"},
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
    title: "第66型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *********| *****BBBB| **BBBWWWB| **BWW***WW --B------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {107:"c"},
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
    title: "第67型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *********| *****BBBB| ***BBWWWB| ***BW***W| ----W----+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {105:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {102:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {95:"d"},
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
    title: "第68型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *********| *****BBBB| ***BBWWWBW ***BW***W| ----W----+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {105:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {95:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [{106:"-"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第69型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *********| *****BBBB| ***BBWWWBW ***BW***W| -----W---+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {102:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {107:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [{106:"-"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第70型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ***BBBBBB| ***BW*WWB| ***BW***WW ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {103:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {94:"c"},
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
    title: "第71型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| *********| *******B*| ****BBB*B| ***B**WWB| ***BW***WW ---------+",
    nextHands: {93: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {105:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {103:"c"},
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
    title: "第72型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| ********B| ***BBBBB*| **B*W*WWBB **BW****WW ---------+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {93:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 82,
            removeBlackStones: [],
            nextHands: {92:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "黒のワタリを止められない。",
            status: "correct"
        },
    }
},{
    title: "第73型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| ********B| *********| *****BBBB| ***B*BWWW| ****BW***| -----W---+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {96:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第74型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| ********B| *****B***| *****B*BB| ***B*BWWW| ****BW***| -----W---+",
    nextHands: {86: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {95:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第75型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| ********W| *********| *****WWWWB ***W*WBBBW ****WB***| -----B---+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {96:"b"},
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
    title: "第76型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| *****BBBB| ***B*BWWW| **B*BW***| ------W--+",
    nextHands: {86: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {103:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {94:"d"},
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
    title: "第77型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| ********B| *********| *****BBBB| ***B*BWWW| ****BW***| ------W--+",
    nextHands: {86: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {102:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {},
            message: "一手ヨセコウ。",
            status: "correct"
        },
    }
},{
    title: "第78型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| ********W| *********| *****WWWWB ***W*WBBBW ****WB***| ------B--+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {106:"b"},
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
    title: "第79型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *******W*| ***WW*W**| ***WBBBWW| ***W***BB| ---------+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {104:"b"},
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
    title: "第80型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *******B*| ***BB*B**| ***BWWWBB| *******WW| ---------+",
    nextHands: {102: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {104:"b"},
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
    title: "第81型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *******B*| ***BBBB**| ***BWWWBB| ***B***WW| ******W**| ---------+",
    nextHands: {93: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {106:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {86:"c"},
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
    title: "第82型 一合マス基本",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| ********B| *********| *****BBBB| *****BWWW| *****BW**| ***B*BW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {75:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {64:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {106:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第83型",
    offence: false,
    answer: 2,
    setup: "*********| *********| *********| ********W| *********| *****WWWW| *****WBBB| *****WB**| ***W*WBW*| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {84:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {86:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "ホウリ込んでのコウ。",
            status: "correct"
        },
    }
},{
    title: "第84型 セキ",
    offence: false,
    answer: 1,
    setup: "*********| *********| *********| ********W| *********| *****WWWW| *****WBBB| *****WB**| ***W*WB**| --------W+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {97:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {86:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [{95:"*"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "セキ。",
            status: "correct"
        },
    }
},{
    title: "第84型 無条件生き",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| ********W| *********| *****WWWW| *****WBBB| *****WB**| ***W*WB**| --------W+",
    nextHands: {105: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {97:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {96:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {84:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [{96:"*"},{97:"|"}],
            nextHands: {106:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {96:"f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [{95:"*"}],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "オイオトシ。",
            status: "correct"
        },
    }
},{
    title: "第85型",
    offence: false,
    answer: 2,
    setup: "*********| *********| *********| ********W| *********| *****WWWW| *****WBBBW *****WB**| ***W*WB**| ---------+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {86:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {64:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [{75:"|"}],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {107:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第86型",
    offence: false,
    answer: 2,
    setup: "*********| *********| *********| ********W| *********| *****WWWWB *****WBBB| *****WB**| ***W*WB*W| ---------+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {75:"b", 105: "h"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {106:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {95:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {97:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。別の手順もあり。",
            status: "correct"
        },
        h: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {86:"i"},
            message: "",
            status: "continue"
        },
        i: {
            removeWhiteStones: [{75:"|"}],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {95:"j"},
            message: "",
            status: "continue"
        },
        j: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。別の手順もあり。",
            status: "correct"
        },
    }
},{
    title: "第87型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| ********B| *********| *****BBBB| ******WWW| *****BW**| ***B*BW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {75:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {86:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第88型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| ********B| *********| *****BBBBW ******WWW| *****BW**| ***B*BW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {85:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {86:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {108:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {71:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "万年コウ。",
            status: "correct"
        },
    }
},{
    title: "第89型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| ********B| *********| ******BBB| *****B*WW| *****BW**| ***B*BW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {97:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "五目ナカ手。",
            status: "correct"
        },
    }
},{
    title: "第89型 変化",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| ********B| *********| ******BBB| *****B*WW| *****BW**| ***B*BW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {85:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {72:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {97:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "ハネとキリが見合いの死。",
            status: "correct"
        },
    }
},{
    title: "第90型",
    offence: false,
    answer: 0,
    setup: "*********| *********| *********| ********W| *********| *****WWWW| *****WBBB| ***W*WB**| ****WBB*W| ---------+",
    nextHands: {95: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {85:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {97:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [{97:"|"}],
            nextHands: {106:"d"},
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
    title: "第91型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| ********B| *********| *****BBBB| *****BWWW| *****BW**| ***B*B**W| ---------+",
    nextHands: {75: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {105:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 64,
            removeBlackStones: [{75:"|"}],
            nextHands: {107:"d"},
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
    title: "第92型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *****BBBBB *****BWWW| *****BW**| ****B*BWW| ------B--+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {86:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 85,
            removeBlackStones: [],
            nextHands: {97:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "ダメヅマリ。",
            status: "correct"
        },
    }
},{
    title: "第93型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| ******BBBB *****B*WWW *****BW**| *****BBWW| ---------+",
    nextHands: {106: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {97:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 72,
            removeBlackStones: [],
            nextHands: {85:"c"},
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
    title: "第94型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *****BBBB| *****BWWB| ***B*BW*W| ****BWW**| ---------+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {96:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {95:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 84,
            removeBlackStones: [],
            nextHands: {106:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "眼あり眼なしで攻合い勝ち。",
            status: "correct"
        },
    }
},{
    title: "第94型 変化",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *****BBBB| *****BWWB| ***B*BW*W| ****BWW**| ---------+",
    nextHands: {97: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {86:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 104,
            removeBlackStones: [],
            nextHands: {106:"c"},
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
    title: "第95型",
    offence: false,
    answer: 2,
    setup: "*********| *********| *********| *********| *********| ****WWWWW| ******BBW| ****WWB*B| ****WBB**W ---------+",
    nextHands: {86: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {104:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 75,
            removeBlackStones: [],
            nextHands: {84:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 106,
            removeBlackStones: [],
            nextHands: {95:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {105:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {108:"f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [{106:"-"},{107:"-"},{96:"*"},{97:"|"}],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {96:"g"},
            message: "",
            status: "continue"
        },
        g: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第96型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *******B*| *********| ****BB*BB| ******WWB| ****BBW*W| ****BWW**| ---------+",
    nextHands: {96: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {95:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {106:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 84,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第97型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| ***BBBBBB| ***BWWWWW| ***B*****| ---------+",
    nextHands: {104: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {103:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 107,
            removeBlackStones: [],
            nextHands: {97:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {94:"d"},
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
    title: "第98型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| ********B| *********| ***BBBBBB| ***BWWWWW| ***B*W***| ----BBW--+",
    nextHands: {95: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {86:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 97,
            removeBlackStones: [],
            nextHands: {107:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "三目ナカ手。",
            status: "correct"
        },
    }
},{
    title: "第99型",
    offence: true,
    answer: 1,
    setup: "*********| *********| *********| *********| ********B| *********| ***BBBBBBW ***BWWWWW| ***B*W***| ----BBW--+",
    nextHands: {107: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {106:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "コウ。",
            status: "correct"
        },
    }
},{
    title: "第100型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ***BBBBB*| *B*BWW***| **BWW**W*| ---------+",
    nextHands: {85: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 96,
            removeBlackStones: [],
            nextHands: {97:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 83,
            removeBlackStones: [],
            nextHands: {102:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 103,
            removeBlackStones: [],
            nextHands: {107:"d"},
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
    title: "第101型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ***BBBBBB| *B*BWW**W| **BWW***W| --B------+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 83,
            removeBlackStones: [],
            nextHands: {84:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {102:"c",103:"g",104:"p"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {103:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [{94:"*"}],
            nextHands: {104:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 94,
            removeBlackStones: [],
            nextHands: {86:"f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "",
            status: "correct"
        },
        g: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [],
            nextHands: {102:"d"},
            message: "",
            status: "continue"
        },
        p: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {102:"q", 103:"r"},
            message: "",
            status: "continue"
        },
        q: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [{94:"*"}],
            nextHands: {103:"e"},
            message: "",
            status: "continue"
        },
        r: {
            removeWhiteStones: [],
            nextWhiteHand: 105,
            removeBlackStones: [{94:"*"}],
            nextHands: {102:"e"},
            message: "",
            status: "continue"
        },
    }
},{
    title: "第102型",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ***BBBBBBB *B*BWW**W| **BWW***W| ---------+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 83,
            removeBlackStones: [],
            nextHands: {97:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {84:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {106:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 108,
            removeBlackStones: [{97:"|"}],
            nextHands: {104:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {105:"f"},
            message: "",
            status: "continue"
        },
        f: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "オス手なし。",
            status: "correct"
        },
    }
},{
    title: "第102型 変化",
    offence: true,
    answer: 0,
    setup: "*********| *********| *********| *********| *********| *********| ***BBBBBBB *B*BWW**W| **BWW***W| ---------+",
    nextHands: {94: "a"},
    hands: {
        a: {
            removeWhiteStones: [],
            nextWhiteHand: 83,
            removeBlackStones: [],
            nextHands: {97:"b"},
            message: "",
            status: "continue"
        },
        b: {
            removeWhiteStones: [],
            nextWhiteHand: 95,
            removeBlackStones: [],
            nextHands: {104:"c"},
            message: "",
            status: "continue"
        },
        c: {
            removeWhiteStones: [],
            nextWhiteHand: 93,
            removeBlackStones: [],
            nextHands: {105:"d"},
            message: "",
            status: "continue"
        },
        d: {
            removeWhiteStones: [],
            nextWhiteHand: 86,
            removeBlackStones: [],
            nextHands: {84:"e"},
            message: "",
            status: "continue"
        },
        e: {
            removeWhiteStones: [],
            nextWhiteHand: null,
            removeBlackStones: [],
            nextHands: {},
            message: "オス手なし。",
            status: "correct"
        },
    }
 }];
