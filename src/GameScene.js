var GameBackgroundLayer = cc.Layer.extend({
	init: function() {
		this._super();
		
		var size = cc.Director.getInstance().getWinSize();

		var background = cc.Sprite.create(s_background2);
		background.setAnchorPoint(0.5, 0.5);
        background.setPosition(size.width / 2, size.height / 2);
        background.setScale(size.height / background.getContentSize().height);
        this.addChild(background);
	}
});

var GameLayer = cc.Layer.extend({
	_player: null,
	_size: null,
	_fruits: [],
	_candies: [],
	_fruitType: 0,
	_fruitCount: 0,
	_candyCount: 0,
	_candyLabel: null,
	_fruitLabel: null,
	init: function() {
		this._super();

		this._size = cc.Director.getInstance().getWinSize();

		if ('touches' in sys.capabilities) {
			this.setTouchEnabled(true);
		}
		if ('mouse' in sys.capabilities) {
			this.setMouseEnabled(true);
		}

		this._player = cc.Sprite.create(s_hand);
		this._player.setAnchorPoint(0.5, 0.5);
		this._player.setPosition(this._size.width / 2, this._size.height / 2);
		this.addChild(this._player, 0);

		this._candyLabel = cc.LabelTTF.create("Dulces: 0", "Arial");
		this._candyLabel.setPosition(50, 100);
		this.addChild(this._candyLabel);
		this._fruitLabel = cc.LabelTTF.create("Frutas: 0", "Arial");
		this._fruitLabel.setPosition(50, 50);
		this.addChild(this._fruitLabel);

		this.schedule(this.addFruit, 3);
		this.schedule(this.addCandy, 1);
		this.schedule(this.checkCollisionCandies);
		this.schedule(this.checkCollisionFruits);
	},
	addFruit: function() {
		var fruit = null;
		if (this._fruitType == 0) {
			fruit = cc.Sprite.create(s_apple);
			fruit.setTag(0);
		}
		else if (this._fruitType == 1) {
			fruit = cc.Sprite.create(s_banana);
			fruit.setTag(1);
		}
		else if (this._fruitType == 2) {
			fruit = cc.Sprite.create(s_cherry);
			fruit.setTag(2);
		}
		this._fruitType = (this._fruitType + 1) % 3;

		var minX = fruit.getContentSize().width / 2;
		var maxX = this._size.width - fruit.getContentSize().width / 2;
		var actualX = (Math.random() * (maxX - minX)) + minX;
		fruit.setAnchorPoint(0.5, 0.5);
		fruit.setPosition(actualX, this._size.height + fruit.getContentSize().height / 2);
		this.addChild(fruit);

		var minDuration = 4.0;
		var maxDuration = 10.0;
		var actualDuration = (Math.random() * (maxDuration - minDuration)) + minDuration;

		var actionMove = cc.MoveTo.create(actualDuration, new cc.Point(actualX, -fruit.getContentSize().height / 2));
		var actionMoveDone = cc.CallFunc.create(function(node) {
			cc.ArrayRemoveObject(this._fruits, node);
			node.removeFromParent();
		}, this);
		fruit.runAction(cc.Sequence.create(actionMove, actionMoveDone));

		var actionRotate = cc.RotateBy.create(actualDuration, 720);
		fruit.runAction(cc.RepeatForever.create(actionRotate));

		this._fruits.push(fruit);
	},
	addCandy: function() {
		var candy = cc.Sprite.create(s_candy);

		var minX = candy.getContentSize().width / 2;
		var maxX = this._size.width - candy.getContentSize().width / 2;
		var actualX = (Math.random() * (maxX - minX)) + minX;
		candy.setAnchorPoint(0.5, 0.5);
		candy.setPosition(actualX, this._size.height + candy.getContentSize().height / 2);
		this.addChild(candy);

		var minDuration = 4.0;
		var maxDuration = 10.0;
		var actualDuration = (Math.random() * (maxDuration - minDuration)) + minDuration;

		var actionMove = cc.MoveTo.create(actualDuration, new cc.Point(actualX, -candy.getContentSize().height / 2));
		var actionMoveDone = cc.CallFunc.create(function(node) {
			cc.ArrayRemoveObject(this._candies, node);
			node.removeFromParent();
		}, this);
		candy.runAction(cc.Sequence.create(actionMove, actionMoveDone));

		var actionRotate = cc.RotateBy.create(actualDuration, -720);
		candy.runAction(cc.RepeatForever.create(actionRotate));

		this._candies.push(candy);
	},
	checkCollisionCandies: function() {
		for (var i = 0; i < this._candies.length; i++) {
			var candy = this._candies[i];
			var candyRect = candy.getBoundingBox();
			var playerRect = this._player.getBoundingBox();
			if (cc.rectIntersectsRect(candyRect, playerRect)) {
				cc.ArrayRemoveObject(this._candies, candy);
				candy.removeFromParent();
				this._candyCount++;
				this._candyLabel.setString("Dulces: " + this._candyCount);
				if (this._candyCount == 3) {
					var loseScr = GameOver.createLoseScr();
					cc.Director.getInstance().replaceScene(loseScr);
				}
			}
		}
	},
	checkCollisionFruits: function() {
		for (var i = 0; i < this._fruits.length; i++) {
			var fruit = this._fruits[i];
			var fruitRect = fruit.getBoundingBox();
			var playerRect = this._player.getBoundingBox();
			if (cc.rectIntersectsRect(fruitRect, playerRect)) {
				cc.ArrayRemoveObject(this._fruits, fruit);
				fruit.removeFromParent();
				this._fruitCount++;
				this._fruitLabel.setString("Frutas: " + this._fruitCount);
				if (this._fruitCount == 15) {
					var winScr = GameOver.createWinScr();
					cc.Director.getInstance().replaceScene(winScr);
				}
			}
		}

	},
	updatePlayer: function(location) {
		this._player.setPosition(location);
	},
	onMouseEntered: function(event) {
		var location = event.getLocation();
		this.updatePlayer(event);
	},
	onMouseMoved: function(event) {
		var location = event.getLocation();
		this.updatePlayer(location);
	},
	onTouchBegan: function(event) {
		var location = event.getLocation();
		this.updatePlayer(location);
	},
	onTouchMoved: function(event) {
		var location = event.getLocation();
		this.updatePlayer(location);
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();

		var background = new GameBackgroundLayer();
		this.addChild(background, 0);
		background.init();

		var game = new GameLayer();
		this.addChild(game, 1);
		game.init();
	}
});
