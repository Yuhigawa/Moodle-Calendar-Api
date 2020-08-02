const Calendar = require("./controller/calendar");
const { playTest, startBrowser, closeBrowser } = require("./controller/login");

(async () => {
  const { browser, page } = await startBrowser();
  let url = "https://moodle.unicentro.br/";

  await playTest(url, page)
    .catch((error) => {
      console.log("Login Error: " + error)
    });

  await Calendar(page)
    .catch((error) => {
      console.log("Calendar Error: " + error)
    });
  await closeBrowser(browser)
  
  process.exit(1);
})();
