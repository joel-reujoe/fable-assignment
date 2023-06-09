/**
 * config/index.js
 * 
 */

`use strict`;

const errors = require(`./errors`);
const middlewares = require(`./middlewares`);
const db = require(`./db`);

module.exports = {
	errors,
	middlewares,
	db,
};
