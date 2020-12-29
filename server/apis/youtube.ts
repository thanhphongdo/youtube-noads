import * as express from 'express';
import * as cheerio from 'cheerio';
import { BaseApi } from './base';

export class YoutubeApi extends BaseApi {
    constructor(router: express.Router) {
        super(router);
        this.getYoutubeVideo();
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

    getSearchInfo() {
        this.router.get('/youtube/search/:searchQuery', (req, res, next) => {
            const searchQuery = req.params.searchQuery;
            this.httpService.get<any>('https://m.youtube.com/results?search_query=' + searchQuery).then(response => {
                this.getSearchData(response.data);
                res.json({
                    data: null
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
        let apiKeyName = 'tube';
        let tokenKeyName = 'var ytInitialData = {';
        let apiKey: string;
        let token: string;
        $('body').find('script').each((index, item) => {
            if ($(item).html().indexOf(apiKeyName) >= 0) {
                let firstKeyIndex = $(item).html().indexOf(apiKeyName) + apiKeyName.length + 3;
                let lastKeyIndex = firstKeyIndex = 39;
                apiKey = $(item).html().substr(firstKeyIndex, 40);
                console.log(apiKey);
            }
            if ($(item).html().indexOf(tokenKeyName) >= 0) {
                var ytInitialData: any;
                eval(`ytInitialData = ${$(item).html().substring(3)}`);
                token = ytInitialData?.contents?.twoColumnSearchResultsRenderer?.primaryContents.sectionListRenderer?.contents[1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
            }
        });
    }
}