"use strict";

const requestProxy = require('request-promise-native');
const urlParse = require('url-parse');

module.exports = class HttpClient {
    async request(uri, method, headers = null, content = null) {
        let options = {
            method: method,
            headers: headers,
            rejectUnauthorized: false
        };

        if (content) {
            options.body = content;
        }

        return await requestProxy(uri, options);
    }
}