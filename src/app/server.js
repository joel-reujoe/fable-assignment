/**
 * server.js
 * 
 */

`use strict`;

const express = require(`express`);
const cors = require(`cors`);
const cron = require(`node-cron`);


const {
	server: { PORT, SENTRY_DSN },
} = require(`../constants`);

const {
	Response: { sendResponse },
} = require(`../utilities`);

const {
	errors: { NotFoundError, ValidationError },
	middlewares: {
		logRequestStart,
		logResponseBody,
	},
} = require(`../config`);

const { 
 Logs: { postLog }
} = require('../controllers');

const init = () => {
	const app = express();
	app.use(express.json());
	app.use(cors());

	// app.use(logRequestStart);
	// app.use(logResponseBody);

	app.use(`/public`, express.static(`public`));
	app.get(`/`, async(req, res) => {
		res.status(200).send(`Server up`);
	});
	const { Logs } = require('../routes');
	app.use('/', Logs);

	
	app.use((req, res) => {
		sendResponse(req, res, 404, { message: NOT_FOUND });
	});

	
	// app.use(rollbar.errorHandler());
	if (SENTRY_DSN) {
		const Sentry = initialiseSentry(app);
		app.use(Sentry.Handlers.errorHandler());
	}

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		console.log(`\nerr===>`, err, `---err`);
		if (process.env.NODE_ENV === `development`) console.error(`Server Error===>`, err, `---Server Error`);
		if (err instanceof NotFoundError) return sendResponse(req, res, 404, { error: err.message || err });
		if (err instanceof ValidationError) return sendResponse(req, res, 422, { error: err.message || err });
		sendResponse(req, res, 500, { error: err.stack || err });
	});

	cron.schedule(`* * * * *`, async () => {
		await postLog();
	});
	return app;
};

module.exports = {
	init,
	port: PORT,
};
