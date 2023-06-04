/**
 * db.js
 * 
 */

`use strict`;

const { Client } = require('pg');
const { db: { PASSWORD, PORT, USERNAME, DB_URI, DATABASE }  } = require('../constants');

const init = async () => {
	const client = new Client({
		user: USERNAME,
		host: DB_URI,
		database: DATABASE,
		password: PASSWORD,
		port: PORT
	  })
	  client.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	  });

	  return { client };
};

module.exports = {
	init,
};
