/**
 * login.js
 * Vishal Kumar
 */

"use strict";

const { Router } = require(`express`);
const router = new Router();

const { Logs: { postLog, postLogToFile } }  = require('../../controllers');
const { Response: { sendResponse } } = require('../../utilities');

router.post(`/log`,  async (req, res, next) => {
	try {
		const data = await postLogToFile(req.body);
		sendResponse(req, res, 201, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
