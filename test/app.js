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
        "home": "images/home.png",
        "water": "images/water.png",
        "tree": "images/tree.png",
        "fox": "images/fox.png",
        "hospital": "images/hospital.png",
        "tatefuda": "images/tatefuda.png",
        "koala": "images/koala.png",
        "flower": "images/flower.png",
        "hole1": "images/hole1.png",
        "hole2": "images/hole2.png",
        "npc1": "images/npc1.png",
        "npc2": "images/npc2.png",
        "npc3": "images/npc3.png",
        "npc4": "images/npc4.png",
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

        this.backgroundColor = "white";

        Label({
            text: 'うさこの',
            x: 320,
            y: 420,
            fontSize: 40,
            fill: "black",
        }).addChildTo(this);
        Label({
            text: '囲碁死活ダンジョン',
            x: 320,
            y: 500,
            fontSize: 50,
            fill: "black",
            // strokeWidth: 10,
            // stroke: "black",
        }).addChildTo(this);
        Player().setPosition(200,420).addChildTo(this);

    
        // データ初期化
        tmpDate.playerInfo = {map:0, level:1, hp:5, carotte:0, x:null, y:null};
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

        console.log("レベル  1,  2,  3,  4,  5,  6,  7,  8,  9, 10");
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
            questions.filter((q) => q.level === 10 && q.hp > 0).length.toString().padStart(3, " "));

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
            stroke: "#fff",
            strokeWidth: 20,
            x: this.gridX.center(),
            y: -100,
            width: this.gridX.width - 30,
            height: 50,
        }).addChildTo(this);

        var statusLabel = Label({
            text:  levelText(playerInfo.level) + '  HP : ' + playerInfo.hp + "／" + (playerInfo.level * 5) + "  にんじん : " + playerInfo.carotte,
            fill: '#fff',
            x: 10,
            y: 0,
        }).addChildTo(statusBox);
        statusBox.tweener.moveTo(this.gridX.center(), 40, 500, "easeOutQuad").play();

        if (playerInfo.map !==0 ) {
            const enemyLevel = Math.ceil(playerInfo.map / 3);
            let msg = "地下" + playerInfo.map + "階  " + "難易度" + enemyLevel;
            const enemyNum = questions.filter((q) => q.level === enemyLevel && q.hp > 0).length;
            if (enemyNum > 0) {
                msg += " あと" + enemyNum + "問でﾚﾍﾞﾙｱｯﾌﾟ";
            } else {
                msg += " 全問正解済み";
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
        var r = Random.randint(1, 200);
        if (r === 200) {
            const enemyLevel = Math.ceil(tmpDate.playerInfo.map / 3);
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
    init: function(npc_id) {
        switch(npc_id) {
            case "a":
                this.superInit("npc1", BOX_WIDTH, BOX_HEIGHT);
                this._text = "村人\n「地下に行くほど敵も強くなる。\n問題も難しくなるし、\n受けるダメージも大きいよ」";
                break;
            case "b":
                this.superInit("npc2", BOX_WIDTH, BOX_HEIGHT);
                this._text = "村人\n「上の階には戻れないから、\n慎重に進んでね」";
                break;
            case "c":
                this.superInit("npc3", BOX_WIDTH, BOX_HEIGHT);
                this._text = "村人\n「ダンジョンに行くのかい？\nがんばれよ！」";
                break;
            case "d":
                this.superInit("npc4", BOX_WIDTH, BOX_HEIGHT);
                this._text = "村人\n「レベルを上げずに進み過ぎると\nちょっとのミスであの世行き。\nレベル上げも大事よ。」";
                break;
            case "o":
                this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
                this._text = "「囲碁の村」";
                break;
            case "p":
                this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
                this._text = "「地下ダンジョン入り口」";
                break;
            default:
        }
    },
    say: function() {
        App.pushScene(MessageScene(this._text));
    }
});

/*
 * メッセージシーン
 */
phina.define("MessageScene", {
    superClass: 'DisplayScene',
    init: function(text) {
        this.superInit();
        var self = this;

        this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

        this.onpointstart = function() {
            self.exit();
        };

        const msgBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridX.unitWidth * 6,
            fill: 'white',
            stroke: "black",
            strokeWidth: 30,
            x: this.gridX.center(),
            y: 820,
            cornerRadius: 2,
        }).addChildTo(this);

        this.messageLabel = Label({
            fill: 'black',
            align:"left",
            x: -250,
        }).addChildTo(msgBox);

        this.messageLabel.alpha = 0;
        this.messageLabel.y = 20;
        this.messageLabel.text = text;
        this.messageLabel.tweener.to({y: 0, alpha: 1}, 300).play();
    },
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
        .wait(400)
        .to({x: self.gridX.center() + 800}, 200, "easeOutQuad")
        .call(function() {
            Label({
                text: levelText(tmpDate.playerInfo.level) + " になった",
                fontSize: 90,
                fontWeight: 800,
                fill: "red",
                stroke: "white",
                strokeWidth: 20,
            }).addChildTo(self)
            .setPosition(-700, self.gridY.center())
            .tweener.to({x: self.gridX.center()}, 400, "easeOutExpo")
            .wait(500)
            .to({x: self.gridX.center() + 800}, 200, "easeOutQuad")
            .call(function() {
                self.exit();            
            })
            .play();
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
            return "20級";
        case 2:
            return "10級";
        case 3:
            return "五級";
        case 4:
            return "二級";
        case 5:
            return "初段";
        case 6:
            return "二段";
        case 7:
            return "五段";
        case 8:
            return "九段";
        case 9:
            return "名人";
        default:
            return "仙人";
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
        "1  a 2  2   b  1",
        "1       2  2   1",
        "1  2     c    d1",
        "1    o  S      1",
        "1    2       2 1",
        "1111111111111111",
    ],
    B1: [
        "1111111111111",
        "1  S        1",
        "1           1",
        "1           1",
        "1         E 1",
        "1111111111111",
    ],
    B2: [
        "1111111111",
        "1 E      1",
        "1        1",
        "1      S 1",
        "1        1",
        "1111111111",
    ],
    B3: [
        "11111111111111111",
        "1 S             1",
        "1               1",
        "1111111111111   1",
        "XXXXXXXXXXXX1   1",
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
        "1      E 1",
        "1111111111",
    ],
    B21: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B22: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B23: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B24: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B25: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B26: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B27: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B28: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B29: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1      E 1",
        "1111111111",
    ],
    B30: [
        "1111111111",
        "1        1",
        "1   S    1",
        "1        1",
        "1        1",
        "1111111111",
    ],
};
