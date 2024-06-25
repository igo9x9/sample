phina.globalize();

// 設定
var
PLAYER_SPEED    =  5,
FPS             = 60,
BOX_WIDTH       = 64,
BOX_HEIGHT      = 64,
COLUMNS_COUNT_X = 10,
COLUMNS_COUNT_Y = 15,

DIRECTION = {
    UP   : 0,
    RIGHT: 1,
    DOWN : 2,
    LEFT : 3,
},

ASSETS = {
    image: {
        "player": "img/player.png",
        "player2": "img/player2.png",
        "floor": "img/floor.png",
        "wall": "img/wall.png",
        "tree": "img/tree.png",
        "tatefuda": "img/tatefuda.png",
        "flower": "img/flower.png",
        "arrow": "img/arrow.png",
        "hole": "img/hole.png",
        "npc1": "img/npc1.png",
        "npc2": "img/npc2.png",
        "npc3": "img/npc3.png",
        "npc4": "img/npc4.png",
        "npc6": "img/npc6.png",
        "boss": "img/boss.png",
        "feather": "img/feather.png",
        "megusuri": "img/megusuri.png",
        "revival": "img/revival.png",
        "carotte": "img/carotte.png",
        "countdown": "img/countdown.png",
        "telephone": "img/telephone.png",
        "ring": "img/ring.png",
        "kentou": "img/kentou.png",
        "book": "img/book.jpg",
        "crown": "img/crown.png",
    },
};

let lastLevel = 1;
let lastMap = 0;
let lastDirection = DIRECTION.DOWN;

const datastore = {
    hasData: function() {
        return window.localStorage.getItem("usako") ? true : false;
    },
    clear: function() {
        window.localStorage.removeItem("usako");
    },
    save: function() {
        const data = {player: tmpDate.playerInfo};
        data.lastLevel = lastLevel;
        data.lastMap = lastMap;
        data.mapLeftTop = mapLeftTop;
        data.questions = questions.map(function(q) {
            return {
                name: q.name,
                hp: q.hp
            };
        });
        window.localStorage.setItem("usako", JSON.stringify(data));
    },
    load: function() {
        const data = window.localStorage.getItem("usako");
        if (data) {
            const d = JSON.parse(data);
            tmpDate.playerInfo = d.player;
            if (tmpDate.playerInfo.items.telephone === undefined) { tmpDate.playerInfo.items.telephone = null; }
            if (tmpDate.playerInfo.crown === undefined) { tmpDate.playerInfo.crown = 0; }
            lastLevel = d.lastLevel;
            lastMap = d.lastMap;
            mapLeftTop = d.mapLeftTop;
            // questions = d.questions;
            d.questions.forEach(function(q1) {
                questions.some(function(q2) {
                    if (q1.name === q2.name) {
                        q2.hp = q1.hp;
                        return true;
                    }
                    return false;
                });
            });

        }
    },
}

// タイトルシーン
phina.define('TitleScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        const self = this;

        this.backgroundColor = "green";

        Label({
            text: 'うさこの',
            x: 320,
            y: 320,
            fontSize: 40,
            fill: "orange",
            fontWeight: 800,
            // strokeWidth: 5,
            // stroke: "white",
        }).addChildTo(this);
        Label({
            text: '囲碁死活ダンジョン',
            x: 320,
            y: 400,
            fontSize: 50,
            fill: "white",
            fontWeight: 800,
            // strokeWidth: 5,
            // stroke: "black",
        }).addChildTo(this);
        Player().setPosition(200,320).addChildTo(this);

        const newGameButton = RectangleShape({
            fill: 'transparent',
            stroke: "#fff",
            strokeWidth: 4,
            x: this.gridX.center(),
            y: 700,
            width: 200,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(this).setInteractive(true);
        const newGameLabel = Label({
            fill: '#fff',
            align: "center",
            text: "はじめから",
            fontSize: 25,
            fontWeight: 800,
        }).addChildTo(newGameButton);

        newGameButton.on("pointstart", function() {
            if (datastore.hasData()) {
                App.pushScene(MessageScene(QuestionMessage("セーブデータは消えますが\nよろしいですか？", () => {
                    setTimeout(function() {
                        datastore.clear();
                        self.exit('MapScene');
                    }, 10);
                    return null;
                }, null)));
            } else {
                self.exit('MapScene');
            }
        });

        if (datastore.hasData()) {
            const continueButton = RectangleShape({
                fill: 'transparent',
                stroke: "#fff",
                strokeWidth: 4,
                x: this.gridX.center(),
                y: 600,
                width: 200,
                height: 50,
                cornerRadius: 8,
            }).addChildTo(this).setInteractive(true);
            Label({
                fill: '#fff',
                align: "center",
                text: "つづきから",
                fontSize: 25,
                fontWeight: 800,
            }).addChildTo(continueButton);

            continueButton.on("pointstart", () => {
                datastore.load();
                self.exit('MapScene');
            });
        } else {
            newGameButton.setY(600);
            newGameLabel.text = "はじめる";
        }
        
        const aboutButton = RectangleShape({
            fill: 'transparent',
            strokeWidth: 0,
            x: this.gridX.center(5),
            y: 930,
            width: 200,
            height: 50,
        }).addChildTo(this).setInteractive(true);
        Label({
            fill: '#fff',
            align: "center",
            text: "このゲームについて",
            fontSize: 22,
        }).addChildTo(aboutButton);
        aboutButton.on("pointstart", () => {
            App.pushScene(AboutScene());
        });
    
        // データ初期化
        // tmpDate.playerInfo = {map: 1, level: 10, hp: 500, bossStep: 0, x: null, y: null,
        //     items: {
        //         carotte: 100,
        //         megusuri: 100,
        //         kentou: 100,
        //         feather: 100,
        //         revival: 100,
        //         telephone: 100,
        //         ring: false,
        //         countdown: false,
        //     }
        // };
        tmpDate.playerInfo = {map: 0, level: 1, hp: 5, bossStep: 0, x: null, y: null, crown: 0,
            items: {
                carotte: null,
                megusuri: null,
                feather: null,
                revival: null,
                kentou: null,
                telephone: null,
                ring: null,
                countdown: null,
            }
        };
        lastLevel = 1;
        lastMap = 0;
        lastDirection = DIRECTION.DOWN;

        questions.forEach(function(q) {
            q.hp = 1;
        });

    },
});

//-------------------------
// マップシーン
//-------------------------
phina.define('MapScene', {
    superClass: 'DisplayScene',

    onenter: function() {
        if (datastore.hasData()) {
            return;
        }
        const self = this;
        // this.player.hide();

        const box = RectangleShape({
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.width,
            height: this.height,
            fill: "black",
        }).addChildTo(this);

        const god = Sprite("npc6").setScale(2,2);
        god.alpha = 0;
        god.addChildTo(this)
            .setPosition(this.gridX.center(), self.gridY.span(4))
            .tweener.to({y: self.gridY.center(-2), alpha: 1}, 800)
            .call(function() {
                const msg3 = SimpleMessage("「以上！」");
                const msg2 = SimpleMessage("「村のはずれのダンジョンに住む\n魔王を倒すのじゃ」", () => {
                    // self.player.show();
                    god.tweener
                        .to({alpha: 0, y: self.gridY.span(4)}, 500)
                        .call(() => { god.remove(); })
                        .play();
                    box.tweener
                        .to({alpha: 0}, 500)
                        .call(() => { box.remove(); })
                        .play();
                    return msg3;})
                const msg = SimpleMessage("囲碁の神様\n「…うさこよ」", () => msg2);
                App.pushScene(MessageScene(msg));
            })
            .play();

    },

    /**
     * コンストラクタ
     */
    init: function(params) {
        this.superInit(params);

        const self = this;

        console.log("レベル  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20");
        console.log(
            "残数  " +
            questions.filter((q) => q.level === 1 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 2 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 3 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 4 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 5 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 6 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 7 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 8 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 9 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 10 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 11 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 12 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 13 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 14 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 15 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 16 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 17 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 18 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 19 && q.hp > 0).length.toString().padStart(3, " ") + "," +
            questions.filter((q) => q.level === 20 && q.hp > 0).length.toString().padStart(3, " "));

        //X軸のグリッドを作成
        this.stageX = Grid({
            width  : this.gridX.width,
            columns: COLUMNS_COUNT_X,
            offset : BOX_WIDTH / 2,
        });
        
        //Y軸のグリッドを作成
        this.stageY = Grid({
            width  : this.gridY.width,
            columns: COLUMNS_COUNT_Y,
            offset : BOX_WIDTH / 2,
        });
        
        //ステージ生成
        this.setStage(params.playerInfo);
        
        //タッチポイント
        this.touchPointX = null;
        this.touchPointY = null;
        this.touchCircle = null;

        this.on("resume", self.updateStatusLabel);
    },
    
    updateStatusLabel() {
        this.statusLabel.text = levelText(tmpDate.playerInfo.level) + '  HP: ' + tmpDate.playerInfo.hp + "／" + (tmpDate.playerInfo.level * 5);
        
        if (tmpDate.playerInfo.items.ring === true) {
            this.ringIcon.show();
        } else {
            this.ringIcon.hide();
        }

        if (tmpDate.playerInfo.items.countdown === true) {
            this.countdownIcon.show();
        } else {
            this.countdownIcon.hide();
        }

        if (tmpDate.playerInfo.map !==0 ) {
            const enemyLevel = tmpDate.playerInfo.map;
            let msg = "地下" + tmpDate.playerInfo.map + "階";
            if (tmpDate.playerInfo.map !== 20) {
                const enemyNum = questions.filter((q) => q.level === enemyLevel && q.hp > 0).length;
                if (enemyNum > 0) {
                    msg += "   残り" + enemyNum + "問";
                } else {
                    msg += "   全問クリア";
                }
            }
            this.floorInfoLabel.text = msg;
        }
    },
  
    /**
     * ステージ作成
     */
    setStage: function(playerInfo) {
        var stageX = this.stageX;
        var stageY = this.stageY;
        
        const self = this;

        let newGame = true;
        let mapToMap = false;

        if (!playerInfo) {
            datastore.load();
            playerInfo = tmpDate.playerInfo;
        } else {
            newGame = false;
            tmpDate.playerInfo = playerInfo;
            datastore.save();
        }

        if (playerInfo.map !== lastMap) {
            mapToMap = true;
            lastMap = playerInfo.map;
            lastDirection = DIRECTION.DOWN;
        }

        //背景色
        if (playerInfo.map === 0) {
            this.backgroundColor = '#22B14C';
        } else if (playerInfo.map === 20) {
            this.backgroundColor = '#880000';
        } else {
            this.backgroundColor = '#606060';
        }

        //マップのレイヤー
        var layer2 = DisplayElement().addChildTo(this);

        if (playerInfo.map !==0 ) {
            this.floorInfoLabel = Label({
                text: "",
                fill: "#fff",
                x: this.gridX.center(),
                y: 930,
            });
            this.floorInfoLabel.addChildTo(this);
        }

        const itemButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 450,
            y: -100,
            width: 150,
            height: 50,
            cornerRadius: 8,
        }).setOrigin(0, 0).addChildTo(this).setInteractive(true);
        Label({
            fill: '#fff',
            x: 80,
            y: 34,
            align: "center",
            text: "持ちもの",
            fontSize: 25,
            // fontWeight: 800,
        }).addChildTo(itemButton);
        itemButton.tweener.moveTo(450, 20, 500, "easeOutQuad").play();
        itemButton.on("pointstart", function() {
            App.pushScene(MenuScene());
        });

        self.ringIcon = Sprite("ring").addChildTo(itemButton).setPosition(15, 90).hide();
        if (tmpDate.playerInfo.items.ring === true) {
            self.ringIcon.show();
        }

        self.countdownIcon = Sprite("countdown").addChildTo(itemButton).setPosition(55, 90).hide();
        if (tmpDate.playerInfo.items.countdown === true) {
            self.countdownIcon.show();
        }

        var statusBox = RectangleShape({
            fill: '#000',
            stroke: "#000",
            // strokeWidth: 16,
            x: 20,
            y: -100,
            width: 400,
            height: 50,
            // cornerRadius: 16,
        }).setOrigin(0, 0).addChildTo(this);

        self.statusLabel = Label({
            fill: '#fff',
            x: 20,
            y: 34,
            align: "left",
        }).addChildTo(statusBox);
        self.updateStatusLabel();
        statusBox.tweener.moveTo(20, 20, 500, "easeOutQuad").play();

        for (let c = 0; c < tmpDate.playerInfo.crown; c++) {
            if (c < 20) {
                Sprite("crown").addChildTo(self.statusLabel).setPosition(c * 20, -30);
            }
        }

        //他の画面から来た時用にシェードを用意
        this.offShade(function() {

            // レベルアップ
            if (lastLevel !== playerInfo.level) {
                App.pushScene(LevelUpScene());
                lastLevel = playerInfo.level;
            }

            // ボス戦１
            if (tmpDate.playerInfo.bossStep === 1) {
                const msg = SimpleMessage("魔王\n「やるな！」", () => {
                    tmpDate.playerInfo.bossStep = 2;
                    self.plungeButtle();
                    return SimpleMessage("「しかし、まだだ！」");
                });
                App.pushScene(MessageScene(msg));
            }

            // ボス戦２
            if (tmpDate.playerInfo.bossStep === 2) {
                const msg = SimpleMessage("魔王\n「…ぐぬぬ」", () => {
                    tmpDate.playerInfo.bossStep = 3;
                    self.plungeButtle();
                    return SimpleMessage("「これはどうだ！」");
                });
                App.pushScene(MessageScene(msg));
            }

            // ゲームクリア
            if (tmpDate.playerInfo.bossStep === 3) {
                const msg = SimpleMessage("「やられたー！！！」");
                App.pushScene(MessageScene(msg));
                self.boss.tweener.to({alpha: 0, rotation: 360, scaleX:0, scaleY:0}, 1000).call(()=> {
                    self.boss.remove();
                    App.pushScene(MessageScene(SimpleMessage("うさこは魔王を倒した！", () => {
                        return SimpleMessage("…すると、", () => {
                            return SimpleMessage("どこからともなく、\n囲碁の神様の声が聞こえてきた。", () => {
                                return SimpleMessage("囲碁の神様\n「うさこよ、よくやった」",
                                    () => {
                                        const player2 = Player2();
                                        self.player.hide();
                                        player2.setPosition(player.x, player.y).addChildTo(self)
                                            .tweener.wait(500).call(function() {
                                                player2.remove();
                                                self.player.show();
                                                self.player.tweener.to({y: -100}, 200).wait(500).call(function() {App.pushScene(GameClearScene());}).play();
                                            }).play();
                                        tmpDate.playerInfo.crown += 1;
                                        return SimpleMessage("「さあ、地上へ戻してやろう！」");
                                    }
                                );
                            });
                        });
                    })));
                }).play();
            }
        });
        
        //プレイヤー生成
        var player = Player(lastDirection).addChildTo(this);
        
        //表示するマップのラベルを準備
        var stage = STAGE["B" + playerInfo.map];
        
        //ステージ情報を元にマップチップを配置
        for (var i = 0; i < stage.length; i += 1) {
            var rows = stage[i].split("");
            for (var j = 0; j < rows.length; j +=1) {
                var item = rows[j];
                
                if ((item === " " || item === "S") && playerInfo.map !== 0) {
                    FloorBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "0" || item === "S") {
                    // FloorBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item.match(/[a-z]/)) {
                    if (playerInfo.map !== 0) {
                        FloorBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                    }
                    // NPC                    
                    const npc = NPCBlock(item).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                    if (item === "z") {
                        self.boss = npc;
                    }
                }
                if (item === "H") {
                    // 病院
                    HospitalBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "W") {
                    // 水
                    WaterBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "B") {
                    // 橋
                    BridgeBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "1" && playerInfo.map === 0) {
                    //1に木
                    TreeBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "1" && playerInfo.map !== 0) {
                    //1に壁
                    WallBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "2") {
                    //2に花
                    FlowerBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "E") {
                    if (playerInfo.map !== 0) {
                        FloorBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                    }
                    //Eに穴
                    HoleBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (newGame || mapToMap) {
                    if (item === "S") {
                        //9はマップ上の主人公の位置なので保存する
                        playerInfo.x = stageX.span(j);
                        playerInfo.y = stageY.span(i) + 40;
                    }
                }
            }
        }

        if (newGame || mapToMap) {
            // マップデータ上の９だった場所が中心になるようにマップを移動
            layer2.children.each(function(block) {
                block.x += stageX.span(COLUMNS_COUNT_X / 2) - playerInfo.x;
                block.y += stageY.span(COLUMNS_COUNT_Y / 2) - playerInfo.y;
            });
        }

        if (mapToMap) {
            player.setPosition(stageX.span(COLUMNS_COUNT_X / 2), 0)
                .tweener.to({y:stageY.span(COLUMNS_COUNT_Y / 2)}, 400)
                .call(function() {
                    const player2 = Player2();
                    player.hide();
                    player2.setPosition(player.x, player.y).addChildTo(self)
                        .tweener.wait(200).call(function() {player.show();player2.remove();}).play();
                })
                .call(function() {
                    Label({
                        text: "地下" + playerInfo.map + "階",
                        fontSize: 130,
                        fontWeight: 800,
                        fill: "white",
                        // stroke: "white",
                        // strokeWidth: 5,
                    }).addChildTo(self)
                    .setPosition(self.gridX.center(), self.gridY.center(-3))
                    .tweener
                    .wait(500)
                    .to({alpha: 0}, 1000)
                    .call(function() {this.remove()})
                    .play();
                })
                .play();
        } else {
            //プレイヤーはいつだって真ん中
            player.setPosition(stageX.span(COLUMNS_COUNT_X / 2), stageY.span(COLUMNS_COUNT_Y / 2));
        }

        //クラス内で参照できるようにする
        this.player = player;
        this.layer2 = layer2;
        if (!newGame && !mapToMap) {
            this.setMapLeftTop(mapLeftTop);
        }

        this.on("pause", function() {
            self.canMovePlayer = false;
            self.player.vx = 0;
            self.player.vy = 0;
            self.touchPointX = null;
            self.touchPointY = null;
            self.touchCircle && self.touchCircle.remove();
        });

        this.on("resume", function() {
            self.canMovePlayer = true;
        });

    },

    // マップブロックの左上の座標を得る
    getMapLeftTop: function() {
        return {x: this.layer2.children[0].x, y: this.layer2.children[0].y};
    },

    // マップブロックの左上の座標を指定して、マップ全体をずらす
    setMapLeftTop: function(point) {
        this.layer2.children.each(function(block) {
            block.x += point.x - 32;
            block.y += point.y - 32;
        }, this);
    },
  
    /**
     * x軸のあたり判定
     */
    collisionX: function() {
        const player = this.player;
        const self = this;
        
        if (player.vx == 0) {
            return;
        }
    
        var newx = player.left + player.vx;
        var rect = Rect(newx + 20, player.top + 20, player.width / 4, player.height / 2);
        var hit = false;
        
        //ブロックとの衝突判定
        this.layer2.children.some(function(block) {
            if (block.className === 'FloorBlock' || block.className === "FlowerBlock" || block.className === "BridgeBlock") {
                return;
            }
            if (Collision.testRectRect(block, rect)) {
                if (block.className === 'HospitalBlock') {
                    this.nextScene('HospitalScene');
                }
                if (block.className === 'HoleBlock') {
                    this.update = null;
                    tmpDate.playerInfo.map += 1;
                    player.tweener
                        .to({x:block.x, y:block.y - 70}, 500, "easeOutQuart")
                        .to({y:block.y,alpha:0.5}, 100)
                        .call(function() {
                            player.hide();
                            self.nextScene('MapScene');
                        }).play();
                }
                if (block.className === "NPCBlock") {
                    block.say();
                }
                // if (block.className === "TatefudaBlock") {
                //     block.read();
                // }
                if (player.vx > 0) {
                    //右に移動中に衝突
                    player.vx = 0;
                } else {
                    //左に移動中に衝突
                    if (player.vx < 0) {
                        player.vx = 0;
                    }
                }
                hit = true;
            }
        }.bind(this));
        if (!hit) {
            // マップチップを動かす
            this.layer2.children.each(function(block) {
                block.x += -this.player.vx;
            }, this);
        }
    },
    
    /**
     * y軸のあたり判定
     */
    collisionY: function() {
        const player = this.player;
        const self = this;

        if (player.vy == 0) {
            return;
        }
        
        var newy = player.top + player.vy;
        var rect = Rect(player.left + 20, newy + 20, player.width / 4, player.height / 2);
        var hit = false;
        
        //ブロックとの衝突判定
        this.layer2.children.some(function(block) {
            if (block.className === 'FloorBlock' || block.className === "FlowerBlock" || block.className === "BridgeBlock") {
                return;
            }
            if (Collision.testRectRect(block, rect)) {
                if (block.className === 'HospitalBlock') {
                    this.nextScene('HospitalScene');
                }
                if (block.className === "TatefudaBlock") {
                    block.read();
                }
                if (block.className === "NPCBlock") {
                    block.say();
                }
                if (block.className === 'HoleBlock') {
                    this.update = null;
                    tmpDate.playerInfo.map += 1;
                    player.tweener
                        .to({x:block.x, y:block.y - 70}, 500, "easeOutQuart")
                        .to({y:block.y,alpha:0.5}, 100)
                        .call(function() {
                            player.hide();
                            self.nextScene('MapScene');
                        }).play();
                }

                if (player.vy > 0) {
                    //上に移動中に衝突
                    player.vy = 0;
                } else {
                    if (player.vy < 0) {
                        //下に移動中に衝突
                        player.vy = 0;
                    }
                }
                hit = true;
            }
        }.bind(this));
        if (!hit) {
            // マップチップを動かす
            this.layer2.children.each(function(block) {
                block.y += -this.player.vy;
            }, this);
        }
    },
  
    /**
     * プレイヤーの動作
     */
    movePlayer: function(app) {
        var player = this.player;
        var key = app.keyboard;

        var isXMove = false;
        var isYMove = false;

        //上下
        if (key.getKey('up')) {
            if (player.direction !== DIRECTION.UP) {
                player.isMoveStart = false;
            }

            player.vy = -PLAYER_SPEED;
            player.direction = DIRECTION.UP;
            player.isMove = true;
            isYMove = true;

        } else if (key.getKey('down')) {
            if (player.direction !== DIRECTION.DOWN) {
            player.isMoveStart = false;
            }

            player.vy = PLAYER_SPEED;
            player.direction = DIRECTION.DOWN;
            player.isMove = true;
            isYMove = true;

        } else {
            player.vy = 0;
        }

        //左右
        if (key.getKey('left')) {
            player.vx = -PLAYER_SPEED;
            player.isMove = true;
            isXMove = true;

            if (!isYMove) {
                if (player.direction !== DIRECTION.LEFT) {
                    player.isMoveStart = false;
                    player.direction = DIRECTION.LEFT
                }
            }

        } else if (key.getKey('right')) {
            player.vx = PLAYER_SPEED;
            player.isMove = true;
            isXMove = true;

            if (!isYMove) {
                if (player.direction !== DIRECTION.RIGHT) {
                    player.isMoveStart = false;
                    player.direction = DIRECTION.RIGHT;
                }
            }

        } else {
            player.vx = 0;
        }


        //タッチを取得して保存
        var p = app.pointer;
        if (p.getPointingStart()) {
            this.touchPointX = p.x;
            this.touchPointY = p.y;
            this.touchMark(p.x, p.y);
        }

        if (p.getPointingEnd()) {
            this.touchPointX = null;
            this.touchPointY = null;
            if (this.touchCircle != null) {
                this.touchCircle.remove();
            }
        }

        if (this.touchPointX != null && this.touchPointY != null) {
            var OFFSET = 30;
            if (this.touchPointY - OFFSET > p.y) {
                if (player.direction !== DIRECTION.UP) {
                    player.isMoveStart = false;
                }

                player.vy = -PLAYER_SPEED;
                player.direction = DIRECTION.UP;
                player.isMove = true;
                isYMove = true;
            } else if (this.touchPointY + OFFSET < p.y) {
                if (player.direction !== DIRECTION.DOWN) {
                player.isMoveStart = false;
                }

                player.vy = PLAYER_SPEED;
                player.direction = DIRECTION.DOWN;
                player.isMove = true;
                isYMove = true;
            } else {
                player.vy = 0;
            }

            if (this.touchPointX - OFFSET > p.x) {
                player.vx = -PLAYER_SPEED;
                player.isMove = true;
                isXMove = true;

                if (!isYMove) {
                    if (player.direction !== DIRECTION.LEFT) {
                        player.isMoveStart = false;
                        player.direction = DIRECTION.LEFT
                    }
                }
            } else if (this.touchPointX + OFFSET < p.x) {
                player.vx = PLAYER_SPEED;
                player.isMove = true;
                isXMove = true;

                if (!isYMove) {
                    if (player.direction !== DIRECTION.RIGHT) {
                    player.isMoveStart = false;
                    player.direction = DIRECTION.RIGHT;
                    }
                }
            } else {
                player.xy = 0;
            }
        }

        if (player.vx === 0 && player.vy === 0) {
            player.isMove = false;
            player.isMoveStart = false;
        }

        if (key.getKeyDown('b')) {
            this.plungeButtle();
        }

    },
  
    touchMark: function(x, y) {
        this.touchCircle = CircleShape({
            fill: '#fff',
            stroke: 0,
            radius: 50,
            alpha : 0.2,
        }).addChildTo(this);
        this.touchCircle.x = x;
        this.touchCircle.y = y;

        this.touchCircle.tweener
        .to({
            alpha: 0.2,
        }, 100)
        .to({
            alpha: 0.5,
        }, 100)
        .setLoop(true);

        this.touchCircle.tweener
        .to({
            radius: 45,
        }, 200)
        .to({
            radius: 50,
        }, 200)
        .setLoop(true);
    },
  
    /**
     * 引数のラベルの画面へ遷移
     */
    nextScene: function(nextLabel) {
        var self = this;

        //動き方を決める
        var easing = 'easeOutExpo';
        if (nextLabel === 'ButtleScene') {
            easing = 'easeInOutBounce';
        }

        mapLeftTop = this.getMapLeftTop();

        lastDirection = this.player.direction;

        //シェードを開いた後に画面遷移
        this.onShade(function() {
           self.exit(nextLabel, {playerInfo: tmpDate.playerInfo});
        }, easing);
    },
  
    /**
     * シェードが開く
     */
    onShade: function(collback, easing) {
        var circle = CircleShape({
            fill: '#000',
            stroke: 0,
            radius: 1,
        }).addChildTo(this);
        circle.x = this.stageX.center() + 15;
        circle.y = this.stageY.center();

        circle.tweener
        .by({
            radius: 600
        }, 400, easing)
        .call(function() {
            if (typeof collback === 'function') {
                collback();
            }
        });
    },
  
    /**
     * シェードが閉じる
     */
    offShade: function(callback) {
        var circle = CircleShape({
            fill: '#000',
            stroke: 0,
            radius: 600,
        }).addChildTo(this);
        circle.x = this.stageX.center() + 15;//微調整
        circle.y = this.stageY.center();

        circle.tweener
        .to({
            radius: 1
        }, 600, 'easeOutExpo')
        .call(function() {
            this.remove();
            if (typeof callback === 'function') {
                callback();
            }
        });
    },
  
    /**
     * ランダムでバトルに突入
     */
    randomButtle: function() {
        var r = (tmpDate.playerInfo.items.ring === true ? Random.randint(1, 10) : Random.randint(1, 200));
        if (r === 1) {
            const enemyLevel = tmpDate.playerInfo.map;
            if (questions.filter((q) => q.level === enemyLevel && q.hp > 0).length === 0) {
                return;
            }
            // @@
           this.plungeButtle();
        }
    },
  
    /**
     * バトル突入
     */
    plungeButtle: function() {
        //更新を止める
        this.update = null;

        //バトル画面に遷移
        this.nextScene('ButtleScene');
    },

    canMovePlayer: true,
  
    /**
     * 更新
     */
    update: function(app) {
        if (!this.canMovePlayer) {
            return;
        }
        //キャラクターの動作
        this.movePlayer(app);

        //y軸のあたり判定
        this.collisionY();

        //x軸のあたり判定
        this.collisionX();

        if (this.player.isMove && tmpDate.playerInfo.map !== 0) {
            //移動中は一定の確率でバトルに突入
            this.randomButtle();
        }
    }
});

//-------------------------
// プレイヤークラス
//-------------------------
phina.define('Player', {
    superClass: 'Sprite',
  
    init: function(direction) {
        this.superInit("player", 64, 64);

        //キャラクターへのタッチを許可
        this.setInteractive(true);

        //向き
        //画像の向き
        if (direction !== undefined) {
            this.direction = direction;
            this.frameIndex = direction;
        } else {
            this.direction = DIRECTION.DOWN;
            this.frameIndex = DIRECTION.DOWN;
        }

        //移動フラグ
        this.isMove = false;

        //移動開始フラグ
        this.isMoveStart = false;
    },
  
    update: function(app) {
        this.directionAnime(app);
    },
  
    // 向きに合わせたアニメーション
    directionAnime: function(app) {
        if (this.isMove) {
            if (!this.isMoveStart) {
                this.frameIndex = this.direction;
                this.isMoveStart = true;
            }
            if (app.frame % 8 === 0) {
                if (this.frameIndex > 3) {
                    this.frameIndex = this.direction;
                } else {
                    this.frameIndex += 4;
                }
            }
        }
    },
});

//-------------------------
// 壁クラス
//-------------------------
phina.define('WallBlock', {
    superClass: 'Sprite',

    init: function() {
        this.superInit("wall", BOX_WIDTH, BOX_HEIGHT);
    },
});

//-------------------------
// 木クラス
//-------------------------
phina.define('TreeBlock', {
    superClass: 'Sprite',
    
    init: function() {
      this.superInit("tree", BOX_WIDTH, BOX_HEIGHT);
    },
  });
  
//-------------------------
// 家クラス
//-------------------------
phina.define('HomeBlock', {
  superClass: 'Sprite',
  
  init: function() {
    this.superInit("home", BOX_WIDTH, BOX_HEIGHT);
  },
});

//-------------------------
// 病院クラス
//-------------------------
phina.define('HospitalBlock', {
    superClass: 'Sprite',
    
    init: function() {
      this.superInit("hospital", BOX_WIDTH, BOX_HEIGHT);
    }
});

//-------------------------
// 穴クラス
//-------------------------
phina.define('HoleBlock', {
    superClass: 'Sprite',
    
    init: function() {
        this.superInit("hole", BOX_WIDTH, BOX_HEIGHT);
    }
});

//-------------------------
// NPCクラス
//-------------------------
phina.define('NPCBlock', {
    superClass: 'Sprite',
    _text: "",
    _messageFnc: null,
    _wait: false,
    _done: false,
    init: function(npc_id) {
        const self = this;
        let yes = null;
        switch(npc_id) {
            case "a":
                this.superInit("npc1", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = ()=> SimpleMessage("村人\n「地下に行くほど、間違えた時に\n受けるダメージが大きくなるよ。",
                    () => SimpleMessage("だから、自分のレベルを上げてから\n次の階に進むのが定石だね」"));
                break;
            case "b":
                this.superInit("npc2", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => {
                    if (tmpDate.playerInfo.crown === 0) {
                        return SimpleMessage("村人\n「下の階に降りたら、上の階には\nもう戻れないの。慎重に進んでね。", () => SimpleMessage("でも『大鷲の羽根』を使うと\n戻れるらしいわ」"));
                    } else if (tmpDate.playerInfo.level > 1) {
                        return QuestionMessage("村人\n「またダンジョンに行くのね。\n気分転換にレベル1に戻ってみる？", () => {
                            tmpDate.playerInfo.level = 1;
                            tmpDate.playerInfo.hp = 5;
                            lastLevel = 1;
                            return SimpleMessage("「そうこなくっちゃ！」");
                        }, () => SimpleMessage("「あら残念」"));
                    } else {
                        return SimpleMessage("「がんばってね！」");
                    }
                };
                break;
            case "c":
                this.superInit("npc3", BOX_WIDTH, BOX_HEIGHT);
                if (tmpDate.playerInfo.crown === 0) {
                    const yes = ()=>{
                        tmpDate.playerInfo.items.carotte += 1;
                        App._scenes[1].updateStatusLabel();
                        return SimpleMessage("「がんばれよ！\nちなみに問題は全部黒番だぜ！」", () => SimpleMessage("にんじんを1本くれた。"));
                    };
                    this._messageFnc = () => {
                        if (tmpDate.playerInfo.items.carotte === null) {
                            return QuestionMessage("村人\n「ダンジョンに行くのかい？」", yes, ()=>SimpleMessage("「そうかい」"));
                        } else {
                            return SimpleMessage("村人\n「にんじん食べたら元気でるぜ！」");
                        }
                    };
                } else {
                    this._messageFnc = () => SimpleMessage("村人\n「よう、おかえり。",
                        () => SimpleMessage("あそこのダンジョン、\nまた魔王が住みついたらしいぜ」"));
                }
                break;
            case "d":
                this.superInit("npc4", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => SimpleMessage("村人\n「HPを回復する方法は、\nにんじんを食べる、\nレベルアップする、の２つよ」");
                break;
            case "f":
                this.superInit("npc6", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => {
                    if (tmpDate.playerInfo.items.ring === null) {
                        tmpDate.playerInfo.items.ring = false;
                        return SimpleMessage("囲碁の神様\n「ワシからのプレゼントじゃ。」", () => SimpleMessage("修行の指輪 を手に入れた！", () => SimpleMessage("囲碁の神様\n「便利な指輪じゃよ。大切にな。」", )));
                    } else {
                        return SimpleMessage("囲碁の神様\n「ふぉっふぉっ」");
                    }
                }
                break;
            case "g":
                this.superInit("npc6", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => {
                    if (tmpDate.playerInfo.items.countdown === null) {
                        tmpDate.playerInfo.items.countdown = false;
                        return SimpleMessage("囲碁の神様\n「ワシからのプレゼントじゃ。」", () => SimpleMessage("死の腕時計 を手に入れた！", () => SimpleMessage("囲碁の神様\n「とても危険な腕時計じゃよ。\n気を付けてな。」", )));
                    } else {
                        return SimpleMessage("囲碁の神様\n「ふぉっふぉっ」");
                    }
                }
                break;
            case "p":
                this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => SimpleMessage("「死活ダンジョン入り口」");
                break;

            case "z":
                this.superInit("boss");
                if (tmpDate.playerInfo.bossStep === 0) {
                    const lastBattle = function() {
                        tmpDate.playerInfo.bossStep = 1;
                        App._scenes[1].plungeButtle();
                        return SimpleMessage("最後の試練だ！");
                    };
                    this._messageFnc = () => SimpleMessage("魔王\n「よく来たな」", lastBattle);
                } else {
                    this._messageFnc = null;
                }
            break;

            default:
        }
    },
    say: function() {
        const self = this;
        if (self._wait) {
            return;
        }
        if (!self._messageFnc) {
            return;
        }
        App.pushScene(MessageScene(this._messageFnc()));
        // 連続してメッセージが出るのをやわらげる
        self._wait = true;
        const fn = function() {
            setTimeout(function() {
                self._wait = false;
            }, 1000);
            App.off("poped", fn);
        };
        App.on("poped", fn);
    }
});

// メッセージ基底クラス
phina.define("Message", {
    text: "",
    init: function(text) {
        this.text = text;
    }
});

// 単純メッセージクラス
phina.define("SimpleMessage", {
    superClass: 'Message',
    nextMessageFnc: null,
    init: function(text, nextMessageFnc) {
        this.superInit(text);
        this.nextMessageFnc = nextMessageFnc;
    }
});

// 質問メッセージクラス
phina.define("QuestionMessage", {
    superClass: 'Message',
    yesCallback: null,
    noCallback: null,
    init: function(text, yesCallback, noCallback) {
        this.superInit(text);
        this.yesCallback = yesCallback;
        this.noCallback = noCallback;
    }
});

/*
 * メッセージシーン
 */
phina.define("MessageScene", {
    superClass: 'DisplayScene',
    _message: null,
    _messageBox: null,
    _questionBox: null,
    _arrow: null,
    init: function(message) {
        this.superInit();
        var self = this;
        
        this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

        self._messageBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridX.unitWidth * 6,
            fill: 'white',
            stroke: "black",
            strokeWidth: 16,
            x: this.gridX.center(),
            y: 820,
            cornerRadius: 16,
        }).addChildTo(this);
        
        self._messageBox.onpointstart = function() {
            if (self._message.nextMessageFnc) {
                self.setMessageObj(self._message.nextMessageFnc());
                self.printText();
            } else {
                self.exit();
            }
        };

        this._arrow = Sprite("arrow", BOX_WIDTH, BOX_HEIGHT)
            .addChildTo(self._messageBox)
            .setPosition(260, 80)
            .hide();

        this.messageLabel = Label({
            fill: 'black',
            align:"left",
            x: -250,
        }).addChildTo(self._messageBox);
        
        self._questionBox = RectangleShape({
            width: 300,
            height: 80,
            fill: 'white',
            stroke: "black",
            strokeWidth: 16,
            x: this.gridX.center(2),
            y: 700,
            cornerRadius: 10,
        }).addChildTo(this);

        this.yesLabel = Label({
            fill: 'black',
            align:"left",
            x: -70,
            y: 2,
            text: "はい",
            align: "center",
        }).addChildTo(self._questionBox).setInteractive(true);
        
        this.yesLabel.onpointstart = function() {
            if (self._message === null) return;
            if (self._message.className === "QuestionMessage") {
                if (!!self._message.yesCallback) {
                    self.setMessageObj(self._message.yesCallback());
                    if (self._message !== null) {
                        self.printText();
                    } else {
                        self.exit();
                    }
                } else {
                    self.exit();
                }
            }
        };

        this.noLabel = Label({
            fill: 'black',
            align:"left",
            x: 50,
            y: 2,
            text: "いいえ",
            align: "center",
        }).addChildTo(self._questionBox).setInteractive(true);

        this.noLabel.onpointstart = function() {
            if (self._message.className === "QuestionMessage") {
                if (!!self._message.noCallback) {
                    self.setMessageObj(self._message.noCallback());
                    if (self._message !== null) {
                        self.printText();
                    } else {
                        self.exit();
                    }
                } else {
                    self.exit();
                }
            }
        };

        self.setMessageObj(message);

        self.printText();

    },
    printText: function() {
        const self = this;
        this._arrow.hide();
        this.messageLabel.alpha = 0;
        this.messageLabel.y = 20;
        this.messageLabel.text = this._message.text;
        this.messageLabel.tweener.to({y: 0, alpha: 1}, 300)
            .call(() => {
                if (self._message.className !== "QuestionMessage") {
                    self._arrow.show();
                }
            })
            .play();
    },
    setMessageObj: function(message) {
        const self = this;
        self._message = message;
        if (message !== null && message.className === "QuestionMessage") {
            self._messageBox.setInteractive(false);
            self._questionBox.show();
        } else {
            self._messageBox.setInteractive(true);
            self._questionBox.hide();
        }
    },
});

// メニューシーン
phina.define("MenuScene", {
    superClass: 'DisplayScene',
    init: function(sceneName) {
        this.superInit();
        var self = this;
        var menuScene = this;

        this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

        const Box = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 16,
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.gridX.width - 100,
            height: this.gridY.width - 50,
            cornerRadius: 16,
        }).addChildTo(this);

        const closeButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 400,
            width: 150,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        const closeButtonLabel = Label({
            fill: '#fff',
            x: 0,
            y: 0,
            align: "center",
            text: "とじる",
            fontSize: 25,
        }).addChildTo(closeButton);
        closeButton.on("pointstart", function() {
            self.exit();
        });

        self.statusLabel = Label({
            fill: "white",
            fontSize: 30,
            y: -410,
            fontWeight: 800,
        }).addChildTo(Box);

        Label({
            fill: "white",
            fontSize: 30,
            x: -230,
            y: -360,
            align: "left",
            text: "道具",
        }).addChildTo(Box);

        // にんじん
        const carotteButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: -300,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.carotteLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(carotteButton);
        carotteButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.carotte === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.carotte === 0) {
                message = SimpleMessage("食べるとHPが回復する。");
            } else if (tmpDate.playerInfo.hp >= tmpDate.playerInfo.level * 5) {
                message = SimpleMessage("食べるとHPが回復する。\n今はHPが満タンです。");
            } else {
                const yesFnc = () => {
                    const kaifuku = Math.ceil(tmpDate.playerInfo.level / 2);
                    tmpDate.playerInfo.items.carotte -= 1;
                    tmpDate.playerInfo.hp += kaifuku;
                    if (tmpDate.playerInfo.hp > tmpDate.playerInfo.level * 5) {
                        tmpDate.playerInfo.hp = tmpDate.playerInfo.level * 5;
                    }
                    if (sceneName === "BattleScene") {
                        App._scenes[1].updateHpLabel();
                    } else {
                        App._scenes[1].updateStatusLabel();
                    }
                    self.refreshText();
                    return SimpleMessage("HPが" + kaifuku + "回復しました。");
                };
                message = QuestionMessage("食べるとHPが回復する。\n1本食べますか？", yesFnc, null);
            }
            App.pushScene(MessageScene(message));
        });
        self.carotteIcon = Sprite("carotte").addChildTo(carotteButton).setPosition(-200, 0).hide();

        // 検討の碁盤
        const kentouButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: -220,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.kentouLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(kentouButton);
        kentouButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.kentou === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.kentou === 0) {
                message = SimpleMessage("自由に石を置いて検討できる碁盤。\n使い終わると没収される。");
            } else if (sceneName !== "BattleScene") {
                message = SimpleMessage("自由に石を置いて検討できる碁盤。\n使い終わると没収される。\n戦闘中に使います。");
            } else {
                const yesFnc = () => {
                    setTimeout(function() {
                        tmpDate.playerInfo.items.kentou -= 1;
                        self.refreshText();
                        App.pushScene(KentouScene());
                    }, 10);
                    return null;
                };
                message = QuestionMessage("自由に石を置いて検討できる碁盤。\n使い終わると没収される。\n使いますか？", yesFnc, null);
            }
            App.pushScene(MessageScene(message));
        });
        self.kentouIcon = Sprite("kentou").addChildTo(kentouButton).setPosition(-200, 0).hide();

        // 復活の線香
        const revivalButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: -140,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.revivalLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(revivalButton);
        revivalButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.revival === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.revival === 0) {
                message = SimpleMessage("今いる階の敵がすべて復活する。");
            } else if (sceneName === "BattleScene") {
                message = SimpleMessage("今いる階の敵がすべて復活する。\n戦闘中は使えない。");
            } else if (tmpDate.playerInfo.map === 0) {
                message = SimpleMessage("今いる階の敵がすべて復活する。\nここでは使えない。");
            } else {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.revival -= 1;
                    self.refreshText();
                    questions.forEach((q) => {
                        if (q.level === tmpDate.playerInfo.map)  {
                            q.hp = 1;
                        }
                    });
                    return SimpleMessage("この階の敵が復活した！");
                };
                message = QuestionMessage("今いる階の敵がすべて復活する。\n1本使いますか？", yesFnc, null);
            }
            App.pushScene(MessageScene(message));
        });
        self.revivalIcon = Sprite("revival").addChildTo(revivalButton).setPosition(-200, 0).hide();

        // 大鷲の羽根
        const featherButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: -60,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.featherLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(featherButton);
        featherButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.feather === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.feather === 0) {
                message = SimpleMessage("いまの階より上の階に戻れる。\nどの階かは分からない。");
            } else if (sceneName === "BattleScene") {
                message = SimpleMessage("いまの階より上の階に戻れる。\n戦闘中は使えない。");
            } else if (tmpDate.playerInfo.map < 2) {
                message = SimpleMessage("いまの階より上の階に戻れる。\nここでは使えない。");
            } else {
                const yesFnc = () => {
                    const nowMap = tmpDate.playerInfo.map;
                    tmpDate.playerInfo.map = Math.randint(1, nowMap - 1);
                    tmpDate.playerInfo.items.feather -= 1;
                    self.refreshText();
                    App._scenes[1].nextScene("MapScene");
                    self.exit();
                    menuScene.exit();
                    return SimpleMessage("ジャンプ！");
                };
                message = QuestionMessage("いまの階より上の階に戻れる。\nどの階かは分からない。\n1枚使いますか？", yesFnc, null);
            }
            App.pushScene(MessageScene(message));
        });
        self.featherIcon = Sprite("feather").addChildTo(featherButton).setPosition(-200, 0).hide();

        // テレフォン
        const telephoneButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 20,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.telephoneLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(telephoneButton);
        telephoneButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.telephone === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.telephone === 0) {
                message = SimpleMessage("囲碁の神様に電話して相談する。");
            } else {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.telephone -= 1;
                    self.refreshText();
                    const r = Random.randint(1, 10);
                    let msg;
                    if (r < 6) {
                        msg = "もしもし、ワシですけど";
                    } else if (r < 8) {
                        msg = "はいはい、ワシじゃ";
                    } else {
                        msg = "なんじゃ、うさこか";
                    }
                    return SimpleMessage("プルルル … カチャッ\n\n囲碁の神様\n「" + msg + "」", () => SimpleMessage("「" + hint + "」"));
                };
                if (sceneName === "BattleScene") {
                    message = QuestionMessage("囲碁の神様に電話して相談する。\n電話しますか？", yesFnc, null);
                } else {
                    message = SimpleMessage("囲碁の神様に電話して相談する。\n戦闘中に使います。");
                }
            }
            App.pushScene(MessageScene(message));
        });
        self.telephoneIcon = Sprite("telephone").addChildTo(telephoneButton).setPosition(-200, 0).hide();

        // 魔法の目薬
        const megusuriButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 100,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.megusuriLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(megusuriButton);
        megusuriButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.megusuri === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.megusuri === 0) {
                message = SimpleMessage("答えが見える不思議な目薬。");
            } else {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.megusuri -= 1;
                    self.refreshText();
                    App.flare("megusuri");
                    self.exit();
                    menuScene.exit();
                    return SimpleMessage("答えが見えた！");
                };
                if (sceneName === "BattleScene") {
                    message = QuestionMessage("答えが見える不思議な目薬。\n1滴使いますか？", yesFnc, null);
                } else {
                    message = SimpleMessage("答えが見える不思議な目薬。\n戦闘中に使います。");
                }
            }
            App.pushScene(MessageScene(message));
        });
        self.megusuriIcon = Sprite("megusuri").addChildTo(megusuriButton).setPosition(-200, 0).hide();


        Label({
            fill: "white",
            fontSize: 30,
            x: -230,
            y: 180,
            align: "left",
            text: "装備",
        }).addChildTo(Box);

        // 修行の指輪
        const ringButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 240,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.ringLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(ringButton);
        ringButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.ring === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.ring === false) {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.ring = true;
                    self.refreshText();
                    return SimpleMessage("装着しました。");
                };
                message = QuestionMessage("敵と遭遇しやすくなる指輪。\n装着しますか？", yesFnc, null);
            } else if (tmpDate.playerInfo.items.ring === true) {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.ring = false;
                    self.refreshText();
                    return SimpleMessage("指輪を外しました。");
                };
                message = QuestionMessage("敵と遭遇しやすくなる指輪。\n外しますか？", yesFnc, null);
            } else {
                message = SimpleMessage("敵と遭遇しやすくなる指輪。");
            }
            App.pushScene(MessageScene(message));
        });
        self.ringIcon = Sprite("ring").addChildTo(ringButton).setPosition(-200, 0).hide();

        // 死の腕時計
        const countdownButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 320,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.countdownLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -170,
            y: 0,
            align: "left",
            text: "",
        }).addChildTo(countdownButton);
        countdownButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.countdown === null) {
                message = SimpleMessage("？？？？");
            } else if (tmpDate.playerInfo.items.countdown === false) {

                if (sceneName === "BattleScene") {
                    message = SimpleMessage("5秒以内に敵を倒さないと即死する。\n倒すとアイテムを必ず貰える。\n戦闘中は装着できません。");
                } else {
                    const yesFnc = () => {
                        tmpDate.playerInfo.items.countdown = true;
                        self.refreshText();
                        return SimpleMessage("装着しました。");
                    };
                    message = QuestionMessage("5秒以内に敵を倒さないと即死する。\n倒すとアイテムを必ず貰える。\n装着しますか？", yesFnc, null);
                }

            } else if (tmpDate.playerInfo.items.countdown === true) {

                if (sceneName === "BattleScene") {
                    message = SimpleMessage("5秒以内に敵を倒さないと即死する。\n倒すとアイテムを必ず貰える。\n戦闘中は外せません。");
                } else {
                    const yesFnc = () => {
                        tmpDate.playerInfo.items.countdown = false;
                        self.refreshText();
                        return SimpleMessage("腕時計を外しました。");
                    };
                    message = QuestionMessage("5秒以内に敵を倒さないと即死する。\n倒すとアイテムを必ず貰える。\n外しますか？", yesFnc, null);
                }

            } else {
                message = SimpleMessage("5秒以内に敵を倒さないと即死する。\n倒すとアイテムを必ず貰える。");
            }
            App.pushScene(MessageScene(message));
        });
        self.countdownIcon = Sprite("countdown").addChildTo(countdownButton).setPosition(-200, 0).hide();

        self.refreshText();
    },
    refreshText: function() {
        this.statusLabel.text = levelText(tmpDate.playerInfo.level) + '  HP: ' + tmpDate.playerInfo.hp + "／" + (tmpDate.playerInfo.level * 5);

        if (tmpDate.playerInfo.items.carotte === null) {
            this.carotteLabel.text = "？？？？";
        } else {
            this.carotteLabel.text = "にんじん　：" + tmpDate.playerInfo.items.carotte + " 本";
            this.carotteIcon.show();
        }

        if (tmpDate.playerInfo.items.megusuri === null) {
            this.megusuriLabel.text = "？？？？";
        } else {
            this.megusuriLabel.text = "魔法の目薬：" + tmpDate.playerInfo.items.megusuri + " 滴";
            this.megusuriIcon.show();
        }

        if (tmpDate.playerInfo.items.feather === null) {
            this.featherLabel.text = "？？？？";
        } else {
            this.featherLabel.text = "大鷲の羽根：" + tmpDate.playerInfo.items.feather + " 枚";
            this.featherIcon.show();
        }

        if (tmpDate.playerInfo.items.revival === null) {
            this.revivalLabel.text = "？？？？";
        } else {
            this.revivalLabel.text = "復活の線香：" + tmpDate.playerInfo.items.revival + " 本";
            this.revivalIcon.show();
        }

        if (tmpDate.playerInfo.items.kentou === null) {
            this.kentouLabel.text = "？？？？";
        } else {
            this.kentouLabel.text = "検討の碁盤：" + tmpDate.playerInfo.items.kentou + " 面";
            this.kentouIcon.show();
        }

        if (tmpDate.playerInfo.items.telephone === null) {
            this.telephoneLabel.text = "？？？？";
        } else {
            this.telephoneLabel.text = "テレフォン：" + tmpDate.playerInfo.items.telephone + " 回分";
            this.telephoneIcon.show();
        }

        if (tmpDate.playerInfo.items.ring === null) {
            this.ringLabel.text = "？？？？";
        } else {
            this.ringLabel.text = "修行の指輪：" + (tmpDate.playerInfo.items.ring === true ? "装着中" : "外している");
            this.ringIcon.show();
        }

        if (tmpDate.playerInfo.items.countdown === null) {
            this.countdownLabel.text = "？？？？";
        } else {
            this.countdownLabel.text = "死の腕時計：" + (tmpDate.playerInfo.items.countdown === true ? "装着中" : "外している");
            this.countdownIcon.show();
        }
    }
});


/*
 * レベルアップシーン
 */
phina.define("LevelUpScene", {
    superClass: 'DisplayScene',
    init: function() {
        this.superInit();
        var self = this;

        this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

        // レベルアップ
        Label({
            text: "LEVEL UP !",
            fontSize: 100,
            fontWeight: 800,
            fill: "white",
            stroke: "red",
            strokeWidth: 20,
        }).addChildTo(self)
        .setPosition(-700, self.gridY.center())
        .tweener.to({x: self.gridX.center()}, 400, "easeOutExpo")
        .call(function() {
            App.pushScene(MessageScene(SimpleMessage("うさこは" + levelText(tmpDate.playerInfo.level) + " になった！\n最大HPが " + tmpDate.playerInfo.hp + " に上がった！")));
        })
        .to({x: self.gridX.center() + 800}, 200, "easeOutQuad")
        .call(function() {
            self.exit();
        })
        .play();

    },
});

/*
 * ゲームクリアシーン
 */
phina.define("GameClearScene", {
    superClass: 'DisplayScene',
    init: function() {
        this.superInit();
        var self = this;

        this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

        Label({
            text: "CLEAR !",
            fontSize: 140,
            fontWeight: 800,
            fill: "white",
            stroke: "red",
            strokeWidth: 20,
        }).addChildTo(self)
        .setPosition(-700, self.gridY.center())
        .tweener.to({x: self.gridX.center()}, 400, "easeOutExpo")
        .play();

        self.on("pointstart", function() {
            App._scenes[1].nextScene("TitleScene");
            tmpDate.playerInfo.map = 0;
            lastMap = 0;
            tmpDate.playerInfo.bossStep = 0;
            questions.forEach(function(q) {
                q.hp = 1;
            });
            datastore.save();
            self.exit();
        });

    },
});

/*
 * アバウトシーン
 */
phina.define("AboutScene", {
    superClass: 'DisplayScene',
    init: function() {
        this.superInit();
        var self = this;

        this.backgroundColor = '#333';

        LabelArea({
            x: 50,
            fill: "white",
            fontSize: 25,
            fontWeight: 800,
            width: this.width - 100,
            text: "ゲームの目的",
        }).addChildTo(this).setOrigin(0,0).setY(50);

        LabelArea({
            x: 50,
            fill: "white",
            fontSize: 25,
            width: this.width - 100,
            text: "　このゲームは、日本棋院出版「新・早わかり死活小事典」を丸暗記するモチベーションを保つことを目的に作りました。",
        }).addChildTo(this).setOrigin(0,0).setY(100);

        Sprite("book").setPosition(this.gridX.center(),340).addChildTo(this);

        LabelArea({
            x: 50,
            fill: "white",
            fontSize: 25,
            fontWeight: 800,
            width: this.width - 100,
            text: "出題内容について",
        }).addChildTo(this).setOrigin(0,0).setY(480);

        LabelArea({
            x: 50,
            fill: "white",
            fontSize: 25,
            width: this.width - 100,
            text: "　ゲーム内で出題する問題は黒番に統一しています。また、実際には正解となる手が複数ある場合でも、書籍に載っている手順のみを正解としていますがご了承ください。各問題の詳細については書籍をご覧ください。",
        }).addChildTo(this).setOrigin(0,0).setY(530);

        LabelArea({
            x: 50,
            fill: "white",
            fontSize: 25,
            fontWeight: 800,
            width: this.width - 100,
            text: "お問い合わせ",
        }).addChildTo(this).setOrigin(0,0).setY(720);

        const mailButton = RectangleShape({
            x: 80,
            fill: "transparent",
            height: 30,
            width: 300,
            strokeWidth: 0,
        }).addChildTo(this).setOrigin(0,0).setY(770).setInteractive(true);
        Label({
            fill: 'white',
            x: 200,
            y: 20,
            align: "center",
            text: "メール：ando19721226@gmail.com",
            fontSize: 23,
        }).addChildTo(mailButton);
        mailButton.on("pointstart", function() {
            navigator.clipboard.writeText("ando19721226@gmail.com");
            alert("クリップボードにコピーしました。");
        });

        const closeButton = RectangleShape({
            fill: 'transparent',
            stroke: "white",
            strokeWidth: 4,
            x: this.gridX.center(),
            y: 900,
            width: 150,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(this).setInteractive(true);
        const closeButtonLabel = Label({
            fill: 'white',
            x: 0,
            y: 0,
            align: "center",
            text: "とじる",
            fontSize: 25,
            fontWeight: 800,
        }).addChildTo(closeButton);
        closeButton.on("pointstart", function() {
            self.exit();
        });

    },
});

//-------------------------
// しゃがんだ主人公クラス
//-------------------------
phina.define('Player2', {
    superClass: 'Sprite',
    
    init: function() {
      this.superInit("player2", BOX_WIDTH, BOX_HEIGHT);
    },
  });

  
//-------------------------
// 草クラス
//-------------------------
phina.define('FloorBlock', {
  superClass: 'Sprite',
  
  init: function() {
    this.superInit("floor", BOX_WIDTH, BOX_HEIGHT);
  },
});

//-------------------------
// 花クラス
//-------------------------
phina.define('FlowerBlock', {
    superClass: 'Sprite',
    
    init: function() {
      this.superInit("flower", BOX_WIDTH, BOX_HEIGHT);
    },
});
  
//-------------------------
// 水クラス
//-------------------------
phina.define('WaterBlock', {
    superClass: 'Sprite',
    
    init: function() {
      this.superInit("water", BOX_WIDTH, BOX_HEIGHT);
    },
});
  
//-------------------------
// 橋クラス
//-------------------------
phina.define('BridgeBlock', {
    superClass: 'Sprite',
    
    init: function() {
      this.superInit("stone", BOX_WIDTH, BOX_HEIGHT);
    },
});

//-------------------------
// アプリ起動
//-------------------------
phina.main(function() {
    App = GameApp({
        assets: ASSETS,
        startLabel: 'TitleScene',
        scenes: [
            {
                label: 'TitleScene',
                className: 'TitleScene',
                nextLabel: "MapScene",
            }, {
                label: 'MapScene',
                className: 'MapScene',
            }, {
                label: 'ButtleScene',
                className: 'ButtleScene',
                nextLabel: "MapScene",
            }, {
                label: 'HospitalScene',
                className: 'HospitalScene',
                nextLabel: "MapScene",
            }
        ],
    });
    App.fps = FPS;
    // App.enableStats();

    App.run();

});

function levelText(level) {
    switch (level) {
        case 1:
            return "レベル1";
        case 2:
            return "レベル2";
        case 3:
            return "レベル3";
        case 4:
            return "レベル4";
        case 5:
            return "レベル5";
        case 6:
            return "レベル6";
        case 7:
            return "レベル7";
        case 8:
            return "レベル8";
        case 9:
            return "レベル9";
        case 10:
            return "レベル10";
        case 11:
            return "レベル11";
        case 12:
            return "レベル12";
        case 13:
            return "レベル13";
        case 14:
            return "レベル14";
        case 15:
            return "レベル15";
        case 16:
            return "レベル16";
        case 17:
            return "レベル17";
        case 18:
            return "レベル18";
        case 19:
            return "レベル19";
        case 20:
            return "レベル20";
        default:
            return "レベルMAX";
    }
}

//-------------------------
// データ管理
//-------------------------
var tmpDate = {
    playerInfo  : null,
}

var mapLeftTop = {x: 32, y: 32};

var hint = "";

//マップチップ
var STAGE = {
    B0: [
        "XXXX11111",
        "XXXX12E21",
        "XXXX12221",
        "XXXX11211",
        "XXXXX121",
        "XXXXX121",
        "11111121111111",
        "1    p2     21",
        "1 a2  2    b 1",
        "1     2  2   1",
        "12     c     1",
        "1     S     d1",
        "1  2       2 1",
        "11111111111111",
    ],
    B1: [
        "1111111111111111111",
        "1  S              1",
        "1                 1",
        "1             E   1",
        "1                 1",
        "1111111111111111111",
    ],
    B2: [
        "11111111111111111",
        "1  S            1",
        "1         1111  1",
        "1         1 E   1",
        "111       1     1",
        "XX111111111     1",
        "XXXXXXXXXX1111111",
    ],
    B3: [
        "11111111111111111",
        "1 S             1",
        "1               111111111",
        "1111111111111          f1",
        "XXXXXXXXXXXX1   111111111",
        "XXXXXXXXXXXX1 E 1",
        "XXXXXXXXXXXX11111",
    ],
    B4: [
        "1111111111111111",
        "1 E           S1",
        "1     1   1    1",
        "1              1",
        "1111111111111111",
    ],
    B5: [
        "1111111111111",
        "1  S 1      1",
        "1    1  1   1",
        "1    1  1   1",
        "1       1 E 1",
        "1111111111111",
    ],
    B6: [
        "1111111111111",
        "1S          1",
        "1 111111111 1",
        "11  E 1   1 1",
        "1  1111 1 1 1",
        "1       1   1",
        "1111111111111",
    ],
    B7: [
        "111111111111111111",
        "1 S              1",
        "1        111111  1",
        "1        1g   1  1",
        "1      E 111     1",
        "1111111111X1111111",
    ],
    B8: [
        "1111111111",
        "1E       1",
        "1        1",
        "1       S1",
        "1        1",
        "1111111111",
    ],
    B9: [
        "1111111111",
        "1 S  1E  1111",
        "1    1      1",
        "1    111111 1",
        "111         1",
        "XX11111111111",
    ],
    B10: [
        "1111111111",
        "1 S  1 E 1",
        "1    1   1",
        "1    1   1",
        "1        1",
        "1111111111",
    ],
    B11: [
        "111111111111111111111111111111",
        "1   E                       S1",
        "1        111111111111111111  1",
        "1111111111XXXXXXXXXXXXXXXX1111",
    ],
    B12: [
        "1111111111",
        "1 S      1",
        "1   11   1",
        "1   11   1",
        "1      E 1",
        "1111111111",
    ],
    B13: [
        "11111",
        "1 S 1",
        "1   1",
        "1   1",
        "1   1",
        "1   1",
        "1   1",
        "1 E 1",
        "11111",
    ],
    B14: [
        "1111111111111",
        "1       1E  1",
        "1   1   111 1",
        "1 S 1   1   1",
        "1   1       1",
        "1111111111111",
    ],
    B15: [
        "1111111111111111",
        "1   1     1    1",
        "1 1 1  S  111  1",
        "1 1            1",
        "1 11111111111  1",
        "1          E1  1",
        "11111111111 1111",
        "XXXXXXXXXX1    1",
        "XXXXXXXXXX111111",
    ],
    B16: [
        "1111111111",
        "1S       1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B17: [
        "1111111111",
        "1   1E   1",
        "1 1 1111 1",
        "1 1 1    1",
        "1 1 1 1111",
        "1 1 1    1",
        "1S1 111  1",
        "1 1      1",
        "1111111111",
    ],
    B18: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1    E   1",
        "1        1",
        "1111111111",
    ],
    B19: [
        "111111111111111",
        "1   1 S       1",
        "1      111    1",
        "1  1111   111 1",
        "1       1   E 1",
        "111111111111111",
    ],
    B20: [
        "111111111",
        "X1  z  1",
        "XX1   1",
        "XXX1 1",
        "XXX1 1",
        "XXX1 1",
        "XXX1 1",
        "XXX1 1",
        "XXX1 1",
        "XX11 11",
        "XX1 S 1",
        "XX1   1",
        "XX11111",
    ],
};

phina.define("ButtleScene", {
    superClass: 'DisplayScene',

    _playerInfo: null,

    _end: false,

    updateHpLabel() {
        const self = this;
        self.hpLabel.text = "うさこ" + "  HP: " + self._playerInfo.hp + "／" + (self._playerInfo.level * 5);// + "  にんじん:" + self._playerInfo.items.carotte;
        if (self._playerInfo.hp <= self._playerInfo.level * 2) {
            self.hpLabel.fill = "red";
            self.statusBox.stroke = "red";
        } else {
            self.hpLabel.fill = "white" ;
            self.statusBox.stroke = "white";
        }
    },
    init: function(param) {
        const self = this;
        this.superInit(param);
        this.backgroundColor = 'black';

        this._playerInfo = param.playerInfo;

        this.miss = false;
        
        this.statusBox = RectangleShape({
            width: 400,
            height: this.gridX.unitWidth * 1.5,
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 12,
            y: 660,
            // cornerRadius: 2,
        }).setOrigin(0,0).addChildTo(this);

        this.hpLabel = Label({
            fill: '#fff',
            align:"left",
            x: 30,
            y: 40,
        }).addChildTo(this.statusBox);

        self.updateHpLabel();

        const itemButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 436,
            y: 660,
            width: 175,
            height: this.gridX.unitWidth * 1.5,
            cornerRadius: 8,
        }).setOrigin(0, 0).addChildTo(this).setInteractive(true);
        const itemButtonLabel = Label({
            fill: '#fff',
            x: 96,
            y: 40,
            align: "center",
            text: "持ちもの",
            // fontWeight: 800,
        }).addChildTo(itemButton);
        itemButton.on("pointstart", function() {
            App.pushScene(MenuScene("BattleScene"));
        });

        const msgBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridX.unitWidth * 5,
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: this.gridX.center(),
            y: 850,
            // cornerRadius: 2,
        }).addChildTo(this);

        this.messageLabel = Label({
            fill: '#fff',
            align:"left",
            x: -250,
        }).addChildTo(msgBox);
       

        let ememyLevel;
        let nowQuestions;
        let enemyIndex;

        if (self._playerInfo.bossStep === 0) {
            ememyLevel = self._playerInfo.map;
            nowQuestions = questions.filter((q) => q.level === ememyLevel && q.hp > 0);
            enemyIndex = Math.floor(Math.random() * nowQuestions.length);
            // @@@@@
            // nowQuestions = questions;
            // enemyIndex = nowQuestions.findIndex((q) =>  q.name==="隅の死活第94型変化");
            // @@@@@
        } else {
            ememyLevel = 30;
            nowQuestions = questions.filter((q) => q.level === ememyLevel);
            enemyIndex = self._playerInfo.bossStep - 1;
        }

        const enemy = {
            name: nowQuestions[enemyIndex].name,
            steps: nowQuestions[enemyIndex].steps,
            level: nowQuestions[enemyIndex].level,
            rotate: Math.floor(Math.random() * 4),
        };

        hint = nowQuestions[enemyIndex].hint;

        if (!hint) {
            hint = "すまん、ワシも分からん。";
        }

        self.enemy = enemy;

        this.updateButtleComment(enemy.name + ' が現れた！');
 
        const goban = Goban(enemy.steps, enemy.rotate).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5) + 20);
        const megusuriFnc = () => {
            goban.megusuri();
        };
        App.on("megusuri", megusuriFnc);
        
        goban.on("Miss", function() {
            self.miss = true;
            const damage = enemy.level;

            self._playerInfo.hp -= damage;
            self._playerInfo.hp = self._playerInfo.hp < 0 ? 0 : self._playerInfo.hp;
            if (self._playerInfo.hp <= 0) {
                goban.clear("Miss");
                goban.clear("Complete");
            }

            goban.tweener.by({y:-30},300).by({y:80},100).call(function(){
                self.statusBox.tweener.by({y:10},20).by({y:-20},20).by({y:20},20).by({y:-10},20).play();
            }).by({y:-50},100).call(function() {

                self.addButtleComment(damage + "のダメージを受けた！");
                self.updateHpLabel();

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
                        App.clear("megusuri");
                        self.exit("TitleScene");
                    });

                    datastore.clear();
        
                }

            }).play();
        });

        let stopCountdown = false;

        goban.on("Complete", function() {
            stopCountdown = true;
            goban.clear("Miss");
            goban.clear("Complete");
            goban.freeze();

            itemButton.setInteractive(false);

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
                if (nowQuestions[enemyIndex].hp === 0 || self._playerInfo.bossStep > 0) {
                    self.addButtleComment(enemy.name + " を倒した！");
                    if (self._playerInfo.items.countdown !== true) {
                        if (Math.random() > 0.6) {
                            self._playerInfo.items.carotte += 1;
                            self.addButtleComment("にんじんを1本手に入れた");
                        } else if (Math.random() > 0.85) {
                            self._playerInfo.items.kentou += 1;
                            self.addButtleComment("検討の碁盤を1面手に入れた");
                        } else if (Math.random() > 0.85) {
                            self._playerInfo.items.revival += 1;
                            self.addButtleComment("復活の線香を1本手に入れた");
                        } else if (Math.random() > 0.85) {
                            self._playerInfo.items.feather += 1;
                            self.addButtleComment("大鷲の羽根を1枚手に入れた");
                        } else if (Math.random() > 0.85) {
                            self._playerInfo.items.telephone += 1;
                            self.addButtleComment("テレフォン1回分を手に入れた");
                        } else if (Math.random() > 0.9) {
                            self._playerInfo.items.megusuri += 1;
                            self.addButtleComment("魔法の目薬を1滴手に入れた");
                        }
                    } else if (self._playerInfo.items.countdown === true) {
                        const r = Math.random();
                        if (r < 0.3) {
                            self._playerInfo.items.carotte += 1;
                            self.addButtleComment("にんじんを1本手に入れた");
                        } else if (r < 0.45) {
                            self._playerInfo.items.kentou += 1;
                            self.addButtleComment("検討の碁盤を1面手に入れた");
                        } else if (r < 0.6) {
                            self._playerInfo.items.revival += 1;
                            self.addButtleComment("復活の線香を1本手に入れた");
                        } else if (r < 0.7) {
                            self._playerInfo.items.feather += 1;
                            self.addButtleComment("大鷲の羽根を1枚手に入れた");
                        } else if (r < 0.85) {
                            self._playerInfo.items.telephone += 1;
                            self.addButtleComment("テレフォン1回分を手に入れた");
                        } else {
                            self._playerInfo.items.megusuri += 1;
                            self.addButtleComment("魔法の目薬を1滴手に入れた");
                        }
                    }
                    if (self._playerInfo.bossStep === 0) {
                        const enemyLevel = self._playerInfo.map;
                        const enemyNum = nowQuestions.filter((q) => q.level === enemyLevel && q.hp > 0).length;
                        if (enemyNum === 0 && self._playerInfo.level <= enemyLevel) {
                            self._playerInfo.level = enemyLevel + 1;
                            self._playerInfo.hp = self._playerInfo.level * 5;
                        }
                    }

                } else {
                    self.addButtleComment(enemy.name + " は逃げた！");
                }
                self._end = true;
            }, 1000);

            const exitBox = RectangleShape({
                width: self.width,
                height: self.height,
                x: self.gridX.center(),
                y: self.gridY.center(),
            }).hide().setInteractive(true).addChildTo(self);

            exitBox.on("pointstart", function() {
                if (self._end) {
                    goban.removeAllStones();
                    goban.remove();
                    App.clear("megusuri");
                    self.exit({playerInfo: self._playerInfo});
                }
            });
        });

        // 死の腕時計
        if (self._playerInfo.items.countdown === true) {

            const countdownLabel = Label({
                x: this.gridX.center(),
                y: this.gridY.center(-3),
                fill: "red",
                fontSize: 400,
                fontWeight: 800,
                fontFamily: "IMPACT",
                text: "",
            }).addChildTo(this);
            countdownLabel.alpha = 0.6;

            function countdown(sec) {
                if (sec === 0) {
                    enemy.level = 100;
                    countdownLabel.text = "0";
                    goban.flare("Miss");
                    return;
                }
                sec -= 1;
                setTimeout(function() {
                    if (stopCountdown) {
                        return;
                    }
                    countdownLabel.text = sec;
                    countdown(sec);
                }, 1000);
            }

            countdown(6);
        }

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
        const fn = function() {
            callback();
            // self.off("pointstart", fn);
        };
        this.on("pointstart", fn);
    },
});

phina.define("Goban", {
    superClass: "RectangleShape",

    _grid: Grid({width: 500, columns: 8}),

    _stones: Array.from(Array(9), () => new Array(9)),
    // _freeAreas: [],

    freeze: function() {
        const self = this;
        (9).times(function(y) {
            (9).times(function(x) {
                self._stones[y][x] && self._stones[y][x].setInteractive(false);
            });
        });
        App.flare('changescene');        
    },

    removeAllStones: function() {
        const self = this;
        (9).times(function(y) {
            (9).times(function(x) {
                self._stones[y][x] && self._stones[y][x].remove();
            });
        });
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

        var ban = RectangleShape({
            width: self._grid.width + self._grid.unitWidth*2,
            height: self._grid.width + self._grid.unitWidth*2,
            fill: '#daa520',
            strokeWidth: 0,
        }).addChildTo(self);

        (9).times(function(spanX) {
            var startPoint = Vector2((spanX - 4) * self._grid.unitWidth, -1 * (self._grid.width/2 + self._grid.unitWidth)),
                endPoint = Vector2((spanX - 4) * self._grid.unitWidth, self._grid.width/2);
            
            PathShape({paths:[startPoint, endPoint], stroke: "black", strokeWidth: (spanX === 8 ? 4 : 2)}).addChildTo(ban);
        });

        (9).times(function(spanY) {
            var startPoint = Vector2(-1 * (self._grid.width/2 + self._grid.unitWidth), (spanY - 4) * self._grid.unitWidth),
                endPoint = Vector2(self._grid.width/2, (spanY - 4) * self._grid.unitWidth);
            
            PathShape({paths:[startPoint, endPoint], stroke: "black", strokeWidth: (spanY === 8 ? 4 : 2)}).addChildTo(ban);
        });

        CircleShape({x: self._grid.unitWidth, y: self._grid.unitWidth, radius: 5, fill: "black", strokeWidth: 0}).addChildTo(ban);
        CircleShape({x: self._grid.unitWidth * -5, y: self._grid.unitWidth, radius: 5, fill: "black", strokeWidth: 0}).addChildTo(ban);
        CircleShape({x: self._grid.unitWidth, y: self._grid.unitWidth * -5, radius: 5, fill: "black", strokeWidth: 0}).addChildTo(ban);
        CircleShape({x: self._grid.unitWidth * -5, y: self._grid.unitWidth * -5, radius: 5, fill: "black", strokeWidth: 0}).addChildTo(ban);

    },
    nextStep: function() {
        const self = this;
        this.stepNum += 1;
        self.setStones(self._steps[self.stepNum], self._steps[self.stepNum - 1]);
        if (this.stepNum === this._steps.length - 1) {
            this.flare("Complete");
        }
    },
    collectStone: null,
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
                        self.collectStone = area;
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
                    }
                }
            });
        });

        App.flare('changescene');

    },
    megusuri: function() {
        this.collectStone.fill = "red";
        this.collectStone.alpha = 0.5;
    },
});


// 検討シーン
phina.define("KentouScene", {
    superClass: 'DisplayScene',
    putBlackStone: function(x, y) {
        const stone = KentouStone(this.goban._grid.unitWidth / 2 - 1, "black", this).addChildTo(this.goban);
        this._setPositionOnGrid(stone, x, y);
        return stone;
    },

    putWhiteStone: function(x, y) {
        const stone = KentouStone(this.goban._grid.unitWidth / 2 - 1, "white", this).addChildTo(this.goban);
        this._setPositionOnGrid(stone, x, y);
        return stone;
    },

    putFreeArea: function(x, y) {
        const stone = KentouStone(this.goban._grid.unitWidth / 2 - 1, null, this).addChildTo(this.goban);
        this._setPositionOnGrid(stone, x, y);
        return stone;
    },
    _setPositionOnGrid: function(target, spanX, spanY) {
        target.setPosition(-1 * this.goban.width/2 + this.goban._grid.span(spanX), -1 * this.goban.height/2 + this.goban._grid.span(spanY));
    },
    _grid: Grid({width: 470, columns: 8}),
    init: function() {
        this.superInit();
        var self = this;

        this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

        this.nextColor = "black";

        const Box = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 16,
            x: this.gridX.center(),
            y: this.gridY.center(),
            width: this.gridX.width - 20,
            height: this.gridY.width - 200,
            cornerRadius: 16,
        }).addChildTo(this);

        const closeButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 310,
            width: 150,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        const closeButtonLabel = Label({
            fill: '#fff',
            x: 0,
            y: 0,
            align: "center",
            text: "終わる",
            fontSize: 25,
        }).addChildTo(closeButton);
        closeButton.on("pointstart", function() {
            self.exit();
        });

        self.goban = RectangleShape({
            width: self._grid.width + self._grid.unitWidth*2,
            height: self._grid.width + self._grid.unitWidth*2,
            // fill: '#daa520',
            fill: "#daa520",
            strokeWidth: 0,
        }).addChildTo(self).setPosition(self.gridX.center(), self.gridY.span(7));
        self.goban.alpha = 0;

        self.goban._grid = Grid({width: 470, columns: 8});

        (9).times(function(spanX) {
            var startPoint = Vector2((spanX - 4) * self.goban._grid.unitWidth, -1 * self.goban._grid.width/2),
                endPoint = Vector2((spanX - 4) * self.goban._grid.unitWidth, self.goban._grid.width/2);
            
            PathShape({paths:[startPoint, endPoint], stroke: "#111", strokeWidth: 2}).addChildTo(self.goban);
        });

        (9).times(function(spanY) {
            var startPoint = Vector2(-1 * self.goban._grid.width/2, (spanY - 4) * self.goban._grid.unitWidth),
                endPoint = Vector2(self.goban._grid.width/2, (spanY - 4) * self.goban._grid.unitWidth);
            
            PathShape({paths:[startPoint, endPoint], stroke: "#111", strokeWidth: 2}).addChildTo(self.goban);
        });

        const step = App._scenes[1].enemy.steps[0];
        const rotate = App._scenes[1].enemy.rotate;

        (9).times(function(y) {
            const raws = step[y].split("");
            (9).times(function(x) {
                const item = raws[x];
                if (item === "W") {
                    self.putWhiteStone(x+1, y+1);
                } else if (item === "B") {
                    self.putBlackStone(x+1, y+1);
                } else {
                    self.putFreeArea(x+1, y+1);
                }
            });
        });

        self.goban.setRotation(rotate * 90).tweener.to({alpha: 1}, 1000).play();
        ;

    }
});

phina.define("KentouStone", {
    superClass: "CircleShape",
    color: null,
    goban: null,
    init: function(r, color, goban) {
        const self = this;
        this.superInit({
            strokeWidth: 1,
            radius: r,
        });
        self.goban = goban;
        this.setInteractive(true);

        if (color === "black") {
            this.alpha = 1;
            self.fill = "black";
            self.stroke = "black";
            self.color = "black";
        } else if (color === "white") {
            this.alpha = 1;
            self.fill = "white";
            self.stroke = "white";
            self.color = "white";
        } else {
            this.alpha = 0;
        }

        this.on("pointstart", function() {
            console.log(self.goban.nextColor)
            if (self.color === null) {
                if (self.goban.nextColor === "black") {
                    self.fill = "black";
                    self.stroke = "black";
                    self.color = "black";
                    self.goban.nextColor = "white";
                } else {
                    self.fill = "white";
                    self.stroke = "white";
                    self.color = "white";
                    self.goban.nextColor = "black";
                }
                self.alpha = 1;
            } else {
                self.alpha = 0;
                self.color = null;
            }
        });
    }
});

let questions = [
    {
        level: 1,
        name: "隅の死活第1型",
        hint: "コウにするのじゃ",
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
        name: "隅の死活第2型",
        hint: "オシツブシを狙うのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBB",
                "    WBBB ",
                "     B WN",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBB",
                "    WBBBw",
                "     BNW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBB",
                "    WBBBW",
                "     BBW ",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第3型",
        hint: "隅のマガリ四目は知っとるの。\nそれじゃよ、たぶん",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      BBB",
                "      BWW",
                "    BBBW ",
                "    BWWWN",
                "    BW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      BBB",
                "      BWW",
                "    BBBW ",
                "    BWWWB",
                "    BW B ",
            ]
        ]
    },
    {
        level: 1,
        name: "隅の死活第4型",
        hint: "左右同形、中央にアレじゃ",
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
        hint: "隅のマガリ四目は知っとるの。\nそれじゃよ、たぶん",
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
                "      BWw",
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
        level: 1,
        name: "隅の死活第5型変化",
        hint: "三目にして白に取らせるのじゃ",
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
                "      BW ",
                "    BBBW ",
                "    BWWWN",
                "     W Bw",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      BB ",
                "      BW ",
                "    BBBWw",
                "    BWWWB",
                "     W BN",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      BB ",
                "      BW ",
                "    BBBWW",
                "    BWWWB",
                "     W BB",
            ]
        ]
    },
    {
        level: 3,
        name: "隅の死活第6型",
        hint: "隅のマガリ四目じゃ",
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
                "   BWWWw ",
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
                "    w NBB",
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
        level: 3,
        name: "隅の死活第6型変化",
        hint: "まずは急所じゃ。\nそのあと注意が必要じゃの。\n白石を取らんように",
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
                "   BWWWN ",
                "       Bw",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWW",
                "   BWWWB ",
                "       BW",
            ]
        ]
    },
    {
        level: 4,
        name: "隅の死活第7型",
        hint: "たぶんカケツギかのう？",
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
                "    WB wN",
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
                "      Bw ",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W w ",
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
        level: 4,
        name: "隅の死活第7型変化",
        hint: "まずはカケツギじゃ。\nその後が難しいのう。\nホウリコんでオシツブシか",
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
                "    WB Nw",
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
                "    w B N",
            ],[
                "         ",
                "         ",
                "     W   ",
                "         ",
                "     W   ",
                "      W  ",
                "    WWBBN",
                "    WB BW",
                "    W Bw ",
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
        level: 3,
        name: "隅の死活第8型",
        hint: "いかにも急所なあそこじゃ",
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
                "    BW w ",
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
        level: 10,
        name: "隅の死活第9型",
        hint: "最終的にはコウじゃ。\n初手が難しいのう。\n『２の二』ではない",
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
                "    BW wB",
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
                "    BNW w",
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
        level: 5,
        name: "隅の死活第10型",
        hint: "まずは二線をハッてみるかの",
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
                "     W w ",
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
                "      WBw",
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
        level: 3,
        name: "隅の死活第11型",
        hint: "たぶんマゲじゃな。\n他の手だと薄いからのう",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "      WW ",
                "  W WWBB ",
                "     B N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "      WW ",
                "  W WWBB ",
                "    wB B ",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "      WW ",
                "  W WWBB ",
                "    WB B ",
                "     B   ",
            ]
        ]
    },
    {
        level: 10,
        name: "隅の死活第12型",
        hint: "コウになるの。\nツケたら失敗じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "  B BBWW ",
                "     W  N",
                "      W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "  B BBWWN",
                "     W wB",
                "      W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "  B BBWWB",
                "   NwW WB",
                "      W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "  B BBWWB",
                "   BWW WB",
                "    w WN ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "  B BBWWB",
                "   BWW WB",
                "    W WB ",
            ]
        ]
    },
    {
        level: 7,
        name: "隅の死活第13型",
        hint: "初手は「２の一」じゃ。ただし、\n黒取り番のコウが正解じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWW ",
                "     W W ",
                "       N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWw",
                "     W W ",
                "      NB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "    NW W ",
                "      BBw",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "    BW WN",
                "     wBBW",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "    BW WB",
                "     WBB ",
            ]
        ]
    },
    {
        level: 4,
        name: "隅の死活第14型",
        hint: "ダメヅマリに導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWW ",
                "     WBW ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWN",
                "     WBW ",
                "      Bw ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWB",
                "     WBW ",
                "      BW ",
            ]
        ]
    },
    {
        level: 7,
        name: "隅の死活第15型",
        hint: "三手目が難しいのう。\n最後は両アタリじゃ！",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWW ",
                "     W  N",
                "       W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWw",
                "     W  B",
                "     N W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   NwW  B",
                "     B W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   BWWN B",
                "    wB W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   BWWB B",
                "    WB W ",
            ]
        ]
    },
    {
        level: 7,
        name: "隅の死活第15型変化",
        hint: "三手目が難しいのう。\n最後は引き出してカケ眼じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWW ",
                "     W  N",
                "       W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWw",
                "     W  B",
                "     N W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   NwW  B",
                "     B W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   BWW NB",
                "     BwW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   BWWwBB",
                "    NBWW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BBB",
                "  B BBWWW",
                "   BWWWBB",
                "    BBWW ",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第16型",
        hint: "急所に置いて、サガリじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "      BB ",
                "    BBWW ",
                "  B BW  W",
                "      WN ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "      BB ",
                "    BBWW ",
                "  B BW wW",
                "    N WB ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "      BB ",
                "    BBWW ",
                "  B BW wW",
                "    B WB ",
            ]
        ]
    },
    {
        level: 9,
        name: "隅の死活第17型",
        hint: "初手がカッコよいのう。\n最後は両アタリじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWW  ",
                "   BW  W ",
                "   N W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWN ",
                "   BW  W ",
                "   B Ww  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWB ",
                "   BWN Ww",
                "   B WW  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWB ",
                "   BWB WW",
                "   B WW  ",
            ]
        ]
    },
    {
        level: 10,
        name: "隅の死活第17型変化",
        hint: "初手がカッコよいのう。\n最後はダメヅマリじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWW  ",
                "   BW  W ",
                "   N W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWwN",
                "   BW  W ",
                "   B W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWWB",
                "   BW  Ww",
                "   B W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWWB",
                "   BWN WW",
                "   B WwB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWWB",
                "   BWB WW",
                "   B WWB ",
            ]
        ]
    },
    {
        level: 5,
        name: "隅の死活第18型",
        hint: "アテてアテて終わりじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWW  ",
                "   BWN W ",
                "      W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWN ",
                "   BWB W ",
                "    w W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWB ",
                "   BWBwWN",
                "    W W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBB ",
                "   BBWWB ",
                "   BWBWWB",
                "    W W  ",
            ]
        ]
    },
    {
        level: 9,
        name: "隅の死活第19型",
        hint: "ダメが空いとるこの形は、\nコウが精いっぱいじゃ。\n初手はサガリでなくツケじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "    B BB ",
                "  B BWW  ",
                " B BW  WN",
                "     W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "    B BB ",
                "  B BWWNw",
                " B BW  WB",
                "     W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "    B BB ",
                "  B BWWBW",
                " B BW wWB",
                "     W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "    B BB ",
                "  B BWWBW",
                " B BW WWB",
                "     W B ",
            ]
        ]
    },
    {
        level: 5,
        name: "隅の死活第20型",
        hint: "気になるアレをどう守るか。\nひとひねり必要じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "    W WW ",
                "  W WBB  ",
                "   WB  B ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "    W WW ",
                "  W WBB  ",
                "   WBw B ",
                "    N B  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "    W WW ",
                "  W WBB N",
                "   WBW Bw",
                "    B B  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "    W WW ",
                "  W WBB B",
                "   WBW BW",
                "    B B  ",
            ]
        ]
    },
    {
        level: 5,
        name: "隅の死活第21型",
        hint: "五目中手じゃ。",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   B WW  ",
                "   BW  WN",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   B WWNw",
                "   BW  WB",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   B WWBW",
                "   BW  W ",
                "      N w",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   B WWBW",
                "   BW  W ",
                "      B W",
            ]
        ]
    },
    {
        level: 4,
        name: "隅の死活第22型",
        hint: "黒の取り番のコウが正解じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   BBWW  ",
                "   BW WN ",
                "     W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   BBWWwN",
                "   BW WB ",
                "     W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   BBWWWB",
                "   BW WBw",
                "     W  N",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   BBWWWB",
                "   BW WB ",
                "     WNwB",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "   BBWWWB",
                "   BW WB ",
                "     WN B",
            ]
        ]
    },
    {
        level: 7,
        name: "隅の死活第23型",
        hint: "ぴょーん、ぴょーん、くいっ。\nという感じじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB N",
                "   BBWW  ",
                "   BW W  ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB B",
                "   BBWW  ",
                "   BW W N",
                "     w   ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB B",
                "   BBWW  ",
                "   BW WwB",
                "     W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB B",
                "   BBWW  ",
                "   BW WWB",
                "     W B ",
            ]
        ]
    },
    {
        level: 9,
        name: "隅の死活第24型",
        hint: "ノゾいてトンでサガる",
        steps: [
            [
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB  ",
                "      W  ",
                "  B BBW  ",
                "     W N ",
                "         ",
            ],[
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB N",
                "      W  ",
                "  B BBW  ",
                "     WwB ",
                "         ",
            ],[
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB B",
                "      W  ",
                "  B BBW  ",
                "     WWBN",
                "       w ",
            ],[
                "         ",
                "         ",
                "      B  ",
                "         ",
                "    BBB B",
                "      W  ",
                "  B BBW  ",
                "     WWBB",
                "       W ",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第25型",
        hint: "外側のダメが詰まっておる。\nダメヅマリに導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW N ",
                "    BW   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW BN",
                "    BW w ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW BB",
                "    BW W ",
            ]
        ]
    },
    {
        level: 6,
        name: "隅の死活第26型",
        hint: "外ダメが１つ空いとるから、\n無条件死にはできんのう",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW   ",
                "     W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW w ",
                "     WNB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW WN",
                "     WBBw",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWWW",
                "    BW WB",
                "     WBB ",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第27型",
        hint: "外ダメが２つ空いとるから\nオシツブせるのう",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWW ",
                "    WBBBB",
                "    WB N ",
                "     B W ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWW ",
                "    WBBBB",
                "    WB B ",
                "     BwWN",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWW ",
                "    WBBBB",
                "    WBNBw",
                "     BWW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWW ",
                "    WBBBB",
                "    WBBBW",
                "     BWW ",
            ]
        ]
    },
    {
        level: 4,
        name: "隅の死活第28型",
        hint: "五目中手じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWN",
                "    BWWW ",
                "  B BW   ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWWw",
                "  B BW   ",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWWW",
                "  B BW N ",
                "     Bw  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWWW",
                "  B BW B ",
                "     BW  ",
            ]
        ]
    },
    {
        level: 5,
        name: "隅の死活第28型変化",
        hint: "五目中手かと思ったら、\n三目中手じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWN",
                "    BWWW ",
                "  B BW   ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWW ",
                "  B BW w ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWWN",
                "  B BW W ",
                "     wB  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWWB",
                "  B BW Ww",
                "     WBN ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWB",
                "    BWWWB",
                "  B BW WW",
                "     WBB ",
            ]
        ]
    },
    {
        level: 8,
        name: "隅の死活第29型",
        hint: "ツケはコウにされて不正解じゃ。\nオキからの隅のマガリ四目より、\nもっと単純なほうが正解じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "       BW",
                "    BBBW ",
                "    BWWW ",
                "  B BW   ",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "       BW",
                "    BBBW ",
                "    BWWW ",
                "  B BW N ",
                "     Bw  ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "       BW",
                "    BBBW ",
                "    BWWW ",
                "  B BW Bw",
                "     BWN ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "       BW",
                "    BBBWN",
                "    BWWW ",
                "  B BW BW",
                "     BWB ",
            ]
        ]
    },
    {
        level: 6,
        name: "隅の死活第30型",
        hint: "ぴょーん、じゃの",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       W ",
                "       WB",
                "    WWWBW",
                "    WBBB ",
                "  W WB   ",
                "       N ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "       WB",
                "    WWWBW",
                "    WBBB ",
                "  W WB Nw",
                "       B ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "       WB",
                "    WWWBW",
                "    WBBB ",
                "  W WB BW",
                "       B ",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第31型",
        hint: "クイッとマゲるのじゃ。\n他の生き方はちょっと損じゃよ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBB ",
                "   WBB N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBB ",
                "   WBB B ",
                "         ",
            ]
        ]
    },
    {
        level: 8,
        name: "隅の死活第32型",
        hint: "打ち欠くのは最後じゃな。\nまずはツケてみたらどうじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWW ",
                " B BWW N ",
                "   W     ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWW ",
                " B BWW BN",
                "   W   w ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWWw",
                " B BWW BB",
                "   WN  W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWWW",
                " B BWW BB",
                "   WB  W ",
            ]
        ]
    },
    {
        level: 11,
        name: "隅の死活第33型",
        hint: "手順は長いが一本道じゃ。\n最後はコウになるんじゃよ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBN",
                " W WBB  W",
                "   B     ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBB",
                " W WBB wW",
                "   BN    ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBB",
                " W WBBNWW",
                "   BB w  ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBB",
                " W WBBBWW",
                "   BBNWw ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBB",
                " W WBBBWW",
                "  wBBBWWN",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBB",
                " W WBBBN ",
                "  WBBB wB",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "  W WBBBB",
                " W WBBBB ",
                "  WBBB WB",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第34型",
        hint: "クイッとマゲるのじゃ。\nそれが一番確実じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBW",
                "  W WBBB ",
                "   WBB N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBW",
                "  W WBBB ",
                "   WBB B ",
                "         ",
            ]
        ]
    },
    {
        level: 3,
        name: "隅の死活第35型",
        hint: "まずはハネるのじゃ。\nそのあとは白次第じゃな",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWB ",
                "  W WBBB ",
                "   WBB WN",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWB ",
                "  W WBBB ",
                "   WBB WB",
                "      Nw ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWB ",
                "  W WBBB ",
                "   WBB WB",
                "      BW ",
            ]
        ]
    },
    {
        level: 5,
        name: "隅の死活第35型変化",
        hint: "まずはハネるのじゃが、\n白に惑わされんようにの。\nコウにはならんよ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWB ",
                "  W WBBB ",
                "   WBB WN",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWB ",
                "  W WBBB ",
                "   WBBNWB",
                "      w  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBN",
                "  W WBBB ",
                "   WBBBWB",
                "      Ww ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBB",
                "  W WBBB ",
                "   WBBBWB",
                "      WW ",
            ]
        ]
    },
    {
        level: 12,
        name: "隅の死活第36型",
        hint: "ツケからコスんでホウリコミ。\n二段コウみたいなやつじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBW ",
                "  B BWWW ",
                "   BWW N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBW ",
                "  B BWWW ",
                "   BWW Bw",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBWw",
                "  B BWWW ",
                "   BWW BW",
                "      B N",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBWW",
                "  B BWWW ",
                "   BWW BW",
                "      B B",
            ]
        ]
    },
    {
        level: 13,
        name: "隅の死活第36型変化",
        hint: "本当ならコウなのじゃが、\n白が応手を間違えて\nダメヅマリに導ける",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBW ",
                "  B BWWW ",
                "   BWW N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBW ",
                "  B BWWW ",
                "   BWW Bw",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBW ",
                "  B BWWW ",
                "   BWWwBW",
                "      BN ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBWw",
                "  B BWWW ",
                "   BWWWBW",
                "    N BB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       BB",
                "    BBBWW",
                "  B BWWW ",
                "   BWWWBW",
                "    B BB ",
            ]
        ]
    },
    {
        level: 11,
        name: "隅の死活第37型",
        hint: "ホウリコミからの例の筋じゃ。\n最後は隅のマガリ四目じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBW ",
                "  B BWWW ",
                "   BWN   ",
                "   B W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBW ",
                "  B BWWW ",
                "   BW w  ",
                "   B W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBW ",
                "  B BWWW ",
                "   BW Ww ",
                "   BNW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWw",
                "  B BWWW ",
                "   BW WWN",
                "   BBW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "    BBBWW",
                "  B BWWW ",
                "   BW WWB",
                "   BBW B ",
            ]
        ]
    },
    {
        level: 5,
        name: "隅の死活第38型",
        hint: "どっちからかブツカリじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWB ",
                "  W WBBB ",
                "   WB  N ",
                "   W B W ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBw",
                "  W WBBB ",
                "   WB  B ",
                "   W BNW ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBW",
                "  W WBBB ",
                "   WBw B ",
                "   W BBWN",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "    WWWBW",
                "  W WBBB ",
                "   WBW B ",
                "   W BB B",
            ]
        ]
    },
    {
        level: 11,
        name: "隅の死活第39型",
        hint: "まずはキリかのう。\n隅のマガリ四目を目指すのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "     BBW ",
                "  BBBWWW ",
                "  BWWN   ",
                "  B      ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "     BBW ",
                "  BBBWWW ",
                "  BWWBw  ",
                "  B    N ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "     BBW ",
                "  BBBWWW ",
                "  BWW W  ",
                "  BN w B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "     BBW ",
                "  BBBWWW ",
                "  BWW Ww ",
                "  BBNW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "     BBWw",
                "  BBBWWW ",
                "  BWW WWN",
                "  BBBW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "     BBWW",
                "  BBBWWW ",
                "  BWW WWB",
                "  BBBW B ",
            ]
        ]
    },
    {
        level: 11,
        name: "隅の死活第40型",
        hint: "ハネてハネて、例の筋じゃ。\nハネは短い方からじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "  BBBWWW ",
                "  BWW    ",
                "   N     ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "  BBBWWWN",
                "  BWW    ",
                "   B w   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "  BBBWWWB",
                "  BWW   w",
                "   B W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "  BBBWWWB",
                "  BWW w W",
                "  NB W B ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "  BBBWWWB",
                "  BWW W W",
                "  BB W B ",
            ]
        ]
    },
    {
        level: 6,
        name: "隅の死活第41型",
        hint: "ダメヅマリに導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWW ",
                "  BWW   N",
                "  B    W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWw",
                "  BWW  NB",
                "  B    W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWW",
                "  BWW wBB",
                "  B  N W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWW",
                "  BWWwWBB",
                "  BN B W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWW",
                "  BWWWWBB",
                "  BB B W ",
            ]
        ]
    },
    {
        level: 6,
        name: "隅の死活第41型変化",
        hint: "途中で白がツイで抵抗するが、\n難しく考えんでええよ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWW ",
                "  BWW   N",
                "  B    W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWw",
                "  BWW  NB",
                "  B    W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWW",
                "  BWWw BB",
                "  BN   W ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBBB",
                "  BBBWWWW",
                "  BWWW BB",
                "  BB   W ",
            ]
        ]
    },
    {
        level: 7,
        name: "隅の死活第42型",
        hint: "カケツギで二子を守ってから、\nクイッとマゲて終わりじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "     WWWB",
                "  WWWBBB ",
                "  WBB    ",
                "   W N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "     WWWB",
                "  WWWBBBw",
                "  WBB  N ",
                "   W B   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "     WWWB",
                "  WWWBBBW",
                "  WBB  B ",
                "  wW BN  ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "     WWWB",
                "  WWWBBBW",
                "  WBB  B ",
                "  WW BB  ",
            ]
        ]
    },
    {
        level: 13,
        name: "隅の死活第43型",
        hint: "一手目が難しいのう。\nオサえてしまったら生きられる。\nコウにするのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B   ",
                "      B  ",
                "   BBBWW ",
                "   BWW   ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B   ",
                "      B  ",
                "   BBBWW ",
                "   BWW N ",
                "      Bw ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B   ",
                "      B  ",
                "   BBBWW ",
                "   BWW Bw",
                "      BWN",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B   ",
                "      B  ",
                "   BBBWWN",
                "   BWWwBW",
                "      B B",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B N ",
                "      Bw ",
                "   BBBWWB",
                "   BWWWB ",
                "      B B",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B BN",
                "      BWw",
                "   BBBWWB",
                "   BWWWB ",
                "      B B",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "     B BB",
                "      BWW",
                "   BBBWWB",
                "   BWWWB ",
                "      B B",
            ]
        ]
    },
    {
        level: 2,
        name: "隅の死活第44型",
        hint: "クイッとマゲるのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "      WW ",
                "   WWWBB ",
                "   WBB N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     W   ",
                "      WW ",
                "   WWWBB ",
                "   WBB B ",
                "         ",
            ]
        ]
    },
    {
        level: 8,
        name: "隅の死活第45型",
        hint: "ツケでは生きられるのう。\nどうしたらコウにできるかの",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "   BBBWW ",
                "   BWW  N",
                "      W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "   BBBWWN",
                "   BWW wB",
                "      W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "   BBBWWB",
                "   BWW WB",
                "    w WN ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     B   ",
                "      BB ",
                "   BBBWWB",
                "   BWW WB",
                "    W WB ",
            ]
        ]
    },
    {
        level: 8,
        name: "隅の死活第46型",
        hint: "黒の先手セキになるのじゃよ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWW",
                "   BW N  ",
                "   BW    ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWW",
                "   BW BN ",
                "   BW  w ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWW",
                "   BW BBN",
                "   BW wW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWW",
                "   BW BBB",
                "   BWwWW ",
            ]
        ]
    },
    {
        level: 11,
        name: "隅の死活第47型",
        hint: "短い方にサガリがあるこの形は、\nデてからツケじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "   BBBBB ",
                "   BWWWW ",
                "   BW    ",
                "   BN    ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "   BBBBB ",
                "   BWWWW ",
                "   BW N  ",
                "   BBw   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "   BBBBB ",
                "   BWWWWN",
                "   BW Bw ",
                "   BBW   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "   BBBBB ",
                "   BWWWWB",
                "   BW BWw",
                "   BBW N ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "   BBBBB ",
                "   BWWWWB",
                "   BW BWW",
                "   BBW B ",
            ]
        ]
    },
    {
        level: 12,
        name: "隅の死活第48型",
        hint: "長い方にサガリがあるこの形は、\nオイてからデるのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWW ",
                " B BW    ",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWN",
                " B BW    ",
                "    wB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWB",
                " B BW  Nw",
                "    WB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWB",
                " B BW NBW",
                "    WB w ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWB",
                " B BW BBW",
                "    WB W ",
            ]
        ]
    },
    {
        level: 16,
        name: "隅の死活第50型",
        hint: "万年コウじゃ。\nえーと、どうするんじゃっけ？",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWW ",
                "   BW  N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWW ",
                "   BW NBw",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWW ",
                "   BW BBW",
                "      Nw ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBN",
                "   BWWWW ",
                "   BW BBW",
                "    w BW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWw",
                "   BW BBW",
                "   NW BW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWWW",
                "   BW BBW",
                "   BW BW ",
            ]
        ]
    },
    {
        level: 17,
        name: "隅の死活第51型",
        hint: "万年コウにすれば正解じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWBW",
                "   WBNBB ",
                "   WB    ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWBW",
                "   WBBBB ",
                "   WB  wN",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWBW",
                "   WBBBB ",
                "   WB wWB",
                "       N ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWBW",
                "   WBBBB ",
                "   WB WWB",
                "    N wB ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWBW",
                "   WBBBB ",
                "   WB WWB",
                "    B WB ",
            ]
        ]
    },
    {
        level: 14,
        name: "隅の死活第52型",
        hint: "ハネてハネてツケ、じゃ。\nハサミツケでは失敗じゃよ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBW ",
                "   BW WW ",
                "   BW    ",
                "    N    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWN",
                "   BW WW ",
                "   BWw   ",
                "    B    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWB",
                "   BW WWw",
                "   BWW N ",
                "    B    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "       B ",
                "   BBBBWB",
                "   BW WWW",
                "   BWW B ",
                "    B    ",
            ]
        ]
    },
    {
        level: 14,
        name: "隅の死活第53型",
        hint: "三子はカケツギで守るのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWB ",
                "   WBWBB ",
                "   WBB   ",
                "    W N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWB ",
                "   WBWBB ",
                "   WBB Nw",
                "    W B  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWB ",
                "   WBWBB ",
                "   WBB BW",
                "   wW B N",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWB ",
                "   WBWBBN",
                "   WBB BW",
                "   WWwB B",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWB ",
                "   W WBBB",
                "   W NwB ",
                "   WWWB B",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "       W ",
                "   WWWWB ",
                "   W WBBB",
                "   W B B ",
                "   WWWB B",
            ]
        ]
    },
    {
        level: 14,
        name: "隅の死活第54型",
        hint: "出を打ちたくなるが罠じゃ。\nハネてオサエて、オイてハウ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "   BBBB  ",
                "   BW WW ",
                " B BW    ",
                "    N    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "   BBBBN ",
                "   BW WW ",
                " B BWw   ",
                "    B    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "   BBBBB ",
                "   BW WW ",
                " B BWW  N",
                "    B  w ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "   BBBBB ",
                "   BW WWw",
                " B BWW  B",
                "    BN W ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "         ",
                "   BBBBB ",
                "   BW WWW",
                " B BWW  B",
                "    BB W ",
            ]
        ]
    },
    {
        level: 19,
        name: "隅の死活第55型",
        hint: "ハネてオイて、\nいろいろあってコウになる",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   B ",
                "   B BBW ",
                "   BW WW ",
                " B BW    ",
                "    N    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   B ",
                "   B BBW ",
                "   BW WW ",
                " B BW    ",
                "    Bw N ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   B ",
                "   B BBW ",
                "   BWwWW ",
                " B BW    ",
                "   NBW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   B ",
                "   B BBWw",
                "   BWWWW ",
                " B BWN   ",
                "   BBW B ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   B ",
                "   B BBWW",
                "   BWWWW ",
                " B BW w  ",
                "   BBWNB ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   B ",
                "   B BBWW",
                "   BWWWW ",
                " B BW W  ",
                "   BBWBB ",
            ]
        ]
    },
    {
        level: 18,
        name: "隅の死活第56型",
        hint: "初手のツキアタリから、\n最終的にはオシツブシじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   W WWB ",
                "   WBWBB ",
                " W WBB N ",
                "    WB W ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   W WWB ",
                "   WBWBB ",
                " W WBB B ",
                "    WBwWN",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   W WWB ",
                "   WBWBBN",
                " W WBB Bw",
                "    WBWW ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   WwWWB ",
                "   WBWBBB",
                " W WBB BW",
                "   NWBWW ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   WwWWB ",
                "   WBWBBB",
                " W WBBNBW",
                "   B BWWw",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   WwWWB ",
                "   WBWBBB",
                " W WBBBB ",
                "   B B wN",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   WwWWB ",
                "   WBWBBB",
                " W WBBBBw",
                "   B BNW ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "   W   W ",
                "   WwWWB ",
                "   WBWBBB",
                " W WBBBBW",
                "   B BBW ",
            ]
        ]
    },
    {
        level: 19,
        name: "隅の死活第57型",
        hint: "黒のサガリがあるこの形は、\nハネて出てからのオキ、\n最終的には隅のマガリ四目じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBW ",
                "   BW WW ",
                " B BW    ",
                "    N    ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBW ",
                "   BWNWW ",
                " B BW    ",
                "    Bw   ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBW ",
                "   BWBWW ",
                " B BWw   ",
                "    BW N ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBW ",
                "   BWBWW ",
                " B BWW w ",
                "    BWNB ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBW ",
                "   BWBWWN",
                " B BWW W ",
                "    BWBBw",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBWw",
                "   BWBWWB",
                " B BWW WN",
                "    BWBBW",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBWW",
                "   BWBWW ",
                " B BWW WN",
                "    BWBBw",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   B   BB",
                "   B BBWW",
                "   BWBWW ",
                " B BWW WB",
                "    BWBB ",
            ]
        ]
    },
    {
        level: 6,
        name: "隅の死活第58型",
        hint: "どっちにオクか。\n白がダメヅマリになる方じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWB ",
                "   BW  WW",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWB ",
                "   BW NWW",
                "    wB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWB ",
                "   BW BWW",
                "    WB   ",
            ]
        ]
    },
    {
        level: 16,
        name: "隅の死活第59型",
        hint: "初手はすごいところじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "      B  ",
                "   BB B  ",
                "   BWWW  ",
                "   BW   N",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "      B  ",
                "   BB BwN",
                "   BWWW  ",
                "   BW   B",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "      B w",
                "   BB BWB",
                "   BWWW N",
                "   BW   B",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "      B W",
                "   BB BWB",
                "   BWWW B",
                "   BW   B",
                "         ",
            ]
        ]
    },
    {
        level: 9,
        name: "隅の死活第60型",
        hint: "眼を作ることが最優先じゃ。\n欲を出さんようにの",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      W  ",
                "         ",
                "    WWW  ",
                "   WBBB  ",
                "   WWB N ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "         ",
                "    WWWw ",
                "   WBBB  ",
                "   WWB B ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "         ",
                "    WWWW ",
                "   WBBB N",
                "   WWB Bw",
                "      B  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "         ",
                "    WWWW ",
                "   WBBBwB",
                "   WWB BW",
                "      B N",
            ],[
                "         ",
                "         ",
                "         ",
                "      W  ",
                "         ",
                "    WWWW ",
                "   WBBBWB",
                "   WWB B ",
                "      B B",
            ]
        ]
    },
    {
        level: 7,
        name: "隅の死活第61型",
        hint: "ダメヅマリに導くのじゃ。\n深く入りすぎんようにの",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWB ",
                "   B   WW",
                "    N W  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWB ",
                "   B N WW",
                "    BwW  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "   BWWWB ",
                "   B B WW",
                "    BWW  ",
            ]
        ]
    },
    {
        level: 8,
        name: "隅の死活第62型",
        hint: "三目の真ん中じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   WWWWW ",
                "   WBBBW ",
                "   W   BB",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   WWWWW ",
                "   WBBBW ",
                "   WN  BB",
                "     Bw  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   WWWWW ",
                "   WBBBW ",
                "   WB wBB",
                "     BWN ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   WWWWW ",
                "   WBBBW ",
                "   WB WBB",
                "     BWB ",
            ]
        ]
    },
    {
        level: 10,
        name: "隅の死活第63型",
        hint: "押す手なしに導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWBW",
                "   B   WW",
                "     WN  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWBW",
                "   Bw NWW",
                "     WB  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBBB",
                "   BWWWBW",
                "   BW BWW",
                "     WB  ",
            ]
        ]
    },
    {
        level: 6,
        name: "隅の死活第64型",
        hint: "三目の真ん中じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BW   WW",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BW  NWW",
                "    wB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BW  BWW",
                "    WB   ",
            ]
        ]
    },
    {
        level: 10,
        name: "隅の死活第64型変化",
        hint: "三目の真ん中じゃ。\n白は押す手なしになるの",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BW   WW",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BWw  WW",
                "    NB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BWW NWW",
                "   wBB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "   BBBBB ",
                "  BBWWWB ",
                "  BWW BWW",
                "   WBB   ",
            ]
        ]
    },
    {
        level: 14,
        name: "隅の死活第65型",
        hint: "外ダメが空いとるからのう。\n三目の真ん中ではセキになる。\n例の筋でダメヅマリ狙いじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "    B  B ",
                "    B B  ",
                "  BBWWWBB",
                "  BW   WW",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    B  B ",
                "    B B  ",
                "  BBWWWBB",
                "  BW   WW",
                "     wBN ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    B  B ",
                "    B B  ",
                "  BBWWWBB",
                "  BWN wWW",
                "     WBB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    B  B ",
                "    B B  ",
                "  BBWWWBB",
                "  BWB WWW",
                "  Nw WBB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    B  B ",
                "    B B  ",
                "  BBWWWBB",
                "  BWB WWW",
                "  BW WBB ",
            ]
        ]
    },
    {
        level: 17,
        name: "隅の死活第66型",
        hint: "ダメが詰まってるのなら\n三目の真ん中じゃ！\nコウにするのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                " BBBWWWB ",
                " BWW   WW",
                " B   N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                " BBBWWWB ",
                " BWWw NWW",
                " B   B   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                " BBBWWWB ",
                " BWWWwBWW",
                " B   B N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                " BBBWWWB ",
                " BWWWWBWW",
                " B   B B ",
            ]
        ]
    },
    {
        level: 18,
        name: "隅の死活第67型",
        hint: "クシ形にさせないのじゃ。\nその後は三目の真ん中じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWB ",
                "  BW   W ",
                "   W   N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWB ",
                "  BW   Ww",
                "   W N B ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWB ",
                "  BW w WW",
                "  NW B B ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWB ",
                "  BWwWNWW",
                "  BW B B ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWB ",
                "  BWWWBWW",
                "  BW B B ",
            ]
        ]
    },
    {
        level: 18,
        name: "隅の死活第68型",
        hint: "クシ形にさせないのじゃ。\nその後は三目の真ん中じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW   W ",
                "   W   N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW   W ",
                "   W NwB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW wNW ",
                "   W BWB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW WBW ",
                "   W B B ",
            ]
        ]
    },
    {
        level: 17,
        name: "隅の死活第69型",
        hint: "初手はツケではなく打欠きじゃ。\n白はその石をヌケんからの",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW   WN",
                "    W    ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW  wWB",
                "  N W    ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW  WWB",
                "  B Ww N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  BBWWWBW",
                "  BW  WWB",
                "  B WW B ",
            ]
        ]
    },
    {
        level: 18,
        name: "隅の死活第70型",
        hint: "初手は、出切りとワタリを\n両にらみする急所じゃ！",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "  BW WWB ",
                "  BW   WW",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "  BW WWB ",
                "  BWw  WW",
                "   N B   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "  BW WWB ",
                "  BWWN WW",
                "   BwB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "  BW WWB ",
                "  BWWB WW",
                "   BWB   ",
            ]
        ]
    },
    {
        level: 19,
        name: "隅の死活第71型",
        hint: "平凡にコウを目指すのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   BBB B ",
                "  B  WWB ",
                "  BWN  WW",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   BBB B ",
                "  B  WWB ",
                "  BWBw WW",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   BBB B ",
                "  B  WWB ",
                "  BWBW WW",
                "   N Bw  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "   BBB B ",
                "  B  WWB ",
                "  BWBW WW",
                "   B BW  ",
            ]
        ]
    },
    {
        level: 15,
        name: "隅の死活第72型",
        hint: "初手は、第一感の隣じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "       B ",
                "  BBBBB  ",
                " B W WWBB",
                " BW  N WW",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       B ",
                "  BBBBB  ",
                " B W WWBB",
                " BW NBwWW",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       B ",
                "  BBBBB  ",
                " B WwWWBB",
                " BWNBBWWW",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "       B ",
                "  BBBBB  ",
                " B WwWWBB",
                " BWBBBWWW",
                "         ",
            ]
        ]
    },
    {
        level: 16,
        name: "隅の死活第73型",
        hint: "三目の真ん中じゃ。\nあとは流れにまかせて\nコウになるのう",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWW ",
                "   BW    ",
                "    W N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWW ",
                "   BW  N ",
                "    W Bw ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWW ",
                "   BW  Bw",
                "    W BWN",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "  B BWWW ",
                "   BW  BW",
                "    W B B",
            ]
        ]
    },
    {
        level: 17,
        name: "隅の死活第74型",
        hint: "外ダメが空いとる形は\n三目の真ん中ではダメじゃ。\nハネてオイて、コウじゃ！",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       B ",
                "    B    ",
                "    B BB ",
                "  B BWWWN",
                "   BW    ",
                "    W    ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "    B    ",
                "    B BB ",
                "  B BWWWB",
                "   BW   w",
                "    W  N ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "    B    ",
                "    B BB ",
                "  B BWWWB",
                "   BW N W",
                "    W wB ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "    B    ",
                "    B BB ",
                "  B BWWWB",
                "   BWwB W",
                "    WNWB ",
            ],[
                "         ",
                "         ",
                "         ",
                "       B ",
                "    B    ",
                "    B BB ",
                "  B BWWWB",
                "   BWWB W",
                "    WB B ",
            ]
        ]
    },
    {
        level: 15,
        name: "隅の死活第75型",
        hint: "三目の真ん中じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWWB",
                "  W WBBBW",
                "   WB    ",
                "    B N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWWB",
                "  W WBBBW",
                "   WB  Nw",
                "    B B  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    WWWWB",
                "  W WBBBW",
                "   WB  BW",
                "    B B  ",
            ]
        ]
    },
    {
        level: 15,
        name: "隅の死活第76型",
        hint: "まずハネじゃろうのう。\nそして例の筋じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  B BWWWN",
                " B BW    ",
                "     W   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  B BWWWB",
                " B BW   w",
                "     W N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  B BWWWB",
                " B BW   W",
                "   N WwB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  B BWWWB",
                " B BWN wW",
                "   B WWB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "  B BWWWB",
                " B BWB WW",
                "   B WWB ",
            ]
        ]
    },
    // {
    //     level: 16,
    //     name: "隅の死活第77型",
    //     steps: [
    //         [
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "    BBBB ",
    //             "  B BWWWN",
    //             "   BW    ",
    //             "     W   ",
    //         ],[
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "    BBBB ",
    //             "  B BWWWB",
    //             "   BW   w",
    //             "     W N ",
    //         ],[
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "    BBBB ",
    //             "  B BWWWB",
    //             "   BW   W",
    //             "  Nw W B ",
    //         ],[
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "    BBBB ",
    //             "  B BWWWB",
    //             "   BW   W",
    //             "  BWNWwB ",
    //         ],[
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "         ",
    //             "    BBBB ",
    //             "  B BWWWB",
    //             "   BW   W",
    //             "  B BWWB ",
    //         ]
    //     ]
    // },
    {
        level: 12,
        name: "隅の死活第78型",
        hint: "マガリかトビか。\n得なのはマガリじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWWB",
                "  W WBBBW",
                "   WB  N ",
                "     B   ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWWB",
                "  W WBBBW",
                "   WB  B ",
                "   w BN  ",
            ],[
                "         ",
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWWB",
                "  W WBBBW",
                "   WB  B ",
                "   W BB  ",
            ]
        ]
    },
    {
        level: 8,
        name: "隅の死活第79型",
        hint: "広さで生きるのは無理じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      W  ",
                "  WW W   ",
                "  WBBBWW ",
                "  W   BB ",
                "     N   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      W  ",
                "  WW W   ",
                "  WBBBWW ",
                "  W   BB ",
                "   wNB   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      W  ",
                "  WW W   ",
                "  WBBBWW ",
                "  W   BB ",
                "   WBB   ",
            ]
        ]
    },
    {
        level: 12,
        name: "隅の死活第80型",
        hint: "ピョン、ピョン、じゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BB B   ",
                "  BWWWBB ",
                "      WW ",
                "  N      ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BB B   ",
                "  BWWWBB ",
                "      WW ",
                "  B Nw   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BB B   ",
                "  BWWWBB ",
                "      WW ",
                "  B BW   ",
            ]
        ]
    },
    {
        level: 13,
        name: "隅の死活第81型",
        hint: "三目の真ん中じゃ。\nそれからオイてハネじゃな",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BBBB   ",
                "  BWWWBB ",
                "  B   WW ",
                "    NW   ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BBBB   ",
                "  BWWWBB ",
                "  B   WW ",
                "    BW w ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BBBB   ",
                "  BWWWBB ",
                "  B   WWN",
                "    BW W ",
                "     wB  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BBBB   ",
                "  BWWWBB ",
                "  BN  WWB",
                "   wBW W ",
                "     WB  ",
            ],[
                "         ",
                "         ",
                "         ",
                "      B  ",
                "  BBBB   ",
                "  BWWWBB ",
                "  BB  WWB",
                "   WBW W ",
                "     WB  ",
            ]
        ]
    },
    {
        level: 13,
        name: "隅の死活第89型",
        hint: "左右同形ほにゃららじゃ。\nその後は五目中手に導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "    B WW ",
                "    BW   ",
                "  B BW N ",
                "         ",
            ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "    B WW ",
                "    BW   ",
                "  B BWNB ",
                "       w ",
            ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "    B WW ",
                "    BW   ",
                "  B BWBBN",
                "      wW ",
                ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "     BBB ",
                "    B WW ",
                "    BW   ",
                "  B BWBBB",
                "      WW ",
            ]
        ]
    },
    {
        level: 13,
        name: "隅の死活第90型",
        hint: "どっちからブツカるか。\nセキにせぬようにの",
        steps: [
            [
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "    WBBB ",
                "  W WB   ",
                "   WBBNW ",
                "         ",
            ],[
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "    WBBBw",
                "  W WB N ",
                "   WBBBW ",
                "         ",
            ],[
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "    WBBBW",
                "  W WB Bw",
                "   WBBBWN",
                "         ",
            ],[
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "    WBBBW",
                "  W WB BW",
                "   WBBBW ",
                "      N w",
            ],[
                "         ",
                "         ",
                "       W ",
                "         ",
                "    WWWW ",
                "    WBBBW",
                "  W WB BW",
                "   WBBBW ",
                "      B W",
            ]
        ]
    },
    {
        level: 14,
        name: "隅の死活第91型",
        hint: "ハネてツケ、かのう？",
        steps: [
            [
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "    BWWWN",
                "    BW   ",
                "  B B  W ",
                "         ",
            ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "    BWWWB",
                "    BW  w",
                "  B B NW ",
                "         ",
            ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBB ",
                "    BWWWB",
                "    BW  W",
                "  B BwBW ",
                "     N   ",
            ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBBw",
                "    BWWW ",
                "    BW  W",
                "  B BWBW ",
                "     B N ",
                ],[
                "         ",
                "         ",
                "       B ",
                "         ",
                "    BBBBW",
                "    BWWW ",
                "    BW  W",
                "  B BWBW ",
                "     B B ",
            ]
        ]
    },
    {
        level: 15,
        name: "隅の死活第92型",
        hint: "『２の一』が急所じゃ。\nダメヅマリに導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWW ",
                "    BW   ",
                "   B BWW ",
                "     B N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWW ",
                "    BW  N",
                "   B BWW ",
                "     BwB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWW ",
                "    BW wB",
                "   B BWWN",
                "     BWB ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBBB",
                "    BWWW ",
                "    BW WB",
                "   B BWWB",
                "     BWB ",
            ]
        ]
    },
    {
        level: 13,
        name: "隅の死活第93型",
        hint: "ハネてツケて、\nダメヅマリに導くのじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBBB",
                "    B WWW",
                "    BW   ",
                "    BBWW ",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBBB",
                "    B WWW",
                "    BW   ",
                "    BBWWN",
                "      Bw ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBBB",
                "    BwWWW",
                "    BW N ",
                "    BBWWB",
                "      BW ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "     BBBB",
                "    BWWWW",
                "    BW B ",
                "    BBWWB",
                "      BW ",
            ]
        ]
    },
    {
        level: 16,
        name: "隅の死活第94型",
        hint: "一手目が変な手じゃ。\nそして眼あり眼なしの攻合いじゃ",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW W ",
                "   BWW  N",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW Ww",
                "   BWW NB",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW WW",
                "   BWWNBB",
                "    w    ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BWwWW",
                "   BWWBBB",
                "    W N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BWWWW",
                "   BWWBBB",
                "    W B  ",
            ]
        ]
    },
    {
        level: 16,
        name: "隅の死活第94型変化",
        hint: "一手目が変な手じゃ。\nそれから渡ればよい",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW W ",
                "   BWW  N",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW WN",
                "   BWW wB",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW WB",
                "   BWW WB",
                "    w N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "    BBBB ",
                "    BWWB ",
                "  B BW WB",
                "   BWW WB",
                "    W B  ",
            ]
        ]
    },
    {
        level: 2,
        name: "辺の死活第10型",
        hint: "クシ形じゃ！",
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
        level: 4,
        name: "辺の死活第13型",
        hint: "三目の真ん中じゃ",
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
                "   wB W  ",
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
        level: 4,
        name: "辺の死活第13型変化",
        hint: "三目の真ん中じゃ。\n最後は三目ナカ手じゃの",
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
                "  W w WB ",
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
                "  wBBNW  ",
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
    },
    {
        level: 30,
        name: "隅の死活第100型",
        hint: "平凡に狭めていくのじゃ！",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBB  ",
                "B BWW  N ",
                " BWW  W  ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBB  ",
                "B BWW  B ",
                " BWW  WwN",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBB  ",
                "B BWWw B ",
                " BWW  WWB",
                "  N      ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBB  ",
                "B BWWW B ",
                " BWW  WWB",
                "  Bw   N ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBB  ",
                "B BWWW B ",
                " BWW  WWB",
                "  BW   B ",
            ]
        ]
    },
    {
        level: 30,
        name: "隅の死活第101型",
        hint: "切ってからのツケじゃ！",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWW  W ",
                " BWW N W ",
                " B       ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWWwNW ",
                " BWW B W ",
                " B       ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWWWBW ",
                " BWW BwW ",
                " B N     ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWWWBW ",
                " BWW BWW ",
                " BNB w   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWWWBW ",
                " BWWw WW ",
                " BBBNW   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWWWBWN",
                " BWWWwWW ",
                " BBBBW   ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBB ",
                "B BWWWBWB",
                " BWWWwWW ",
                " BBBBW   ",
            ]
        ]
    },
    {
        level: 30,
        name: "隅の死活第102型",
        steps: [
            [
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBBB",
                "B BWW  W ",
                " BWW N W ",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBBB",
                "B BWWw W ",
                " BWW B WN",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBBB",
                "B BWWWNWw",
                " BWW B WB",
                "         ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBBB",
                "B BWWWBWW",
                " BWW BwWB",
                "      N  ",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBBB",
                "B BWWWBWW",
                " BWW BWW ",
                "    N B w",
            ],[
                "         ",
                "         ",
                "         ",
                "         ",
                "         ",
                "  BBBBBBB",
                "B BWWWBWW",
                " BWW BWW ",
                "    B B W",
            ]
        ]
    },

];
