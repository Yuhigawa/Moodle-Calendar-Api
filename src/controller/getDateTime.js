const puppeteer = require("puppeteer-core");

async function getDateTime(page, links) {
	try {
		let toDo = { Tasks: [] };

		for (link of links) {
			await page.goto(link, { waitUntil: "load" });

			let aux = await page.evaluate(() => {
				for (let index in document.querySelectorAll("tr > td.cell.c0")) {
					if (
						document.querySelectorAll("tr > td.cell.c0")[index].textContent ===
						"Data de entrega"
					) {
						return document.querySelectorAll("tr > td.cell.c1")[index]
							.textContent;
					}
				}
			});

			let Course = await page.evaluate(() => {
				return document
					.querySelector(".page-header-headings > h1")
					.textContent.split(" (")[0];
			});

			let endTime = `${aux.split(", ")[1].split(" ")[2]}-08-${
				aux.split(", ")[1].split(" ")[0]
			}T${aux.split(", ")[2]}:00-03:00`;

			let startTime = `${aux.split(", ")[1].split(" ")[2]}-08-${
				aux.split(", ")[1].split(" ")[0]
			}T10:00:00-03:00`;

			toDo.Tasks.push({
				Link: link,
				Course: Course,
				startTime: startTime,
				endTime: endTime,
				// deliveryDate: aux
			});
		}

		return toDo;
	} catch (err) {
		console.log("error nor linke: \n" + err);
	}
}

module.exports = getDateTime;
