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

    makeQueryString(query?: { [key: string]: any }) {
        return Object.keys(query || {})
            .map(key => `${key}=${encodeURIComponent(query[key])}`)
            .join('&');
    }

    request<T>(method: axios.Method, url: string, data?: { [key: string]: any }, headers?: { [key: string]: any }) {
        var config: axios.AxiosRequestConfig = {
            method: method,
            url: url
        }
        if (data) {
            config.data = JSON.stringify(data);
        }
        if (headers) {
            config.headers = headers;
        }
        return axios.default(config);
    }
}