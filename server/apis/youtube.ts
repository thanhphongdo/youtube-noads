import * as express from 'express';
import * as cheerio from 'cheerio';
import { BaseApi } from './base';

const apiKey = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
const clientName = '2';
const clientVersion = '2.20201216.02.00';
const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
// const userAgent = 'postman';

export class YoutubeApi extends BaseApi {
    constructor(router: express.Router) {
        super(router);
        this.getYoutubeVideo();
        this.getHomePageData();
        this.getHomePageDataNext();
        this.getSearchFirst();
        this.getSearchNext();
        this.getSearchInfo();
    }

    getYoutubeVideo() {
        this.router.get('/youtube/link/:videoId', (req, res, next) => {
            const videoId = req.params.videoId;
            this.httpService.get<any>('https://m.youtube.com/watch', {
                v: videoId
            }).then(response => {
                res.json({
                    data: this.getVideoInfo(response.data)?.streamingData?.adaptiveFormats
                });
            }).catch(err => {
                res.status(400).json({
                    error: err
                });
            });
        });
    }

    getHomePageData() {
        this.router.get('/youtube/home', (req, res, next) => {
            const videoId = req.params.videoId;
            this.httpService.get<any>('https://m.youtube.com').then(response => {
                const $ = cheerio.load(response.data);
                var ytInitialData: any;
                $('body').find('script').each((index, item) => {
                    if ($(item).html().indexOf('var ytInitialData =') == 0) {
                        eval(`ytInitialData = ${$(item).html().substring(3)}`);
                    }
                });
                console.log(ytInitialData);
                const contents = ytInitialData?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.richGridRenderer?.contents;
                res.json({
                    data: {
                        videos: contents.map((item: any) => {
                            return item?.richItemRenderer?.content?.videoRenderer
                        }).filter((item: any) => item),
                        token: contents[contents.length - 1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token,
                        visitorData: ytInitialData?.responseContext?.webResponseContextExtensionData?.ytConfigData?.visitorData
                    }
                });
            }).catch(err => {
                res.status(400).json({
                    error: err
                });
            });
        });
    }

    getHomePageDataNext() {
        this.router.get('/youtube/home/next', (req, res, next) => {
            const token = req.query.token;
            const visitorData = req.query.visitorData;
            this.httpService.request<any>('POST', 'https://m.youtube.com/youtubei/v1/browse?key=' + apiKey, {
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
            }).then(response => {
                const videos = response?.data?.onResponseReceivedActions[0]?.appendContinuationItemsAction?.continuationItems;
                res.json({
                    data: {
                        videos: videos.map((item: any) => item?.richItemRenderer?.content?.videoWithContextRenderer).filter((item: any) => item),
                        visitorData: response?.data?.responseContext?.visitorData,
                        token: videos[videos.length - 1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token
                    }
                });
            }).catch(err => {
                res.status(400).json({
                    error: err
                });
            });
        });
    }

    getSearchFirst() {
        this.router.get('/youtube/search/first/:searchQuery', (req, res, next) => {
            const searchQuery = req.params.searchQuery;
            this.httpService.request<any>('GET', 'https://m.youtube.com/results?pbj=1&search_query=' + searchQuery, null, {
                'user-agent': userAgent,
                'x-youtube-client-name': clientName,
                'x-youtube-client-version': clientVersion
            }).then(response => {
                const contents: any = response?.data?.response?.contents?.sectionListRenderer?.contents;
                res.json({
                    data: {
                        videos: contents[contents.length - 2]?.itemSectionRenderer?.contents.map((item: any) => item.compactVideoRenderer),
                        token: contents[contents.length - 1].continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token
                    }
                });
            }).catch(err => {
                res.status(400).json({
                    error: err
                });
            });
        });
    }

    getSearchNext() {
        this.router.get('/youtube/search/next', (req, res, next) => {
            const token = req.query.token
            this.httpService.request<any>('POST', 'https://m.youtube.com/youtubei/v1/search?key=' + apiKey, {
                "context": {
                    "client": {
                        "clientName": "MWEB",
                        "clientVersion": clientVersion
                    }
                },
                "continuation": token
            }, {
                'content-type': 'application/json'
            }).then(response => {
                res.json({
                    data: {
                        videos: response?.data?.onResponseReceivedCommands[0]?.appendContinuationItemsAction.continuationItems[0]?.itemSectionRenderer?.contents.map((item: any) => item.compactVideoRenderer),
                        token: response?.data?.onResponseReceivedCommands[0]?.appendContinuationItemsAction.continuationItems[1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token
                    }
                });
            }).catch(err => {
                res.status(400).json({
                    error: err
                });
            });
        });
    }

    getSearchInfo() {
        this.router.get('/youtube/search/:searchQuery', (req, res, next) => {
            const searchQuery = req.params.searchQuery;
            this.httpService.get<any>('https://m.youtube.com/results?search_query=' + searchQuery).then(response => {
                res.json({
                    data: this.getSearchData(response.data)
                });
            }).catch(err => {
                res.status(400).json({
                    error: err
                });
            });
        });
    }

    getVideoInfo(body: string) {
        var ytInitialPlayerResponse: any;
        const $ = cheerio.load(body);
        $('body').find('script').each((index, item) => {
            if ($(item).html().indexOf('var ytInitialPlayerResponse =') == 0) {
                eval(`ytInitialPlayerResponse = ${$(item).html().substring(3)}`);
            }
        });
        return ytInitialPlayerResponse;
    }

    getSearchData(body: string) {
        const $ = cheerio.load(body);
        let tokenKeyName = 'var ytInitialData = {';
        let token: string;
        $('body').find('script').each((index, item) => {
            if ($(item).html().indexOf(tokenKeyName) >= 0) {
                var ytInitialData: any;
                eval(`ytInitialData = ${$(item).html().substring(3)}`);
                token = ytInitialData?.contents?.twoColumnSearchResultsRenderer?.primaryContents.sectionListRenderer?.contents[1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
            }
        });
        return {
            apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
            token: token
        }
    }
}