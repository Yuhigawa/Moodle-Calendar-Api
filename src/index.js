const Calendar = require("./controller/calendar");
const getDateTime = require("./controller/getDateTime");
const { Login, startBrowser, closeBrowser } = require("./controller/login");
const { startGoogleCalendarApi } = require("./controller/googleCalendarAuth")

const fs = require("fs");

(async () => {
	const { browser, page } = await startBrowser();
	let url = "https://moodle.unicentro.br/";
	let links;

	try {
		await Login(page, url);
	} catch (error) {
		console.error("Login Error: \n" + error);
	}

	try {
		links = await Calendar(page);
	} catch (error) {
		console.error("Calendar Error: \n" + error);
	}

	try {
		let deliveryDate = await getDateTime(page, links);

		fs.writeFileSync(
			"./src/assets/deliveryDate.json",
			JSON.stringify(deliveryDate)
		);
	} catch (error) {
		console.log("deliveryDate error: \n" + error);
	}

	await closeBrowser(browser);

	try {
		startGoogleCalendarApi();
	} catch (error) {
		console.error("googleApi error: \n" + error);
	}

	// process.exit(1);
})();
