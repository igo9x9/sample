const confirmDialog = new bootstrap.Modal(document.getElementById("confirm"));
let confirmMessage = ko.observable("");
let confirmCommitAction = null;

const hightScoreDialog = new bootstrap.Modal(document.getElementById("hightScoreMessage"));

const App = function() {
    const self = this;

    const BACKGROUND_COLOR_DEFAULT = "#ECF0F1";
    const BACKGROUND_COLOR_CORRECT = "#a4b0be";
    const BACKGROUND_COLOR_INCORRECT = "#f8d7da";
    self.backgroundColor = ko.observable(BACKGROUND_COLOR_DEFAULT);
    const setBackground = {
        default: function() {
            self.backgroundColor(BACKGROUND_COLOR_DEFAULT);
        },
        correct: function() {
            self.backgroundColor(BACKGROUND_COLOR_CORRECT);
        },
        incorrect: function() {
            self.backgroundColor(BACKGROUND_COLOR_INCORRECT);
        },
    };

    self.score = ko.observable(0);
    self.hightScore = ko.observable(0);

    const setScore = {
        reset: function() {
            self.score(0);
            localStorage.setItem("score", 0);
            const hightScore = localStorage.getItem("hightScore");
            if (hightScore) {
                self.hightScore(Number(hightScore));
            }
        },
        up: function() {
            self.score(self.score() + 1);
            localStorage.setItem("score", self.score());
            if (self.score() > self.hightScore()) {
                localStorage.setItem("hightScore", self.score());
            }
            if (self.score() === self.hightScore() + 1) {
                hightScoreDialog.show();
            }
        },
        down: function() {
            if (self.score() > 0) {
                self.score(self.score() - 1);
                localStorage.setItem("score", self.score());
            }
        },
    };

    self.questions = ko.observableArray();
    self.question = ko.observable();
    self.page = ko.observable("title");

    let questionIndex = ko.observable(0);

    self.bookmarkFilter = ko.observable(false);
    self.statusFilter = ko.observable(true);

    self.free = ko.observable();

    self.toggleFreeMode = function() {
        if (self.page() === "free") {
            self.page("question");
        } else {
            self.free(new Free(self.question().contents()));
            self.page("free");
        }
    };

    self.toggleBookmarkFilter = function() {
        self.bookmarkFilter(!self.bookmarkFilter());
        self.statusFilter(!self.bookmarkFilter());
    };

    self.toogleStatusFilter = function() {
        self.statusFilter(!self.statusFilter());
    };

    self.showTitle = function() {
        self.backgroundColor(BACKGROUND_COLOR_DEFAULT);
        self.page("title");
    };
    
    self.showMokuji = function() {
        self.backgroundColor(BACKGROUND_COLOR_DEFAULT);
        self.page("mokuji");
    };

    self.showQuestion = function(question, index) {
        question.restart();
        self.question(question);
        self.page("question");
        questionIndex(index);
    };

    for (n = 0; n < datas.length; n++) {
        self.questions.push(new Question(datas[n], n, setBackground, setScore));
    }

    self.refleshAll = function() {
        confirmMessage("成績を全てクリアします。よろしいですか？");
        confirmCommitAction = function() {
            for (n = 0; n < self.questions().length; n++) {
                self.questions()[n].restartHard();
            }
            self.score(0);
            confirmDialog.hide();
        };
        confirmDialog.show();
    };

    self.refleshAllBookmark = function() {
        confirmMessage("マークを全てクリアします。よろしいですか？");
        confirmCommitAction = function() {
            for (n = 0; n < self.questions().length; n++) {
                const q = self.questions()[n];
                q.bookmark(false);
                q.save();
            }
            confirmDialog.hide();
        };
        confirmDialog.show();
    };

    self.clearHightScore = function() {
        confirmMessage("最高記録をクリアします。本当によろしいですか？");
        confirmCommitAction = function() {
            self.hightScore(0);
            localStorage.setItem("hightScore", 0);
            confirmDialog.hide();
        };
        confirmDialog.show();
    };

    self.shuffleQuestions = function() {
        self.questions(self.questions().sort(function(a,b) { return 0.5 - Math.random(); }));
    };

    self.canGoNextQuestion = ko.computed(function() {
        if (self.bookmarkFilter() == false) {
            return questionIndex() < self.questions().length - 1;
        } else {
            return searchNextMarkedQuestion(questionIndex()) !== null;
        }
    });

    self.goNextQuestion = function() {
        if (self.bookmarkFilter() == false) {
            questionIndex(questionIndex() + 1);
        } else {
            const newIndex = searchNextMarkedQuestion(questionIndex());
            if (newIndex !== null) {
                questionIndex(newIndex);
            }
        }
        const q = self.questions()[questionIndex()];
        q.restart();
        self.question(q);
    };

    self.canGoPrevQuestion = ko.computed(function() {
        if (self.bookmarkFilter() == false) {
            return questionIndex() > 0;
        } else {
            return searchPrevMarkedQuestion(questionIndex()) !== null;
        }
    });

    self.goPrevQuestion = function() {
        if (self.bookmarkFilter() == false) {
            questionIndex(questionIndex() - 1);
        } else {
            const newIndex = searchPrevMarkedQuestion(questionIndex());
            if (newIndex !== null) {
                questionIndex(newIndex);
            }
        }
        const q = self.questions()[questionIndex()];
        q.restart();
        self.question(q);
    };

    const searchNextMarkedQuestion = function(index) {
        for (n = index + 1; n < self.questions().length; n++) {
            if (self.questions()[n].bookmark()) {
                return n;
            }
        }
        return null;
    };

    const searchPrevMarkedQuestion = function(index) {
        for (n = index - 1; n >= 0; n--) {
            if (self.questions()[n].bookmark()) {
                return n;
            }
        }
        return null;
    };

    function load() {
        for (n = 0; n < self.questions().length; n++) {
            const q = self.questions()[n];
            let json = JSON.parse(localStorage.getItem(q.id));
            if (json) {
                self.questions()[n].status(json.status);
                self.questions()[n].bookmark(json.bookmark);
            }
        }
        const score = localStorage.getItem("score");
        if (score) {
            self.score(Number(score));
        }
        const hightScore = localStorage.getItem("hightScore");
        if (hightScore) {
            self.hightScore(Number(hightScore));
        }
    }

    load();
};

const Free = function(data) {
    const self = this;

    self.contents = [];

    let blackTurn = true;

    const datas = data.split("");
    for (n = 0; n < datas.length; n++) {
        self.contents.push(ko.observable(datas[n]));
    }

    self.getImageFileName = function(char) {
        return convertMarkToImageFileName(char);
    };

    self.putPlayer = function(pos) {
        const char = self.contents[pos]();
        let nextChar;
        if (char === "B" || char === "W") {
            if (pos === 108) {
                nextChar = "+";
            } else if ((pos - 9) % 11 == 0) {
                nextChar = "|";
            } else if (pos > 98) {
                nextChar = "-";
            } else {
                nextChar = "*";
            }
        } else {
            if (blackTurn) {
                nextChar = "B";
            } else {
                nextChar = "W";
            }
            blackTurn = !blackTurn;
        }
        self.contents[pos](nextChar);
    };

};

const Question = function(data, id, setBackground, setScore) {

    const self = this;

    let marks = data.setup;
    let nextHands = data.nextHands;

    self.id = id;
    self.contents = ko.observable(marks);
    self.message = ko.observable("");
    self.title = ko.observable(data.title);
    self.gameover = ko.observable(false);
    self.status = ko.observable("");
    self.moved = ko.observable(false);
    self.bookmark = ko.observable(false);
    self.firstStage = ko.observable(true);

    const firstStageAnswerNo = data.answer;
    self.isOffence = data.offence;

    self.save = function() {
        localStorage.setItem(self.id, JSON.stringify({
            status: self.status(),
            bookmark: self.bookmark(),
        }));
    };

    self.choiseFirstStageAnswer = function(answerNo) {
        self.moved(true);
        if (answerNo == firstStageAnswerNo) {
            self.message("手順を示してください。");
            self.firstStage(false);
            return;
        }
        self.message("<span style='color:red'>不正解</span>");
        self.status("incorrect");
        setBackground.incorrect();
        setScore.reset();
        self.save();
    }

    self.toggleBookmark = function() {
        self.bookmark(!self.bookmark());
        self.save();
    };

    self.restart = function() {
        marks = data.setup;
        nextHands = data.nextHands;
        self.firstStage(true);
        self.contents(marks);
        self.message("");
        self.gameover(false);
        if (self.status() === "correct") {
            self.moved(true);
            setBackground.correct();
        } else if (self.status() === "incorrect") {
            self.moved(true);
            setBackground.incorrect();
        } else {
            self.moved(false);
            setBackground.default();
        }
        self.save();
    };
    
    // 成績も初期化する
    self.restartHard = function() {
        self.status("");
        self.restart();
    };

    // ユーザが手動でやり直す
    self.restartManual = function() {
        if (self.status() === "incorrect") {
            setScore.reset();
        }
        if (self.status() === "correct") {
            setScore.down();
        }
        self.restartHard();
    };

    self.putPlayer = function(pos) {

        console.log(pos);

        if (self.firstStage() || self.gameover()) {
            return;
        }

        const oldChar = marks.split("")[pos];
        if (!canPutStone(marks, pos)) {
            return;
        }

        marks = replaceStone(marks, pos, "black" ? "B" : "W");
        self.contents(marks);

        const nextHandLabel = nextHands[pos];

        if (!nextHandLabel) {
            self.message("<span style='color:red'>不正解</span>");
            self.gameover(true);
            self.status("incorrect");
            setScore.reset();
            setBackground.incorrect();
            self.save();
        }

        if (data.hands[nextHandLabel]) {
            const removeWhiteStones = data.hands[nextHandLabel].removeWhiteStones;
            for (n = 0; n < removeWhiteStones.length; n++) {
                marks = replaceStone(marks, Object.keys(removeWhiteStones[n])[0], Object.values(removeWhiteStones[n])[0]);
            }
        }
        self.contents(marks);
    
        if (data.hands[nextHandLabel]) {

            setTimeout(function() {

                const whiteHand = data.hands[nextHandLabel].nextWhiteHand;
                marks = replaceStone(marks, whiteHand, "W");

                if (data.hands[nextHandLabel].status == "correct") {
                    self.gameover(true);
                    self.message("<span style='color:blue'>正解</span><br>" + data.hands[nextHandLabel].message);
                    self.status("correct");
                    setBackground.correct();
                    setScore.up();
                } else if (data.hands[nextHandLabel].status == "incorrect") {
                    self.gameover(true);
                    self.message("<span style='color:red'>不正解</span><br>" + data.hands[nextHandLabel].message);
                    self.status("incorrect");
                    setScore.reset();
                    setBackground.incorrect();
                }
                nextHands = data.hands[nextHandLabel].nextHands;

                const removeBlackStones = data.hands[nextHandLabel].removeBlackStones;
                for (n = 0; n < removeBlackStones.length; n++) {
                    marks = replaceStone(marks, Object.keys(removeBlackStones[n])[0], Object.values(removeBlackStones[n])[0]);
                }

                self.contents(marks);
                self.save();

            }, 500);
        }

        self.moved(true);
    };

    self.getImageFileName = function(pos) {
        return convertMarkToImageFileName(marks.split("")[pos]);
    };

};

const convertMarkToImageFileName = function(mark) {
    let name = "";
    switch(mark) {
        case "*":
            name = "m.png";
            break;
        case "-":
            name = "b.png";
            break;
        case "|":
            name = "r.png";
            break;
        case "+":
            name = "rb.png";
            break;
        case "B":
            name = "black.png";
            break;
        case "W":
            name = "white.png";
            break;
        default:
    }
    return "img/" + name + "";
};

const canPutStone = function(stones, pos) {
    const mark = stones.split("")[pos];
    if (mark == "B" || mark == "W") {
        return false;
    }
    return true;
};

const replaceStone = function(stones, pos, mark) {

    const marks = stones.split("");

    let newStones = "";

    for (p = 0; p < marks.length; p ++) {
        if (p == pos) {
            newStones += mark;
        } else {
            newStones += marks[p];
        }
    }

    return newStones;
};

ko.applyBindings(new App());
