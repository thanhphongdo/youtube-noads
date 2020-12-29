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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeApi = void 0;
var cheerio = require("cheerio");
var base_1 = require("./base");
var YoutubeApi = /** @class */ (function (_super) {
    __extends(YoutubeApi, _super);
    function YoutubeApi(router) {
        var _this = _super.call(this, router) || this;
        _this.getYoutubeVideo();
        _this.getSearchInfo();
        return _this;
    }
    YoutubeApi.prototype.getYoutubeVideo = function () {
        var _this = this;
        this.router.get('/youtube/link/:videoId', function (req, res, next) {
            var videoId = req.params.videoId;
            _this.httpService.get('https://m.youtube.com/watch', {
                v: videoId
            }).then(function (response) {
                var _a, _b;
                res.json({
                    data: (_b = (_a = _this.getVideoInfo(response.data)) === null || _a === void 0 ? void 0 : _a.streamingData) === null || _b === void 0 ? void 0 : _b.adaptiveFormats
                });
            }).catch(function (err) {
                res.status(400).json({
                    error: err
                });
            });
        });
    };
    YoutubeApi.prototype.getSearchInfo = function () {
        var _this = this;
        this.router.get('/youtube/search/:searchQuery', function (req, res, next) {
            var searchQuery = req.params.searchQuery;
            _this.httpService.get('https://m.youtube.com/results?search_query=' + searchQuery).then(function (response) {
                _this.getSearchData(response.data);
                res.json({
                    data: null
                });
            }).catch(function (err) {
                res.status(400).json({
                    error: err
                });
            });
        });
    };
    YoutubeApi.prototype.getVideoInfo = function (body) {
        var ytInitialPlayerResponse;
        var $ = cheerio.load(body);
        $('body').find('script').each(function (index, item) {
            if ($(item).html().indexOf('var ytInitialPlayerResponse =') == 0) {
                eval("ytInitialPlayerResponse = " + $(item).html().substring(3));
            }
        });
        return ytInitialPlayerResponse;
    };
    YoutubeApi.prototype.getSearchData = function (body) {
        var $ = cheerio.load(body);
        var apiKeyName = 'tube';
        var tokenKeyName = 'var ytInitialData = {';
        var apiKey;
        var token;
        $('body').find('script').each(function (index, item) {
            var _a, _b, _c, _d, _e, _f, _g;
            if ($(item).html().indexOf(apiKeyName) >= 0) {
                var firstKeyIndex = $(item).html().indexOf(apiKeyName) + apiKeyName.length + 3;
                var lastKeyIndex = firstKeyIndex = 39;
                apiKey = $(item).html().substr(firstKeyIndex, 40);
                console.log(apiKey);
            }
            if ($(item).html().indexOf(tokenKeyName) >= 0) {
                var ytInitialData;
                eval("ytInitialData = " + $(item).html().substring(3));
                token = (_g = (_f = (_e = (_d = (_c = (_b = (_a = ytInitialData === null || ytInitialData === void 0 ? void 0 : ytInitialData.contents) === null || _a === void 0 ? void 0 : _a.twoColumnSearchResultsRenderer) === null || _b === void 0 ? void 0 : _b.primaryContents.sectionListRenderer) === null || _c === void 0 ? void 0 : _c.contents[1]) === null || _d === void 0 ? void 0 : _d.continuationItemRenderer) === null || _e === void 0 ? void 0 : _e.continuationEndpoint) === null || _f === void 0 ? void 0 : _f.continuationCommand) === null || _g === void 0 ? void 0 : _g.token;
            }
        });
    };
    return YoutubeApi;
}(base_1.BaseApi));
exports.YoutubeApi = YoutubeApi;
//# sourceMappingURL=youtube.js.map