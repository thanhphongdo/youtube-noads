"use strict";
exports.__esModule = true;
exports.BaseApi = void 0;
var http_service_1 = require("../services/http.service");
var BaseApi = /** @class */ (function () {
    function BaseApi(router) {
        this.router = router;
        this.httpService = new http_service_1.HttpService();
    }
    return BaseApi;
}());
exports.BaseApi = BaseApi;
//# sourceMappingURL=base.js.map