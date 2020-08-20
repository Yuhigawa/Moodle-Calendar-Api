const puppeteer = require("puppeteer-core");

async function getDateTime(page, links) {
	try {
		let toDo = { Tasks: [] };

		for (link of links) {
			await page.goto(link, { waitUntil: "load" });

			toDo.Tasks.push({
				Link: link,
				Course: await page.evaluate(() => {
					return document
						.querySelector(".page-header-headings > h1")
						.textContent.split(" (")[0];
				}),
				deliveryDate: await page.evaluate(() => {
					for (let index in document.querySelectorAll("tr > td.cell.c0")) {
						if (
							document.querySelectorAll("tr > td.cell.c0")[index]
								.textContent === "Data de entrega"
						) {
							return document.querySelectorAll("tr > td.cell.c1")[index]
								.textContent;
						}
					}
				}),
			});
		}

		return toDo;
	} catch (err) {
		console.log("error nor linke: \n" + err);
	}
}

module.exports = getDateTime;
