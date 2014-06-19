/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.Layer.extend({
    _background: null,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        /////////////////////////////
        // 3. add your codes below...

        // add background background
        _background = cc.Sprite.create(s_titleScr);
        _background.setAnchorPoint(0.5, 0.5);
        _background.setPosition(size.width / 2, size.height / 2);
        _background.setScale(size.height / _background.getContentSize().height);
        this.addChild(_background, 0);

		// create main menu items
		var m_playBttn = new cc.MenuItemImage.create(s_playBttnUp, s_playBttnDown, this.play, this);
		var m_rulesBttn = new cc.MenuItemImage.create(s_rulesBttnUp, s_rulesBttnDown, this.showRules, this);
		var m_infoBttn = new cc.MenuItemImage.create(s_infoBttnUp, s_infoBttnDown, this.showInfo, this);
		
		m_playBttn.setPosition(new cc.Point(0, 50));
		m_rulesBttn.setPosition(new cc.Point(0, -75));
		m_infoBttn.setPosition(new cc.Point(0, -200));

		var menu = cc.Menu.create(m_playBttn, m_rulesBttn, m_infoBttn);
		menu.setPosition(new cc.Point(size.width / 2, size.height / 2));
		
		this.addChild(menu);
    },

	play: function() {
		cc.Director.getInstance().replaceScene(new GameScene());
	},

	showRules: function() {
		cc.Director.getInstance().replaceScene(new RulesScene());
	},

	showInfo: function() {
		cc.Director.getInstance().replaceScene(new InfoScene());
	}
});

var RulesLayer = cc.Layer.extend({
	init: function() {
		this._super();

		var size = cc.Director.getInstance().getWinSize();

		var background = cc.Sprite.create(s_background3);
		background.setPosition(size.width / 2, size.height / 2);
		this.addChild(background);

		var rules = cc.Sprite.create(s_rules);
		rules.setPosition(size.width / 2, size.height / 2);
		this.addChild(rules);
		
		var backBttn = new cc.MenuItemFont.create("Volver al menu principal", this.backToMenu, this);
		backBttn.setPosition(new cc.Point(size.width / 4, size.height / 8));
		var menu = cc.Menu.create(backBttn);
		menu.setPosition(new cc.Point(0, 0));
		this.addChild(menu);
	},
	backToMenu: function() {
		cc.Director.getInstance().replaceScene(new MyScene());
	}
});

var RulesScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new RulesLayer();
		this.addChild(layer);
		layer.init();
	}
});

var InfoLayer = cc.Layer.extend({
	init: function() {
		this._super();

		var size = cc.Director.getInstance().getWinSize();

		var background = cc.Sprite.create(s_background3);
		background.setPosition(size.width / 2, size.height / 2);
		this.addChild(background);

		var info = cc.Sprite.create(s_info);
		info.setPosition(size.width / 2, size.height / 2);
		this.addChild(info);

		var backBttn = new cc.MenuItemFont.create("Volver al menu principal", this.backToMenu, this);
		backBttn.setPosition(new cc.Point(size.width / 4, size.height / 8));
		var menu = cc.Menu.create(backBttn);
		menu.setPosition(new cc.Point(0, 0));
		this.addChild(menu);
	},
	backToMenu: function() {
		cc.Director.getInstance().replaceScene(new MyScene());
	}
});

var InfoScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new InfoLayer();
		this.addChild(layer);
		layer.init();
	}
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer, 0);
        layer.init();
    },
});
