/**
 * middlewares/index.js
 * 
 */

`use strict`;

const { logRequestStart, logResponseBody } = require(`./req-res-interceptor`);

module.exports = {
	logRequestStart,
	logResponseBody,
};
