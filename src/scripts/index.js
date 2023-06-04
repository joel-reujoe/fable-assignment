/**
 * scripts/index.js
 * 
 */

`use strict`;

const fs = require(`fs`);
const path = require(`path`);

const basename = path.basename(__filename);
const functions = [];

fs
	.readdirSync(__dirname)
	.filter(file => (file.indexOf(`.`) !== 0) && (file !== basename) && (file.slice(-3) === `.js`))
	.map((file) => { functions.push({ key: file.split(`-`)[0], fun: require(path.join(__dirname, file)) }); })
	.sort((a, b) => a.key < b.key);

const init = async () => {
	for (let i = 0; i < functions.length; i++) {
		await functions[i].fun();
	}
};

module.exports = {
	init,
};