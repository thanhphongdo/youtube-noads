import * as axios from 'axios';

export class HttpService {
    get<T>(url: string, query?: { [key: string]: any }, headers?: { [key: string]: any }) {
        let queryUrl = url;
        if (query && Object.keys(query).length) {
            const qs = Object.keys(query)
                .map(key => `${key}=${encodeURIComponent(query[key])}`)
                .join('&');
            queryUrl = `${queryUrl}?${qs}`;
        }
        return axios.default.get<T>(queryUrl, {
            headers: headers
        });
    }
}