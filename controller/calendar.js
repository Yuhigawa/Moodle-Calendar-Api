const puppeteer = require("puppeteer-core");

// function dale () {
//     Promise.race([

//     ])
// }

async function Calendar(page) {
  await page.goto("https://moodle.unicentro.br/calendar/view.php?view=month&time=1593572400", {
    waitUntil: "load",
    timeout: 0
  });

  await page.waitForSelector(".calendarmonth > tbody > tr");

  const tasks = await page.evaluate(() => {
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

    let links = document.querySelectorAll('tbody > tr > td > div.d-none > div > ul > li > a')

    return Array.from(links).map( (link) => { return link.href } );
  });

  console.log(tasks);
}

module.exports = Calendar;
