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
        "floor": "images/floor.png",
        "wall": "images/wall.png",
        "home": "images/home.png",
        "water": "images/water.png",
        "stone": "images/stone.png",
        "fox": "images/fox.png",
        "hospital": "images/hospital.png",
        "tatefuda": "images/tatefuda.png",
        "koala": "images/koala.png",
    },
};

// タイトルシーン
phina.define('TitleScene', {
    superClass: 'DisplayScene',
  
    init: function(options) {
        this.superInit(options);

        this.backgroundColor = "black";

        Label({
            text: 'うさこの',
            x: 320,
            y: 400,
            fontSize: 50,
            fill: "white",
        }).addChildTo(this);
        Label({
            text: '死活クエスト',
            x: 320,
            y: 480,
            fontSize: 60,
            fill: "yellow",
            strokeWidth: 1,
            stroke: "yellow",
        }).addChildTo(this);
        Player().setPosition(200,400).addChildTo(this);

    
        // データ初期化
        tmpDate.playerInfo = {hp:10, carotte:0, x:null, y:null};
        tmpDate.nextMapLabel = null;
        tmpDate.nowMapLabel = null;
        tmpDate.layer1 = null;
        tmpDate.layer2 = null;
        tmpDate.mapMoveDate = null;
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
  init: function(options) {
    this.superInit(options);
    
    //背景色
    this.backgroundColor = '#aaa';
    
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
    this.setStage();
    
    //タッチポイント
    this.touchPointX = null;
    this.touchPointY = null;
    this.touchCircle = null;
  },
  
  /**
   * ステージ作成
   */
  setStage: function() {
    var stageX = this.stageX;
    var stageY = this.stageY;
    
    //マップのレイヤー
    var layer2 = DisplayElement().addChildTo(this);//当たり判定のあるもの

    var statusBox = RectangleShape({
        fill: '#000',
        stroke: "#fff",
        strokeWidth: 20,
        x: 10,
        y: -50,
        width: 500,
        height: 50,
    }).setOrigin(0, 0).addChildTo(this);

    var statusLabel = Label({
        text: 'HP : ' + tmpDate.playerInfo.hp + "  にんじん : " + tmpDate.playerInfo.carotte,
        fill: '#fff',
        x: 10,
        y: 5,
    }).setOrigin(0, 0).addChildTo(statusBox);
    statusBox.tweener.moveTo(10, 10, 500, "easeOutQuad").play();

    //他の画面から来た時用にシェードを用意
    this.offShade();
    
    //プレイヤー生成
    var player = Player().addChildTo(this);
    
    //表示するマップのラベルを準備
    var stage = STAGE.main;
    tmpDate.nowMapLabel = 'main';
    if (tmpDate.mapMoveDate != null) {
        //遷移後のマップラベルがあればそれを表示
        stage = STAGE[tmpDate.mapMoveDate.nextMapLabel];
        tmpDate.nowMapLabel = tmpDate.mapMoveDate.nextMapLabel;
    }
    
    if (tmpDate.layer2 != null) {
        //マップの位置データがあった場合はそれを使う
        layer2.children = tmpDate.layer2;
    } else {
        //ステージ情報を元にマップチップを配置
        for (var i = 0; i < stage.length; i += 1) {
            var rows = stage[i].split("");
            for (var j = 0; j < rows.length; j +=1) {
                var item = rows[j];
                
                if (item === "0") {
                    FloorBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "S") {
                    // 家
                    HomeBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "T") {
                    // 立札
                    let text;
                    switch (i) {
                        case 3:
                            text = "「うさこのいえ」";
                            break;
                        case 4:
                            text = "ぴよ";
                            break;
                    }
                    TatefudaBlock(text).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
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
                if (item === "1") {
                    //1に壁
                    WallBlock().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "2") {
                    BlackBox().addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "5") {
                    //5にメインフィールドへの移動ブロック
                    MoveBlock(mapMoveDate.caveEntry).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "6") {
                    //6に洞窟への移動ブロック
                    MoveBlock(mapMoveDate.caveExit).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "7") {
                    //7にメインフィールドへの移動ブロック
                    MoveBlock(mapMoveDate.shopEntry).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (item === "8") {
                    //8にショップへの移動ブロック
                    MoveBlock(mapMoveDate.shopExit).addChildTo(layer2).setPosition(stageX.span(j), stageY.span(i));
                }
                if (tmpDate.playerInfo.x == null) {
                    if (item === "S") {
                        //9はマップ上の主人公の位置なので保存する
                        tmpDate.playerInfo.x = stageX.span(j);
                        tmpDate.playerInfo.y = stageY.span(i) + 80;
                    }
                }
            }
        }
      
        //マップデータ上の９だった場所が中心になるようにマップを移動
        layer2.children.each(function(block) {
            block.x += stageX.span(COLUMNS_COUNT_X / 2) - tmpDate.playerInfo.x;
            block.y += stageY.span(COLUMNS_COUNT_Y / 2) - tmpDate.playerInfo.y;
        });

    }
  
    if (tmpDate.playerInfo !== null) {
        //プレイヤーの向きデータが保存されていた向きを調整
        player.direction = tmpDate.playerInfo.direction;
    }
    
    //プレイヤーはいつだって真ん中
    player.setPosition(stageX.span(COLUMNS_COUNT_X / 2), stageY.span(COLUMNS_COUNT_Y / 2));
    
    //クラス内で参照できるようにする
    this.player = player;
    this.layer2 = layer2;
  },
  
  /**
   * x軸のあたり判定
   */
  collisionX: function() {
    var player = this.player;
    
    if (player.vx == 0) {
        return;
    }
    
    var newx = player.left + player.vx;
    var rect = Rect(newx + 20, player.top + 20, player.width / 4, player.height / 2);
    var hit = false;
    
    //ブロックとの衝突判定
    this.layer2.children.some(function(block) {
        if (block.className === 'FloorBlock' || block.className === "BridgeBlock") {
            return;
        }
        if (Collision.testRectRect(block, rect)) {
            if (block.className === 'HospitalBlock') {
                tmpDate.layer2 = this.layer2.children;
                this.nextScene('HospitalScene', {playerInfo: tmpDate.playerInfo});
            }
            if (block.className === "TatefudaBlock") {
                block.read();
            }
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
        //マップチップを動かす
        this.layer2.children.each(function(block) {
            block.x += -this.player.vx;
        }, this);
    }
  },
  
  /**
   * y軸のあたり判定
   */
  collisionY: function() {
    var player = this.player;
    
    if (player.vy == 0) {
        return;
    }
    
    var newy = player.top + player.vy;
    var rect = Rect(player.left + 20, newy + 20, player.width / 4, player.height / 2);
    var hit = false;
    
    //ブロックとの衝突判定
    this.layer2.children.some(function(block) {
        if (block.className === 'FloorBlock' || block.className === "BridgeBlock") {
            return;
        }
        if (Collision.testRectRect(block, rect)) {
            if (block.className === 'HospitalBlock') {
                tmpDate.layer2 = this.layer2.children;
                this.nextScene('HospitalScene', {playerInfo: tmpDate.playerInfo});
            }
            if (block.className === "TatefudaBlock") {
                block.read();
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
        //マップチップを動かす
        this.layer2.children.each(function(block) {
            block.y += -this.player.vy;
        }, this);
    }
  },
  
    /**
     * プライヤーの動作
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
        if (key.getKeyDown('s')) {
            //ステータスを確認
            this.nextScene('TitleScene')
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
    nextScene: function(nextLabel, param) {
        var self = this;

        //動き方を決める
        var easing = 'easeOutExpo';
        if (nextLabel === 'ButtleScene') {
            easing = 'easeInOutBounce';
        }

        //シェードを開いた後に画面遷移
        this.onShade(function() {
            self.exit(nextLabel, param);
        }, 'easeInOutBounce');
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
    offShade: function() {
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
        });
    },
  
    /**
     * ランダムでバトルに突入
     */
    randomButtle: function() {
        var r = Random.randint(1, 200);
        if (r === 200) {
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

        //バトル後に戻って来る情報を保存
        // tmpDate.layer2 = this.layer2.children;

        //バトル画面に遷移
        this.nextScene('ButtleScene', {playerInfo: tmpDate.playerInfo});
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
    
    if (this.player.isMove) {
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
  
    init: function() {
        this.superInit("player", 64, 64);

        //キャラクターへのタッチを許可
        this.setInteractive(true);

        //向き
        this.direction = DIRECTION.DOWN;

        //画像の向き
        this.frameIndex = DIRECTION.DOWN;

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
// 立札クラス
//-------------------------
phina.define('TatefudaBlock', {
    superClass: 'Sprite',
    _text: "",
    init: function(text) {
      this.superInit("tatefuda", BOX_WIDTH, BOX_HEIGHT);
      this._text = text;
    },
    read: function() {
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
// 画面切り替えブロッククラス
//-------------------------
phina.define('MoveBlock', {
    superClass: 'Sprite',
  
    init: function(mapMoveDate) {
        this.superInit("door", BOX_WIDTH, BOX_HEIGHT);

        //移動先のマップラベル
        this.mapMoveDate = mapMoveDate;
    },
});

let App;

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


//-------------------------
// データ管理
//-------------------------
var tmpDate = {
    playerInfo  : null,
    nowMapLabel : null,
    nextMapLabel: null,
    layer1      : null,
    layer2      : null,
    mapMoveDate : null,
}

//マップチップ
var STAGE = {
 //メインフィールド
 main: [
  "111111111111111111111111111",
  "1WW0S0100000000000000000001",
  "1WW0001000H0000000000000001",
  "11100T100000000000000000001",
  "100000000000T00000000000001",
  "100000000000000000000000001",
  "100000000000000000000000001",
  "100000000000000000000000001",
  "100000000000000000000000001",
  "100000000000000000000000001",
  "100000000000000000000000001",
  "111111111111111111111111111",
 ],
 //お店
 shop: [
  [2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],
  [2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,7,0,0,0,0,0,0,0,1],
  [2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
  [2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 ],
 //洞窟
 cave: [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 ],
};
