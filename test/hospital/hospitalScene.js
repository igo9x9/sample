// 病院
phina.define("HospitalScene", {
    superClass: 'DisplayScene',
    _playerInfo: null,

    init: function(param) {
        const self = this;
        this.superInit(param);

        this.backgroundColor = 'white';
        this._playerInfo = param.playerInfo;

        let phase = 0;

        Sprite("koala", 64, 45)
        .addChildTo(self)
        .setPosition(self.gridX.center(), self.gridY.center(-2))
        .setFrameIndex(0);

        this.titleBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridY.unitWidth,
            fill: 'white',
            stroke: "black",
            strokeWidth: 30,
            x: this.gridX.center(),
            y: this.gridY.span(1),
            cornerRadius: 2,
        }).addChildTo(this);
        this.hpLabel = Label({
            fill: 'black',
            text: "病院",
        }).addChildTo(this.titleBox);

		this.statusBox = RectangleShape({
            width: this.gridX.width - this.gridX.unitWidth,
            height: this.gridX.unitWidth * 2,
            fill: 'white',
            stroke: "black",
            strokeWidth: 30,
            x: this.gridX.center(),
            y: 630,
            cornerRadius: 2,
		}).addChildTo(this);

        this.hpLabel = Label({
            fill: 'white',
            align:"left",
            x: -250,
        }).addChildTo(this.statusBox);

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

        this.updateMessage("コアラ先生\n「ここは病院じゃよ。」");

        this.on("pointstart", function() {

            if (phase === 0) {
                if (self._playerInfo.hp === 10) {
                    self.updateMessage("コアラ先生\n「けがをしたらおいで。」");
                    phase = 9;
                } else if (self._playerInfo.carotte < 3) {
                    self.updateMessage("コアラ先生\n「すまんの。治療するには、\nにんじんが3本必要じゃ。」");
                    phase = 9;
                } else {
                    self.updateMessage("コアラ先生\n「どれ、けがを治してやろう。」");
                    phase = 1;
                }
            } else if (phase === 1) {
                self._playerInfo.hp = 10;
                updateHpLabel();
                self.updateMessage("コアラ先生\n「ほれ、治したよ。\nお代はにんじん3本じゃ。」");
                self._playerInfo.carotte -= 3;
                updateHpLabel();
                phase = 9;
            } else if (phase === 9) {
                self.exit();
            }
        });


        updateHpLabel();
        
        function updateHpLabel() {
            self.hpLabel.text = "うさこ      HP : " + self._playerInfo.hp + "   にんじん : " + self._playerInfo.carotte;
            if (self._playerInfo.hp <= 3) {
                self.hpLabel.fill = "red";
                self.statusBox.stroke = "red";
            } else {
                self.hpLabel.fill = "black" ;
                self.statusBox.stroke = "black";
            }
        }
        
    },
    updateMessage: function(text) {
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
});
