/**
 * server.js
 * 
 */

`use strict`;

require(`dotenv`).config();

const {
	NODE_ENV,
	PORT,
} = process.env;

module.exports = {
	NODE_ENV: NODE_ENV || `development`,
	PORT: PORT || 8000,
};
