"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
var axios = require("axios");
var HttpService = /** @class */ (function () {
    function HttpService() {
    }
    HttpService.prototype.get = function (url, query, headers) {
        var queryUrl = url;
        if (query && Object.keys(query).length) {
            var qs_1 = Object.keys(query)
                .map(function (key) { return key + "=" + encodeURIComponent(query[key]); })
                .join('&');
            queryUrl = queryUrl + "?" + qs_1;
        }
        return axios.default.get(queryUrl, {
            headers: headers
        });
    };
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map