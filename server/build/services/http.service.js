"use strict";
exports.__esModule = true;
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
        return axios["default"].get(queryUrl, {
            headers: headers
        });
    };
    HttpService.prototype.makeQueryString = function (query) {
        return Object.keys(query || {})
            .map(function (key) { return key + "=" + encodeURIComponent(query[key]); })
            .join('&');
    };
    HttpService.prototype.request = function (method, url, data, headers) {
        var config = {
            method: method,
            url: url
        };
        if (data) {
            config.data = JSON.stringify(data);
        }
        if (headers) {
            config.headers = headers;
        }
        return axios["default"](config);
    };
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map