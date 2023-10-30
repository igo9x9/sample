const App = function() {
    const self = this;

    self.questions = ko.observableArray();
    self.question = ko.observable();

    self.page = ko.observable("title");

    let questionIndex = ko.observable(0);

    self.bookmarkFilter = ko.observable(false);
    self.statusFilter = ko.observable(true);

    self.toggleBookmarkFilter = function() {
        self.bookmarkFilter(!self.bookmarkFilter());
    };

    self.toogleStatusFilter = function() {
        self.statusFilter(!self.statusFilter());
    };

    self.showTitle = function() {
        self.page("title");
    };
    
    self.showMokuji = function() {
        self.page("mokuji");
    };

    self.showQuestion = function(question, index) {
        self.question(question);
        self.page("question");
        questionIndex(index);
    };

    for (n = 0; n < datas.length; n++) {
        self.questions.push(new Question(datas[n]));
    }

    self.refleshAll = function() {
        for (n = 0; n < self.questions().length; n++) {
            self.questions()[n].restart();
        }
        for (n = 0; n < self.questions().length; n++) {
            const q = self.questions()[n];
            let json = JSON.parse(localStorage.getItem(q.id));
            if (json) {
                self.questions()[n].status("");
            }
        }
    };

    self.refleshAllBookmark = function() {
        for (n = 0; n < self.questions().length; n++) {
            self.questions()[n].bookmark(false);
        }
        for (n = 0; n < self.questions().length; n++) {
            const q = self.questions()[n];
            let json = JSON.parse(localStorage.getItem(q.id));
            if (json) {
                self.questions()[n].bookmark(false);
            }
        }
    };

    self.shuffleQuestions = function() {
        self.questions(self.questions().sort(function(a,b) { return 0.5 - Math.random(); }));
    };

    self.canGoNextQuestion = ko.computed(function() {
        return questionIndex() < self.questions().length - 1;
    });

    self.goNextQuestion = function() {
        questionIndex(questionIndex() + 1);
        self.question(self.questions()[questionIndex()]);
    };

    self.canGoPrevQuestion = ko.computed(function() {
        return questionIndex() > 0;
    });

    self.goPrevQuestion = function() {
        questionIndex(questionIndex() - 1);
        self.question(self.questions()[questionIndex()]);
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
    }

    load();
};

const Question = function(data) {
    const self = this;

    self.id = data.id;
    let marks = data.setup;
    self.contents = ko.observable(marks);
    let nextHands = data.nextHands;
    self.message = ko.observable("");
    self.title = ko.observable(data.title);

    self.gameover = ko.observable(false);
    self.status = ko.observable("");

    self.moved = ko.observable(false);

    self.bookmark = ko.observable(false);

    self.firstStage = ko.observable(true);
    const firstStageAnswerNo = data.answer;
    self.isOffence = data.offence;

    function save() {
        localStorage.setItem(self.id, JSON.stringify({
            status: self.status(),
            bookmark: self.bookmark(),
        }));
    }

    self.choiseFirstStageAnswer = function(answerNo) {
        self.moved(true);
        if (answerNo == firstStageAnswerNo) {
            self.message("手順を示してください。");
            self.firstStage(false);
            return;
        }
        self.message("<span style='color:red'>不正解</span>");
    }

    self.toggleBookmark = function() {
        self.bookmark(!self.bookmark());
        save();
    };

    self.restart = function() {
        marks = data.setup;
        nextHands = data.nextHands;
        self.firstStage(true);
        self.contents(marks);
        self.message("");
        self.gameover(false);
        self.status("");
        self.moved(false);
        save();
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
            save();
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
                } else if (data.hands[nextHandLabel].status == "incorrect") {
                    self.gameover(true);
                    self.message("<span style='color:red'>不正解</span><br>" + data.hands[nextHandLabel].message);
                    self.status("incorrect");
                }
                nextHands = data.hands[nextHandLabel].nextHands;

                const removeBlackStones = data.hands[nextHandLabel].removeBlackStones;
                for (n = 0; n < removeBlackStones.length; n++) {
                    marks = replaceStone(marks, Object.keys(removeBlackStones[n])[0], Object.values(removeBlackStones[n])[0]);
                }

                self.contents(marks);
                save();

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
