const App = function() {
    const self = this;
    const questions = [];
    for (n = 0; n < datas.length; n++) {
        questions.push(new Question(datas[n]));
    }

    let questionNo = ko.observable(0);

    self.question = ko.observable(questions[questionNo()]);

    self.nextQuestion = function() {
        questionNo(questionNo() + 1);
        self.question(questions[questionNo()]);
    };

    self.canNextQuestion = ko.computed(function() {
        return questionNo() < questions.length - 1;
    });

    self.prevQuestion = function() {
        questionNo(questionNo() - 1);
        self.question(questions[questionNo()]);
    };

    self.canPrevQuestion = ko.computed(function() {
        return questionNo() > 0;
    });
};

const Question = function(data) {
    const self = this;

    let marks = data.setup;
    self.contents = ko.observable(marks);
    let nextHands = data.nextHands;
    self.message = ko.observable("");
    self.title = ko.observable(data.title);

    self.gameover = ko.observable(false);

    self.restart = function() {
        marks = data.setup;
        nextHands = data.nextHands;
        self.contents(marks);
        self.message("");
        self.gameover(false);
    };

    self.putPlayer = function(pos) {
        if (self.gameover()) {
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
            self.message("<span style='color:blue'>不正解</span>");
            self.gameover(true);
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
                    self.message("<span style='color:red'>正解</span><br>" + data.hands[nextHandLabel].message);
                } else if (data.hands[nextHandLabel].status == "incorrect") {
                    self.gameover(true);
                    self.message("<span style='color:blue'>不正解</span><br>" + data.hands[nextHandLabel].message);
                }
                nextHands = data.hands[nextHandLabel].nextHands;

                const removeBlackStones = data.hands[nextHandLabel].removeBlackStones;
                for (n = 0; n < removeBlackStones.length; n++) {
                    marks = replaceStone(marks, Object.keys(removeBlackStones[n])[0], Object.values(removeBlackStones[n])[0]);
                }

                self.contents(marks);

            }, 500);
        }
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
