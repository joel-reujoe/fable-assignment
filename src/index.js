/**
 * index.js
 * 
 */

`use strict`;
global.__basedir = __dirname;
try{
const nodeVersion = parseInt(process.versions.node);
if (nodeVersion < 16) throw `Kindly upgrade Node version to 16 or higher`;

const { dbInit, serverInit, serverPort } = require(`./app`);
const { init: initScript } = require(`./scripts`);

(async () => {
	try {
		const { client } = await dbInit();
		let { host,port } = client;
		console.info(`DB connected to ${host}:${port}`);
		global.client = client;

		await initScript();

		const server = await serverInit();
		server.listen(serverPort, () => {
			console.info(`Server listening at http://localhost:${serverPort}`);
		});
	} catch (error) {
		console.error(`Fatal Error:::***>`, (error), `---Fatal Error`);
	}
})();

process.on(`unhandledRejection`, (err) => {
	console.error(`unhandledRejection===>`, err);
	process.exit(0);
});

}catch(e){
	console.log(e);
}