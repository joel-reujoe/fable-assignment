/**
 * db.js
 * 
 */

`use strict`;

require(`dotenv`).config();

module.exports = {
	DB_URI: process.env.DB_URI,
	USERNAME: process.env.USERNAME,
	PASSWORD: process.env.PASSWORD,
	DATABASE: process.env.DATABASE,
	PORT: process.env.PORT,
};
