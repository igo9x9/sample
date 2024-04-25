phina.define("ButtleScene", {
    superClass: 'DisplayScene',

    _playerInfo: null,

    _end: false,

    init: function(param) {
        const self = this;
        this.superInit(param);
        this.backgroundColor = 'black';

        this._playerInfo = param.playerInfo;

        this.miss = false;
        
        this.statusBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridX.unitWidth * 1.5,
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 30,
            x: this.gridX.center(),
            y: 690,
            cornerRadius: 2,
        }).addChildTo(this);

        this.hpLabel = Label({
            fill: '#fff',
            align:"left",
            x: -250,
        }).addChildTo(this.statusBox);
        
        function updateHpLabel() {
            self.hpLabel.text = "うさこ" + "  HP:" + self._playerInfo.hp + "  にんじん:" + self._playerInfo.carotte;
            if (self._playerInfo.hp <= 3) {
                self.hpLabel.fill = "red";
                self.statusBox.stroke = "red";
            } else {
                self.hpLabel.fill = "white" ;
                self.statusBox.stroke = "white";
            }
        }

        updateHpLabel();

        const msgBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridX.unitWidth * 5,
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 30,
            x: this.gridX.center(),
            y: 850,
            cornerRadius: 2,
        }).addChildTo(this);

        this.messageLabel = Label({
            fill: '#fff',
            align:"left",
            x: -250,
        }).addChildTo(msgBox);
       
        const ememyLevel = Math.ceil(self._playerInfo.map / 3);
        const nowQuestions = questions.filter((q) => q.level === ememyLevel && q.hp > 0);
        const enemyIndex = Math.floor(Math.random() * nowQuestions.length);
        // const nowQuestions = questions.filter((q) => q.hp > 0);
        // const enemyIndex = nowQuestions.findIndex((q) =>  q.name==="隅の死活第42型");
        const enemy = {
            name: nowQuestions[enemyIndex].name,
            steps: nowQuestions[enemyIndex].steps,
            level: nowQuestions[enemyIndex].level,
            rotate: Math.floor(Math.random() * 4),
        };

        this.updateButtleComment(enemy.name + ' が現れた！');
 
        const goban = Goban(enemy.steps, enemy.rotate).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5) + 20);
        
        goban.on("Miss", function() {
            self.miss = true;
            goban.tweener.by({y:-30},300).by({y:80},100).call(function(){
                self.statusBox.tweener.by({y:10},20).by({y:-20},20).by({y:20},20).by({y:-10},20).play();
            }).by({y:-50},100).call(function() {

                const damage = enemy.level;

                self._playerInfo.hp -= damage;
                self._playerInfo.hp = self._playerInfo.hp < 0 ? 0 : self._playerInfo.hp;

                self.addButtleComment(damage + "のダメージを受けた！");
                updateHpLabel();

                if (self._playerInfo.hp <= 0) {
                    goban.alpha = 0.5;

                    const messageLabel = Label({
                        text: "GAME\nOVER",
                        fontSize: 150,
                        fontWeight: 800,
                        fill: "black",
                        stroke: "white",
                        strokeWidth: 10,
                    }).addChildTo(self)
                    .setPosition(self.gridX.center(), -700)
                    .tweener.to({y: self.gridY.center() * 2/3}, 500, "easeOutExpo")
                    .play();

                    self.addButtleComment("うさこ は力尽きた…");

                    const exitBox = RectangleShape({
                        width: self.width,
                        height: self.height,
                        x: self.gridX.center(),
                        y: self.gridY.center(),
                    }).hide().setInteractive(true).addChildTo(self);
        
                    exitBox.on("pointstart", function() {
                        self.exit("TitleScene");
                    });
        
                }

            }).play();
        });

        goban.on("Complete", function() {
            goban.freeze();

            const messageLabel = Label({
                text: "正解",
                fontSize: 200,
                fontWeight: 800,
                fill: "white",
                stroke: "red",
                strokeWidth: 20,
            }).addChildTo(self)
            .setPosition(-700, self.gridY.center() / 2)
            .tweener.to({x: self.gridX.center()}, 400, "easeOutExpo")
            .wait(400)
            .to({x: self.gridX.center() + 600}, 200, "easeOutQuad")
            .play();
    
            setTimeout(function() {
                if (!self.miss) {
                    nowQuestions[enemyIndex].hp -= 1;
                }
                if (nowQuestions[enemyIndex].hp === 0) {
                    self.addButtleComment(enemy.name + " を倒した！");
                    if (Math.random() > 0.6) {
                        self._playerInfo.carotte += 1;
                        self.addButtleComment("にんじんを1本もらった");
                        updateHpLabel();
                    }
                    const enemyLevel = Math.ceil(self._playerInfo.map / 3);
                    const enemyNum = nowQuestions.filter((q) => q.level === enemyLevel && q.hp > 0).length;
                    if (enemyNum === 0) {
                        self._playerInfo.level = enemyLevel + 1;
                        self._playerInfo.hp = self._playerInfo.level * 5;
                    }

                } else {
                    self.addButtleComment(enemy.name + " は逃げた！");
                }
                self._end = true;
            }, 1000);

            const winLabel = Label

            const exitBox = RectangleShape({
                width: self.width,
                height: self.height,
                x: self.gridX.center(),
                y: self.gridY.center(),
            }).hide().setInteractive(true).addChildTo(self);

            exitBox.on("pointstart", function() {
                if (self._end) {
                    self.exit({playerInfo: self._playerInfo});
                }
            });
        });


    },
    updateButtleComment: function(text) {
        this.messageLabel.alpha = 0;
        this.messageLabel.y = 20;
        
        this.messageLabel.text = text;
        
        this.messageLabel.tweener
        .to({
            y: 0,
            alpha: 1,
        }, 300)
        .play();

    },
    addButtleComment: function(text) {
        let messageList = (this.messageLabel.text).split("\n");
        messageList.push(text);
        this.messageLabel.text = messageList.slice(messageList.length - 5 > 0 ? messageList.length - 5 : 0).join("\n");
    },
});

phina.define("BlackStone", {
    superClass: "CircleShape",
    init: function(r) {
        this.superInit({
            fill: 'black',
            stroke: 'black',
            strokeWidth: 1,
            radius: r,
        });
    }
});

phina.define("WhiteStone", {
    superClass: "CircleShape",
    init: function(r) {
        this.superInit({
            fill: 'white',
            stroke: 'white',
            strokeWidth: 1,
            radius: r,
        });
    }
});

phina.define("ClickableArea", {
    superClass: "RectangleShape",
    init: function(r, type, callback) {
        const self = this;
        this.superInit({
            width: r,
            height: r,
        });
        this.alpha = 0;
        this.type = type;
        this.setInteractive(true);
        this.on("pointstart", function(event) {
            callback();
        });
    },
});

phina.define("Goban", {
    superClass: "RectangleShape",

    _grid: Grid({width: 500, columns: 8}),

    _cells: [],
    _stones: Array.from(Array(9), () => new Array(9)),
    _freeAreas: [],
    
    freeze: function() {
        this._freeAreas.forEach(function(area) {
            area.remove();
        });
        self._freeAreas = [];
        App.flare('changescene');        
    },

    putBlackStone: function(x, y, justNow) {
        const stone = BlackStone(this._grid.unitWidth / 2 - 1).addChildTo(this);
        this._setPositionOnGrid(stone, x, y);
        if (!justNow) {
            this._stones[y][x] = stone;
        }
        return stone;
    },

    putWhiteStone: function(x, y) {
        const stone = WhiteStone(this._grid.unitWidth / 2 - 1).addChildTo(this);
        this._setPositionOnGrid(stone, x, y);
        this._stones[y][x] = stone;
        return stone;
    },

    _setPositionOnGrid: function(target, spanX, spanY) {
        target.setPosition(-1 * this.width/2 + this._grid.span(spanX), -1 * this.height/2 + this._grid.span(spanY));
    },

    init: function(steps, rotate) {

        this.superInit({
            width: 500,
            height: 500,
            // stroke: "white",
            strokeWidth:0,
            // fill: "#daa520",
        });

        this._rotate = rotate;
        this._steps = steps;
        this.stepNum = 0;
        
        this.drawGoban();
        this.setStones(steps[0], null);
        this.rotate();

    },
    rotate: function() {
        this.setRotation(90 * this._rotate);
    },
    drawGoban: function() {
        const self = this;

        this._cells.forEach(function(cell) {
            cell.remove();
        });
        self._cells = [];

        var ban = RectangleShape({
            width: self._grid.width + self._grid.unitWidth*2,
            height: self._grid.width + self._grid.unitWidth*2,
            fill: '#daa520',
            strokeWidth: 0,
        }).addChildTo(self);

        (9).times(function(spanX) {
            var startPoint = Vector2((spanX - 4) * self._grid.unitWidth, -1 * self._grid.width/2),
                endPoint = Vector2((spanX - 4) * self._grid.unitWidth, self._grid.width/2);
            
            PathShape({paths:[startPoint, endPoint], stroke: "black", strokeWidth: 2}).addChildTo(ban);
        });

        (9).times(function(spanY) {
            var startPoint = Vector2(-1 * self._grid.width/2, (spanY - 4) * self._grid.unitWidth),
                endPoint = Vector2(self._grid.width/2, (spanY - 4) * self._grid.unitWidth);
            
            PathShape({paths:[startPoint, endPoint], stroke: "black", strokeWidth: 2}).addChildTo(ban);
        });

    },
    nextStep: function() {
        const self = this;
        this.stepNum += 1;
        self.setStones(self._steps[self.stepNum], self._steps[self.stepNum - 1]);
        if (this.stepNum === this._steps.length - 1) {
            this.flare("Complete");
        }
    },
    setStones: function(step, laststep) {
        const self = this;

        // self._freeAreas = [];

        (9).times(function(y) {
            const raws = step[y].split("");
            (9).times(function(x) {
                const item = raws[x];

                const lastItem = !!laststep ? laststep[y].split("")[x] : null;

                if (lastItem === item) {
                    return;
                }

                if (!!self._stones[y][x]) {
                    // 前回は黒石だったのに今回は違う（つまり取られた）場合、
                    // すぐにremoveするのではなく、白石が置かれた後にremoveする
                    if (lastItem === "B") {
                        const blackstone = self._stones[y][x];
                        const fn = function() {
                            blackstone.remove();
                            App.off("whitestone-ready", fn);
                        };
                        App.on("whitestone-ready", fn);
                    } else {
                        self._stones[y][x].remove();
                    }
                }

                if (item === "W") {
                    self.putWhiteStone(x, y);
                } else if (item === "w") {
                    setTimeout(function() {
                        self.putWhiteStone(x, y);
                        App.flare('whitestone-ready');
                    }, 500);
                } else if (item === "B") {
                    self.putBlackStone(x, y);
                } else {
                    if (item === "N") {
                        const area = ClickableArea(self._grid.unitWidth, item, function() {
                            stone = self.putBlackStone(x, y, true);
                            self.flare("Collect");
                            self.nextStep();
                            const fn = function() {
                                stone.remove();
                                App.off("whitestone-ready", fn);
                            };
                            App.on("whitestone-ready", fn);
                        }).addChildTo(self);
                        self._setPositionOnGrid(area, x, y);
                        self._stones[y][x] = area;
                        self._freeAreas.push(area);
                    } else {
                        const area = ClickableArea(self._grid.unitWidth, item, function() {
                            const stone = self.putBlackStone(x, y, true);
                            setTimeout(function() {
                                stone.remove();
                            }, 100);
                            self.flare("Miss");
                        }).addChildTo(self);
                        self._setPositionOnGrid(area, x, y);
                        self._stones[y][x] = area;
                        self._freeAreas.push(area);
                    }
            }
            });
        });

        App.flare('changescene');

    }
});
