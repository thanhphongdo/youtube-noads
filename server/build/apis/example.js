"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ExampleApi = void 0;
var base_1 = require("./base");
var ExampleApi = /** @class */ (function (_super) {
    __extends(ExampleApi, _super);
    function ExampleApi(router) {
        var _this = _super.call(this, router) || this;
        _this.getExample();
        return _this;
    }
    ExampleApi.prototype.getExample = function () {
        this.router.get('/example', function (req, res, next) {
            res.json({
                message: 'this is example API'
            });
        });
    };
    return ExampleApi;
}(base_1.BaseApi));
exports.ExampleApi = ExampleApi;
//# sourceMappingURL=example.js.map