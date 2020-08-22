const puppeteer = require("puppeteer-core");

async function Calendar(page) {
	await page.goto("https://moodle.unicentro.br/calendar/view.php?view=month", {
		waitUntil: "load",
		timeout: 0,
	});

	await page.waitForSelector(".calendarmonth > tbody > tr");

	try {
		const tasks = await page.evaluate(() => {
			let links = document.querySelectorAll(
				"tbody > tr > td > div.d-none > div > ul > li > a"
			);

			return Array.from(links).map((link) => {
				return link.href;
			});
		});

		return tasks;
	} catch (error) {
		console.log("Evaluate error: \n", error);
	}
}

module.exports = Calendar;
