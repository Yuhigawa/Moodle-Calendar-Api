const Calendar = require("./controller/calendar");
const getDateTime = require("./controller/getDateTime");
const { Login, startBrowser, closeBrowser } = require("./controller/login");

(async () => {
	const { browser, page } = await startBrowser();
	let url = "https://moodle.unicentro.br/";
	let links;

	try {
		await Login(page, url);
	} catch (error) {
		console.log("Login Error: \n" + error);
	}

	try {
		links = await Calendar(page);
	} catch (error) {
		console.log("Calendar Error: \n" + error);
	}

	try {
		let deliveryDate = await getDateTime(page, links);

		console.log(deliveryDate);
	} catch (error) {
		console.log("deliveryDate error: \n" + error);
	}

	await closeBrowser(browser);

	process.exit(1);
})();
