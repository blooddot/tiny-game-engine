(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GraphicNode_1 = __importDefault(require("./GraphicNode"));
var Model_1 = __importDefault(require("./Model"));
/**
 * @author 雪糕
 * @description
 */
var GraphicImage = /** @class */ (function (_super) {
    __extends(GraphicImage, _super);
    function GraphicImage(source) {
        var _this = _super.call(this) || this;
        if (source) {
            _this.source = source;
        }
        return _this;
    }
    Object.defineProperty(GraphicImage.prototype, "img", {
        get: function () {
            var _this = this;
            if (this._img)
                return this._img;
            this._img = new Image();
            this._img.onload = function () {
                _this._width = _this._width || _this._img.width;
                _this._height = _this._height || _this._img.height;
                Model_1.default.dirty = true;
            };
            return this._img;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicImage.prototype, "source", {
        set: function (value) {
            if (this._source === value)
                return;
            this.img.src = this._source = value;
            Model_1.default.dirty = true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicImage.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicImage.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    GraphicImage.prototype.setSize = function (width, height) {
        if (this._width === width && this._height === height)
            return;
        this._width = width;
        this._height = height;
        Model_1.default.dirty = true;
    };
    GraphicImage.prototype.render = function () {
        if (!this._img)
            return;
        Model_1.default.ctx.drawImage(this._img, this.globalX, this.globalY, this._width, this._height);
    };
    return GraphicImage;
}(GraphicNode_1.default));
exports.default = GraphicImage;

},{"./GraphicNode":2,"./Model":3}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __importDefault(require("./Model"));
/**
 * @author 雪糕
 * @description
 */
var GraphicNode = /** @class */ (function () {
    function GraphicNode() {
        this._x = 0;
        this._y = 0;
        this._children = [];
    }
    GraphicNode.prototype.setParent = function (value) {
        if (this._parent === value)
            return;
        this._parent = value;
        Model_1.default.dirty = true;
    };
    Object.defineProperty(GraphicNode.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicNode.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    GraphicNode.prototype.setPos = function (x, y) {
        this._x = x;
        this._y = y;
        Model_1.default.dirty = true;
    };
    Object.defineProperty(GraphicNode.prototype, "globalX", {
        get: function () {
            var _a;
            return this._x + ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.globalX) || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicNode.prototype, "globalY", {
        get: function () {
            var _a;
            return this._y + ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.globalY) || 0;
        },
        enumerable: false,
        configurable: true
    });
    GraphicNode.prototype.addChild = function (value) {
        this._children.push(value);
        value.setParent(this);
        Model_1.default.dirty = true;
    };
    GraphicNode.prototype.removeChild = function (value) {
        var index = this._children.indexOf(value);
        if (index < 0)
            return;
        this._children.splice(index, 1);
        Model_1.default.dirty = true;
    };
    GraphicNode.prototype.render = function () {
        if (!this._children.length)
            return;
        this._children.forEach(function (child) { return child.render(); });
    };
    GraphicNode.prototype.$update = function (deltaTime) {
        this._children.forEach(function (child) { return child.$update(deltaTime); });
        this.onUpdate(deltaTime);
    };
    GraphicNode.prototype.onUpdate = function (deltaTime) {
        //
    };
    return GraphicNode;
}());
exports.default = GraphicNode;

},{"./Model":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 雪糕
 * @description
 */
var Model = /** @class */ (function () {
    function Model() {
    }
    Object.defineProperty(Model, "ctx", {
        get: function () {
            return this._ctx;
        },
        enumerable: false,
        configurable: true
    });
    Model.setCtx = function (value) {
        this._ctx = value;
    };
    Model.dirty = false;
    Model.CANVAS_WIDTH = 1000;
    Model.CANVAS_HEIGHT = 500;
    return Model;
}());
exports.default = Model;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GraphicImage_1 = __importDefault(require("./GraphicImage"));
/**
 * @author 雪糕
 * @description
 */
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ySpeed = 0;
        _this._fallAccSpeed = 0.001;
        _this._fallDefaultSpeed = 0.1;
        _this._jumpAccSpeed = 0.0003;
        _this._jumpDefaultSpeed = -0.5;
        _this._xDefaultSpeed = 0.1;
        _this._xAccSpeed = 0.002;
        _this._dir = 1;
        return _this;
    }
    Monster.prototype.setDir = function (value) {
        this._dir = value;
    };
    Monster.prototype.getXSpeed = function (deltaTime) {
        var speed = this._xDefaultSpeed + this._xAccSpeed * deltaTime;
        return this._dir >= 0 ? speed : -speed;
    };
    Monster.prototype.getYSpeed = function (deltaTime) {
        if (this._ySpeed >= 0 && this._y >= Monster.MAX_Y)
            return this._jumpDefaultSpeed;
        if (this._ySpeed <= 0 && this._y <= Monster.MIN_Y)
            return this._fallDefaultSpeed;
        var accSpeed = this._ySpeed > 0 ? this._fallAccSpeed : this._jumpAccSpeed;
        this._ySpeed += accSpeed * deltaTime;
        return this._ySpeed;
    };
    Monster.prototype.onUpdate = function (deltaTime) {
        this._ySpeed = this.getYSpeed(deltaTime);
        var x = this.x + deltaTime * this.getXSpeed(deltaTime);
        var y = this.y + deltaTime * this._ySpeed;
        this.setPos(x, y);
    };
    Monster.MIN_Y = 50;
    Monster.MAX_Y = 300;
    return Monster;
}(GraphicImage_1.default));
exports.default = Monster;

},{"./GraphicImage":1}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GraphicImage_1 = __importDefault(require("./GraphicImage"));
var GraphicNode_1 = __importDefault(require("./GraphicNode"));
var Model_1 = __importDefault(require("./Model"));
var Monster_1 = __importDefault(require("./Monster"));
/**
 * @author 雪糕
 * @description
 */
var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        _this.initView();
        _this.initEvent();
        return _this;
    }
    Stage.prototype.initView = function () {
        var background = new GraphicImage_1.default('./resource/background.jpg');
        this.addChild(background);
        background.setSize(Model_1.default.CANVAS_WIDTH, Model_1.default.CANVAS_HEIGHT);
        var ground = new GraphicImage_1.default('./resource/ground.png');
        this.addChild(ground);
        ground.setPos(0, Model_1.default.CANVAS_HEIGHT - 150);
        ground.setSize(Model_1.default.CANVAS_WIDTH, 150);
        this._monster = new Monster_1.default('./resource/monster.png');
        this.addChild(this._monster);
        this.addStar();
    };
    Stage.prototype.addStar = function () {
        this._star = new GraphicImage_1.default('./resource/star.png');
        this.addChild(this._star);
        this._star.setPos(50 + Math.random() * (Model_1.default.CANVAS_WIDTH - 100), 50 + Math.random() * (Model_1.default.CANVAS_HEIGHT - 200));
    };
    Stage.prototype.initEvent = function () {
        var _this = this;
        var halfWidth = Model_1.default.CANVAS_WIDTH / 2;
        document.addEventListener("mousedown", function (evt) {
            var dir = evt.clientX >= halfWidth ? 1 : -1;
            _this._monster.setDir(dir);
        });
    };
    Stage.prototype.$update = function (deltaTime) {
        var _this = this;
        _super.prototype.$update.call(this, deltaTime);
        if (!this.checkHitStar())
            return;
        this.destroyStar();
        setTimeout(function () {
            _this.addStar();
        }, 1000);
    };
    Stage.prototype.render = function () {
        Model_1.default.ctx.clearRect(0, 0, Model_1.default.CANVAS_WIDTH, Model_1.default.CANVAS_HEIGHT);
        _super.prototype.render.call(this);
    };
    Stage.prototype.checkHitStar = function () {
        if (!this._monster || !this._star)
            return false;
        if (!this._monster.width || !this._monster.height)
            return false;
        if (!this._star.width || !this._star.height)
            return false;
        if (Math.abs(this._monster.globalX - this._star.globalX) < this._monster.width / 2 + this._star.width / 2
            && Math.abs(this._monster.globalY - this._star.globalY) < this._monster.height / 2 + this._star.height / 2) {
            return true;
        }
        return false;
    };
    Stage.prototype.destroyStar = function () {
        if (!this._star)
            return;
        this.removeChild(this._star);
        this._star = null;
    };
    return Stage;
}(GraphicNode_1.default));
exports.default = Stage;

},{"./GraphicImage":1,"./GraphicNode":2,"./Model":3,"./Monster":4}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __importDefault(require("./Model"));
var Stage_1 = __importDefault(require("./Stage"));
/**
 * @author 雪糕
 * @description
 */
var canvas = document.getElementsByTagName('canvas')[0];
Model_1.default.setCtx(canvas.getContext('2d'));
canvas.width = Model_1.default.CANVAS_WIDTH;
canvas.height = Model_1.default.CANVAS_HEIGHT;
var stage = new Stage_1.default();
var preTimestamp;
var MS_PER_UPDATE = 1000 / 60;
var remainTime = 0;
//自定义帧率
requestAnimationFrame(onTick);
function onTick(timestamp) {
    if (!preTimestamp) {
        preTimestamp = timestamp;
    }
    var deltaTime = timestamp - preTimestamp;
    preTimestamp = timestamp;
    remainTime += deltaTime;
    while (remainTime >= MS_PER_UPDATE) {
        update(deltaTime);
        remainTime -= MS_PER_UPDATE;
    }
    render();
    requestAnimationFrame(onTick);
}
function update(deltaTime) {
    stage.$update(deltaTime);
}
function render() {
    if (!Model_1.default.dirty)
        return;
    Model_1.default.dirty = false;
    stage.render();
}

},{"./Model":3,"./Stage":5}]},{},[6]);
