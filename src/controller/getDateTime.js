const puppeteer = require("puppeteer-core");

async function getDateTime(page, links) {
	try {
		let toDo = { Tasks: [] };

		for (let link in links) {
			await page.goto(links[link], { waitUntil: "load" });

			toDo.Tasks.push({
				Link: links[link],
				Course: await page.evaluate(() => {
					return document.querySelector(".page-header-headings > h1").textContent.split(" (")[0]
				}),
				deliveryDate: await page.evaluate(() => {
					for (
						let a = 0;
						a < document.querySelectorAll("tr > td.cell.c0").length;
						a++
					) {
						if (
							document.querySelectorAll("tr > td.cell.c0")[a].textContent ===
							"Data de entrega"
						) {
							return document.querySelectorAll("tr > td.cell.c1")[a]
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