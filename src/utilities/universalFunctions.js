/**
 * universalFunctions.js
 * 
 */

`use strict`;

const { createHash } = require(`crypto`);

const deleteUnnecessaryUserData = (data) => {
	delete data.password;
	// delete data.accessToken;
	delete data.__v;
	return data;
};

const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			// eslint-disable-next-line no-param-reassign
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

const getObjectId = async (name) => {
	return createHash(`sha256`, `abcdefg`).update(name).digest(`hex`).slice(0, 24);
};

module.exports = {
	deleteUnnecessaryUserData,
	pick,
	getObjectId,
};
