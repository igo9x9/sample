const App = function() {
    const self = this;

    self.questions = ko.observableArray();
    self.question = ko.observable();

    self.page = ko.observable("title");
    self.showMokuji = function() {
        self.page("mokuji");
    };

    self.showQuestion = function(question) {
        self.question(question);
        self.page("question");
    };

    for (n = 0; n < datas.length; n++) {
        self.questions.push(new Question(datas[n]));
    }

};

const Question = function(data) {
    const self = this;

    let marks = data.setup;
    self.contents = ko.observable(marks);
    let nextHands = data.nextHands;
    self.message = ko.observable("");
    self.title = ko.observable(data.title);

    self.gameover = ko.observable(false);
    self.status = ko.observable("");

    self.restart = function() {
        marks = data.setup;
        nextHands = data.nextHands;
        self.contents(marks);
        self.message("");
        self.gameover(false);
        self.status("");
    };

    self.putPlayer = function(pos) {
        console.log(pos);
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
            self.message("<span style='color:red'>不正解</span>");
            self.gameover(true);
            self.status("incorrect");
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
