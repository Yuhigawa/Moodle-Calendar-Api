const puppeteer = require("puppeteer-core");

async function Calendar(page) {
  await page.goto(
    "https://moodle.unicentro.br/calendar/view.php?view=month",
    {
      waitUntil: "load",
      timeout: 0,
    }
  );

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


// function dale () {
//     Promise.race([

//     ])
// }

/*
    let weeks = document.querySelectorAll(".calendarmonth > tbody > tr");
    let results = { Semanas: [] };
    console.log("entro na funcao");

    weeks.forEach((index) => {
      let days = index.querySelectorAll("td.day > div.d-none > div > ul");
      let weeklyResults = [];

      let iterator = 0;
      days.forEach((element) => {
        results.Semanas.push({
          attr: element.querySelector("li > a").getAttribute("href"),
          len: days.length,
          it: iterator + 1,
        });

        iterator++;
      });

      //   results.Semanas.push({
      //     tamanho: weeklyResults.length,
      //     drele: [weeklyResults[0], weeklyResults[1], weeklyResults[2]],
      //   });
    });
    
    */
