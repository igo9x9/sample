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
        'player': 'images/player.png',
        'player2': 'images/player2.png',
        "floor": "images/floor.png",
        "wall": "images/wall.png",
        "water": "images/water.png",
        "tree": "images/tree.png",
        "tatefuda": "images/tatefuda.png",
        "flower": "images/flower.png",
        "arrow": "images/arrow.png",
        "hole1": "images/hole1.png",
        "hole2": "images/hole2.png",
        "npc1": "images/npc1.png",
        "npc2": "images/npc2.png",
        "npc3": "images/npc3.png",
        "npc4": "images/npc4.png",
        "npc5": "images/npc5.png",
    },
};

let lastLevel = 1;
let lastMap = 0;
let lastDirection = DIRECTION.DOWN;

// タイトルシーン
phina.define('TitleScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        this.backgroundColor = "green";


        Label({
            text: 'うさこの',
            x: 320,
            y: 420,
            fontSize: 40,
            fill: "orange",
            fontWeight: 800,
            // strokeWidth: 5,
            // stroke: "white",
        }).addChildTo(this);
        Label({
            text: '囲碁死活ダンジョン',
            x: 320,
            y: 500,
            fontSize: 50,
            fill: "white",
            fontWeight: 800,
            // strokeWidth: 5,
            // stroke: "black",
        }).addChildTo(this);
        Player().setPosition(200,420).addChildTo(this);

    
        // データ初期化
        tmpDate.playerInfo = {map: 0, level: 1, hp: 5, x: null, y: null,
            items: {
                carotte: 0,
                ring: null,
                megusuri: 0,
                countdown: null,
                feather: 0,
            }
        };
        lastLevel = 1;
        lastMap = 0;
        lastDirection = DIRECTION.DOWN;

        questions.forEach(function(q) {
            q.hp = 1;
        });

    },
    onpointstart: function() {
        this.exit('MapScene');
    }
});

//-------------------------
// マップシーン
//-------------------------
phina.define('MapScene', {
    superClass: 'DisplayScene',

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
        // this.statusLabel.text = levelText(tmpDate.playerInfo.level) + '  HP : ' + tmpDate.playerInfo.hp + "／" + (tmpDate.playerInfo.level * 5) + "  にんじん : " + tmpDate.playerInfo.items.carotte;
        this.statusLabel.text = levelText(tmpDate.playerInfo.level) + '  HP: ' + tmpDate.playerInfo.hp + "／" + (tmpDate.playerInfo.level * 5);
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
            playerInfo = tmpDate.playerInfo;
        } else {
            newGame = false;
            tmpDate.playerInfo = playerInfo;
        }

        if (playerInfo.map !== lastMap) {
            mapToMap = true;
            lastMap = playerInfo.map;
            lastDirection = DIRECTION.DOWN;
        }

        //背景色
        if (playerInfo.map === 0) {
            this.backgroundColor = '#22B14C';
        } else {
            this.backgroundColor = '#606060';
        }

        //マップのレイヤー
        var layer2 = DisplayElement().addChildTo(this);//当たり判定のあるもの

        var statusBox = RectangleShape({
            fill: '#000',
            stroke: "#000",
            strokeWidth: 16,
            x: 20,
            y: -100,
            width: 400,
            height: 50,
            cornerRadius: 16,
        }).setOrigin(0, 0).addChildTo(this);

        self.statusLabel = Label({
            fill: '#fff',
            x: 20,
            y: 34,
            align: "left",
        }).addChildTo(statusBox);
        self.updateStatusLabel();
        statusBox.tweener.moveTo(20, 20, 500, "easeOutQuad").play();

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
        const itemButtonLabel = Label({
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

        if (playerInfo.map !==0 ) {
            const enemyLevel = playerInfo.map;
            let msg = "地下" + playerInfo.map + "階  " + "難易度" + enemyLevel;
            const enemyNum = questions.filter((q) => q.level === enemyLevel && q.hp > 0).length;
            if (enemyNum > 0) {
                msg += " 残り" + enemyNum + "問";
            } else {
                msg += " 全問クリア";
            }
            Label({
                text: msg,
                fill: "#fff",
                x: this.gridX.center(),
                y: 930,
            }).addChildTo(this);
        }

        //他の画面から来た時用にシェードを用意
        this.offShade(function() {
            if (lastLevel !== playerInfo.level) {
                App.pushScene(LevelUpScene());
                lastLevel = playerInfo.level;
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
                    NPCBlock(item).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
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
                    //Eに穴
                    HoleBlock(playerInfo.map).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
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
        var r = (tmpDate.playerInfo.items.ring === true ? Random.randint(1, 20) : Random.randint(1, 200));
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
  
  /**
   * 更新
   */
  update: function(app) {
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
    
    init: function(map) {
        if (map === 0) {
            this.superInit("hole1", BOX_WIDTH, BOX_HEIGHT);
        } else {
            this.superInit("hole2", BOX_WIDTH, BOX_HEIGHT);
        }
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
                this._messageFnc = ()=> SimpleMessage("村人\n「地下に行くほど死活問題は\n難しくなっていくし、\n受けるダメージも大きくなるよ。",
                    () => SimpleMessage("だから、自分のレベルを上げてから\n次の階に進むのが安全だよ。",
                        () => SimpleMessage("でも死活の知識が豊富なら、\nあえて低いレベルのまま\nどんどん進むのもアリかもね」")));
                break;
            case "b":
                this.superInit("npc2", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = ()=> SimpleMessage("村人\n「上の階には戻れなくなるから、\n慎重に進んでね」");
                break;
            case "c":
                this.superInit("npc3", BOX_WIDTH, BOX_HEIGHT);
                yes = ()=>{
                    if (!self._done) {
                        tmpDate.playerInfo.items.carotte += 1;
                        App._scenes[1].updateStatusLabel();
                        self._done = true;
                        return SimpleMessage("「がんばれよ！」", () => SimpleMessage("にんじんを1本くれた。"));
                    } else {
                        return SimpleMessage("「がんばれよ！」");
                    }
                };
                this._messageFnc = () => QuestionMessage("村人\n「ダンジョンに行くのかい？」", yes, ()=>SimpleMessage("「そうかい」"));
                break;
            case "d":
                this.superInit("npc4", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => SimpleMessage("村人\n「それぞれの階の死活問題の数は\nだいたい10問前後くらいで、",
                    () => SimpleMessage("その問題の全てを正解したら\nレベルアップできるらしいわ」"));
                break;
            case "e":
                this.superInit("npc5", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => {
                    if (self._done) {
                        return SimpleMessage("魔法使い\n「気をつけてな」");
                    }
                    if (tmpDate.playerInfo.hp === tmpDate.playerInfo.level * 5) {
                        return SimpleMessage("魔法使い\n「一度だけHPを満タンにできるが\n今は必要なさそうじゃな」");
                    }
                    yes = () => {
                        self._done = true;
                        return SimpleMessage("「よしきた、ほいっ！」", () => {
                            tmpDate.playerInfo.hp = tmpDate.playerInfo.level * 5;
                            App._scenes[1].updateStatusLabel();
                            return SimpleMessage("HPが満タンになった。");
                        });
                    }
                    return QuestionMessage("魔法使い\n「一度だけHPを満タンにできるぞ。\nするかい？", yes, ()=> SimpleMessage("そうかい」"));
                };
                break;
            case "f":
                this.superInit("npc3", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => {
                    if (tmpDate.playerInfo.items.ring === null) {
                        tmpDate.playerInfo.items.ring = false;
                        return SimpleMessage("修行者\n「早くレベルを上げたいなら、\nこの指輪が役に立つよ。\n君にあげよう。」", () => SimpleMessage("修行の指輪 を手に入れた！"));
                    } else {
                        return SimpleMessage("修行者\n「がんばれよ！」");
                    }
                }
                break;
            case "g":
                this.superInit("npc1", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => {
                    if (tmpDate.playerInfo.items.countdown === null) {
                        tmpDate.playerInfo.items.countdown = false;
                        return SimpleMessage("修行者\n「アイテムが足りないなら、\nこの腕時計が役に立つよ。\n君にあげよう。」", () => SimpleMessage("死の腕時計 を手に入れた！"));
                    } else {
                        return SimpleMessage("修行者\n「がんばれよ！」");
                    }
                }
                break;
            case "o":
                this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => SimpleMessage("「囲碁の村」");
                break;
            case "p":
                this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => SimpleMessage("「地下ダンジョン入り口」");
                break;
            case "q":
                this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
                this._messageFnc = () => SimpleMessage("「地下２階へ」");
                break;
            default:
        }
    },
    say: function() {
        const self = this;
        if (self._wait) {
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
            height: 50,
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
            text: "はい",
            align: "center",
        }).addChildTo(self._questionBox).setInteractive(true);
        
        this.yesLabel.onpointstart = function() {
            if (self._message.className === "QuestionMessage") {
                self.setMessageObj(self._message.yesCallback());
                self.printText();
            }
        };

        this.noLabel = Label({
            fill: 'black',
            align:"left",
            x: 50,
            text: "いいえ",
            align: "center",
        }).addChildTo(self._questionBox).setInteractive(true);

        this.noLabel.onpointstart = function() {
            if (self._message.className === "QuestionMessage") {
                if (!!self._message.noCallback) {
                    self.setMessageObj(self._message.noCallback());
                    self.printText();
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
        if (message.className === "QuestionMessage") {
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
            height: this.gridY.width - 100,
            cornerRadius: 16,
        }).addChildTo(this);

        const closeButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 360,
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
            y: -300,
        }).addChildTo(Box);

        // 飛竜の羽根
        const featherButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 160,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.featherLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -200,
            y: 0,
            align: "left",
        }).addChildTo(featherButton);
        featherButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.feather === 0) {
                message = SimpleMessage("行ったことがある階に戻れる。\nどの階かは分からない。");
            } else if (sceneName === "BattleScene") {
                message = SimpleMessage("行ったことがある階に戻れる。\n戦闘中は使えない。");
            } else if (tmpDate.playerInfo.map < 2) {
                message = SimpleMessage("行ったことがある階に戻れる。\nここでは使えない。");
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
                message = QuestionMessage("行ったことがある階に戻れる。\nどの階かは分からない。\n1枚使いますか？", yesFnc, null);
            }
            App.pushScene(MessageScene(message));
        });

        // 死の腕時計
        const countdownButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 80,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.countdownLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -200,
            y: 0,
            align: "left",
        }).addChildTo(countdownButton);
        countdownButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.countdown === false) {

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

        // 魔法の目薬
        const megusuriButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: 0,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.megusuriLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -200,
            y: 0,
            align: "left",
        }).addChildTo(megusuriButton);
        megusuriButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.megusuri === 0) {
                message = SimpleMessage("答えが見える不思議な目薬。");
            } else {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.megusuri -= 1;
                    self.refreshText();
                    App.flare("megusuri");
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

        // 修行の指輪
        const ringButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: -80,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.ringLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -200,
            y: 0,
            align: "left",
        }).addChildTo(ringButton);
        ringButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.ring === false) {
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

        // にんじん
        const carotteButton = RectangleShape({
            fill: '#000',
            stroke: "#fff",
            strokeWidth: 8,
            x: 0,
            y: -160,
            width: 450,
            height: 50,
            cornerRadius: 8,
        }).addChildTo(Box).setInteractive(true);
        self.carotteLabel = Label({
            fill: "white",
            fontSize: 30,
            x: -200,
            y: 0,
            align: "left",
        }).addChildTo(carotteButton);
        carotteButton.on("pointstart", function() {
            let message;
            if (tmpDate.playerInfo.items.carotte === 0) {
                message = SimpleMessage("食べるとHPが回復する。");
            } else if (tmpDate.playerInfo.hp === tmpDate.playerInfo.level * 5) {
                message = SimpleMessage("食べるとHPが回復する。\n今はHPが満タンです。");
            } else {
                const yesFnc = () => {
                    tmpDate.playerInfo.items.carotte -= 1;
                    tmpDate.playerInfo.hp += 1;
                    self.refreshText();
                    return SimpleMessage("HPが1回復しました。");
                };
                message = QuestionMessage("食べるとHPが回復する。\n1本食べますか？", yesFnc, null);
            }
            App.pushScene(MessageScene(message));
        });

        self.refreshText();
    },
    refreshText: function() {
        this.statusLabel.text = levelText(tmpDate.playerInfo.level) + '  HP: ' + tmpDate.playerInfo.hp + "／" + (tmpDate.playerInfo.level * 5);
        this.carotteLabel.text = "にんじん　： " + (tmpDate.playerInfo.items.carotte === 0 ? "持っていない" : tmpDate.playerInfo.items.carotte + " 本");
        this.ringLabel.text = "修行の指輪： " + (tmpDate.playerInfo.items.ring === null ? "持っていない" : (tmpDate.playerInfo.items.ring === true ? "装着中" : "外している"));
        this.megusuriLabel.text = "魔法の目薬： " + (tmpDate.playerInfo.items.megusuri === 0 ? "持っていない" : tmpDate.playerInfo.items.megusuri + " 滴");
        this.countdownLabel.text = "死の腕時計： " + (tmpDate.playerInfo.items.countdown === null ? "持っていない" : (tmpDate.playerInfo.items.countdown === true ? "装着中" : "外している"));
        this.featherLabel.text = "飛竜の羽根： " + (tmpDate.playerInfo.items.feather === 0 ? "持っていない" : tmpDate.playerInfo.items.feather + " 枚");
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
            },
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

//マップチップ
var STAGE = {
    B0: [
        "XXXXXX11111",
        "XXXXXX12E21",
        "XXXXXX12221",
        "XXXXXX11211",
        "XXXXXXX121",
        "XXXXXXX121",
        "1111111121111111",
        "1      p2     21",
        "1  a 2  2    b 1",
        "1       2  2   1",
        "1  2     c     1",
        "1    o  S     d1",
        "1    2       2 1",
        "1111111111111111",
    ],
    B1: [
        "11111111111111111111111111",
        "1  S                     1",
        "1         q              1",
        "1         E         g    1",
        "1                        1",
        "11111111111111111111111111",
    ],
    B2: [
        "11111111111111111111111111",
        "1  S                     1",
        "1             1111       1",
        "1             1 E        1",
        "111           1          1",
        "XX1111111111111          1",
        "XXXXXXXXXXXXXX111111111111",
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
        "1 E            1",
        "1     1     S  1",
        "1              1",
        "1111111111111111",
    ],
    B5: [
        "1111111111111",
        "1  S        1",
        "1           1",
        "1           1",
        "1         E 1",
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
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B8: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B9: [
        "111111111111111111111111111",
        "1                         1",
        "1  11111111111111111      1",
        "1      1XXXXX1     1      1",
        "11111  1XXXXX1  E  1      1",
        "1      1XXXXX1     1      1",
        "1      1XXXXX1            1",
        "1  S   1XXXX111111111111111",
        "1      1X1111      1      1",
        "1      1X1         1111   1",
        "111    1X1111111          1",
        "XX1    1XXXXXXX11111111   1",
        "111    1111111111111      1",
        "1                         1",
        "111111111111111111111111111",
    ],
    B10: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B11: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B12: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B13: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B14: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B15: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B16: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B17: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B18: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B19: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B20: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1        1",
        "1111111111",
    ],
};
