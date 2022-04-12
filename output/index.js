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
            if (this._img)
                return this._img;
            this._img = new Image();
            this._img.onload = function () {
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
    GraphicImage.prototype.render = function () {
        if (!this._img)
            return;
        Model_1.default.ctx.drawImage(this._img, this.globalX, this.globalY, this._img.width, this._img.height);
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
var GraphicNode_1 = __importDefault(require("./GraphicNode"));
/**
 * @author 雪糕
 * @description
 */
var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        var background = new GraphicImage_1.default('./resource/background.jpg');
        _this.addChild(background);
        return _this;
    }
    return Stage;
}(GraphicNode_1.default));
exports.default = Stage;

},{"./GraphicImage":1,"./GraphicNode":2}],5:[function(require,module,exports){
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
canvas.width = 500;
canvas.height = 500;
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
    requestAnimationFrame(onTick);
}
function update(deltaTime) {
    if (Model_1.default.dirty) {
        Model_1.default.dirty = false;
        stage.render();
    }
}

},{"./Model":3,"./Stage":4}]},{},[5]);
