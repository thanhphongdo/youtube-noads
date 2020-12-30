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
var apiKey = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
var clientName = '2';
var clientVersion = '2.20201216.02.00';
var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
// const userAgent = 'postman';
var YoutubeApi = /** @class */ (function (_super) {
    __extends(YoutubeApi, _super);
    function YoutubeApi(router) {
        var _this = _super.call(this, router) || this;
        _this.getYoutubeVideo();
        _this.getHomePageData();
        _this.getHomePageDataNext();
        _this.getSearchFirst();
        _this.getSearchNext();
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
    YoutubeApi.prototype.getHomePageData = function () {
        var _this = this;
        this.router.get('/youtube/home', function (req, res, next) {
            var videoId = req.params.videoId;
            _this.httpService.get('https://m.youtube.com').then(function (response) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                var $ = cheerio.load(response.data);
                var ytInitialData;
                $('body').find('script').each(function (index, item) {
                    if ($(item).html().indexOf('var ytInitialData =') == 0) {
                        eval("ytInitialData = " + $(item).html().substring(3));
                    }
                });
                console.log(ytInitialData);
                var contents = (_f = (_e = (_d = (_c = (_b = (_a = ytInitialData === null || ytInitialData === void 0 ? void 0 : ytInitialData.contents) === null || _a === void 0 ? void 0 : _a.twoColumnBrowseResultsRenderer) === null || _b === void 0 ? void 0 : _b.tabs[0]) === null || _c === void 0 ? void 0 : _c.tabRenderer) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.richGridRenderer) === null || _f === void 0 ? void 0 : _f.contents;
                res.json({
                    data: {
                        videos: contents.map(function (item) {
                            var _a, _b;
                            return (_b = (_a = item === null || item === void 0 ? void 0 : item.richItemRenderer) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.videoRenderer;
                        }).filter(function (item) { return item; }),
                        token: (_k = (_j = (_h = (_g = contents[contents.length - 1]) === null || _g === void 0 ? void 0 : _g.continuationItemRenderer) === null || _h === void 0 ? void 0 : _h.continuationEndpoint) === null || _j === void 0 ? void 0 : _j.continuationCommand) === null || _k === void 0 ? void 0 : _k.token,
                        visitorData: (_o = (_m = (_l = ytInitialData === null || ytInitialData === void 0 ? void 0 : ytInitialData.responseContext) === null || _l === void 0 ? void 0 : _l.webResponseContextExtensionData) === null || _m === void 0 ? void 0 : _m.ytConfigData) === null || _o === void 0 ? void 0 : _o.visitorData
                    }
                });
            }).catch(function (err) {
                res.status(400).json({
                    error: err
                });
            });
        });
    };
    YoutubeApi.prototype.getHomePageDataNext = function () {
        var _this = this;
        this.router.get('/youtube/home/next', function (req, res, next) {
            var token = req.query.token;
            var visitorData = req.query.visitorData;
            _this.httpService.request('POST', 'https://m.youtube.com/youtubei/v1/browse?key=' + apiKey, {
                "context": {
                    "client": {
                        "clientName": "MWEB",
                        "clientVersion": clientVersion
                    }
                },
                "continuation": token
            }, {
                'content-type': 'application/json',
                'x-goog-visitor-id': visitorData
            }).then(function (response) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                var videos = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.onResponseReceivedActions[0]) === null || _b === void 0 ? void 0 : _b.appendContinuationItemsAction) === null || _c === void 0 ? void 0 : _c.continuationItems;
                res.json({
                    data: {
                        videos: videos.map(function (item) { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.richItemRenderer) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.videoWithContextRenderer; }).filter(function (item) { return item; }),
                        visitorData: (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.responseContext) === null || _e === void 0 ? void 0 : _e.visitorData,
                        token: (_j = (_h = (_g = (_f = videos[videos.length - 1]) === null || _f === void 0 ? void 0 : _f.continuationItemRenderer) === null || _g === void 0 ? void 0 : _g.continuationEndpoint) === null || _h === void 0 ? void 0 : _h.continuationCommand) === null || _j === void 0 ? void 0 : _j.token
                    }
                });
            }).catch(function (err) {
                res.status(400).json({
                    error: err
                });
            });
        });
    };
    YoutubeApi.prototype.getSearchFirst = function () {
        var _this = this;
        this.router.get('/youtube/search/first/:searchQuery', function (req, res, next) {
            var searchQuery = req.params.searchQuery;
            _this.httpService.request('GET', 'https://m.youtube.com/results?pbj=1&search_query=' + searchQuery, null, {
                'user-agent': userAgent,
                'x-youtube-client-name': clientName,
                'x-youtube-client-version': clientVersion
            }).then(function (response) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                var contents = (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.contents) === null || _c === void 0 ? void 0 : _c.sectionListRenderer) === null || _d === void 0 ? void 0 : _d.contents;
                res.json({
                    data: {
                        videos: (_f = (_e = contents[contents.length - 2]) === null || _e === void 0 ? void 0 : _e.itemSectionRenderer) === null || _f === void 0 ? void 0 : _f.contents.map(function (item) { return item.compactVideoRenderer; }),
                        token: (_j = (_h = (_g = contents[contents.length - 1].continuationItemRenderer) === null || _g === void 0 ? void 0 : _g.continuationEndpoint) === null || _h === void 0 ? void 0 : _h.continuationCommand) === null || _j === void 0 ? void 0 : _j.token
                    }
                });
            }).catch(function (err) {
                res.status(400).json({
                    error: err
                });
            });
        });
    };
    YoutubeApi.prototype.getSearchNext = function () {
        var _this = this;
        this.router.get('/youtube/search/next', function (req, res, next) {
            var token = req.query.token;
            _this.httpService.request('POST', 'https://m.youtube.com/youtubei/v1/search?key=' + apiKey, {
                "context": {
                    "client": {
                        "clientName": "MWEB",
                        "clientVersion": clientVersion
                    }
                },
                "continuation": token
            }, {
                'content-type': 'application/json'
            }).then(function (response) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                res.json({
                    data: {
                        videos: (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.onResponseReceivedCommands[0]) === null || _b === void 0 ? void 0 : _b.appendContinuationItemsAction.continuationItems[0]) === null || _c === void 0 ? void 0 : _c.itemSectionRenderer) === null || _d === void 0 ? void 0 : _d.contents.map(function (item) { return item.compactVideoRenderer; }),
                        token: (_k = (_j = (_h = (_g = (_f = (_e = response === null || response === void 0 ? void 0 : response.data) === null || _e === void 0 ? void 0 : _e.onResponseReceivedCommands[0]) === null || _f === void 0 ? void 0 : _f.appendContinuationItemsAction.continuationItems[1]) === null || _g === void 0 ? void 0 : _g.continuationItemRenderer) === null || _h === void 0 ? void 0 : _h.continuationEndpoint) === null || _j === void 0 ? void 0 : _j.continuationCommand) === null || _k === void 0 ? void 0 : _k.token
                    }
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
                res.json({
                    data: _this.getSearchData(response.data)
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
        var tokenKeyName = 'var ytInitialData = {';
        var token;
        $('body').find('script').each(function (index, item) {
            var _a, _b, _c, _d, _e, _f, _g;
            if ($(item).html().indexOf(tokenKeyName) >= 0) {
                var ytInitialData;
                eval("ytInitialData = " + $(item).html().substring(3));
                token = (_g = (_f = (_e = (_d = (_c = (_b = (_a = ytInitialData === null || ytInitialData === void 0 ? void 0 : ytInitialData.contents) === null || _a === void 0 ? void 0 : _a.twoColumnSearchResultsRenderer) === null || _b === void 0 ? void 0 : _b.primaryContents.sectionListRenderer) === null || _c === void 0 ? void 0 : _c.contents[1]) === null || _d === void 0 ? void 0 : _d.continuationItemRenderer) === null || _e === void 0 ? void 0 : _e.continuationEndpoint) === null || _f === void 0 ? void 0 : _f.continuationCommand) === null || _g === void 0 ? void 0 : _g.token;
            }
        });
        return {
            apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
            token: token
        };
    };
    return YoutubeApi;
}(base_1.BaseApi));
exports.YoutubeApi = YoutubeApi;
//# sourceMappingURL=youtube.js.map