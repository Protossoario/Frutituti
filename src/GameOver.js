var GameOver = {
};

GameOver.createPlayAgainBttn = function() {
	var size = cc.Director.getInstance().getWinSize();

	var layer = cc.Layer.create();
	
	var playBttn = new cc.MenuItemImage.create(s_playAgainBttnUp, s_playAgainBttnDown, GameOver.playAgain, this);
	playBttn.setPosition(new cc.Point(size.width / 2, size.height / 8));
	var menu = new cc.Menu.create(playBttn);
	menu.setPosition(new cc.Point(0, 0));

	layer.addChild(menu);
	return layer;
};

GameOver.createWinScr = function() {
	var size = cc.Director.getInstance().getWinSize();

	var scene = cc.Scene.create();
	var backgroundLayer = cc.Layer.create();

	var background = cc.Sprite.create(s_winScr);
	background.setPosition(size.width / 2, size.height / 2);
	backgroundLayer.addChild(background);

	var menuLayer = GameOver.createPlayAgainBttn();

	scene.addChild(backgroundLayer, 0);
	scene.addChild(menuLayer, 1);
	return scene;
};

GameOver.createLoseScr = function() {
	var size = cc.Director.getInstance().getWinSize();

	var scene = cc.Scene.create();
	var backgroundLayer = cc.Layer.create();

	var background = cc.Sprite.create(s_loseScr);
	background.setPosition(size.width / 2, size.height / 2);
	backgroundLayer.addChild(background);

	var menuLayer = GameOver.createPlayAgainBttn();

	scene.addChild(backgroundLayer, 0);
	scene.addChild(menuLayer, 1);
	return scene;
};

GameOver.playAgain = function() {
	cc.Director.getInstance().replaceScene(new MyScene());
}
