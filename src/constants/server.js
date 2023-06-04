/**
 * server.js
 * 
 */

`use strict`;

require(`dotenv`).config();

const {
	NODE_ENV,
	NODE_PORT,
} = process.env;

module.exports = {
	NODE_ENV: NODE_ENV || `development`,
	PORT: NODE_PORT || 8000,
};
