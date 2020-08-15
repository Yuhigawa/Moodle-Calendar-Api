const Calendar = require("./controller/calendar");
const getDateTime = require("./controller/getDateTime");
const { playTest, startBrowser, closeBrowser } = require("./controller/login");

(async () => {
	const { browser, page } = await startBrowser();
	let url = "https://moodle.unicentro.br/";
	let links;

	try {
		await playTest(url, page);
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
		console.log("dayDate error: \n" + error);
	}

	// console.log(links)
	// let deliveryDate = await getDateTime(page, links).catch((error) =>
	//     console.log("data time error: \n" + error)
	// );

	// console.log(deliveryDate)

	// await page.waitFor(3000)

	await closeBrowser(browser);

	process.exit(1);
})();
