const puppeteer = require("puppeteer-core");
const edgePaths = require("edge-paths");
const fs = require("fs");

const config = require("../assets/config.json");
const cookies = require("../assets/cookies.json");

// const EDGE_PATH = edgePaths.getEdgePath();

async function startBrowser() {
  const browser = await puppeteer.launch({
    executablePath: edgePaths.getEdgePath(),
  });

  const page = await browser.newPage();

  return { browser, page };
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url, page) {
  
  if (Object.keys(cookies).length) {
    await page.setCookie(...cookies);

    await page.goto(url, { waitUntil: "networkidle2" });

  } else {

    await page.goto("https://moodle.unicentro.br/login/index.php", {
      waitUntil: "networkidle0",
    });

    await page.type("input#username", config.login, { delay: 30 });
    await page.type("input#password", config.password, { delay: 30 });

    await page.click("input#loginbtn");

    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitFor(30000);

    let currentCookies = await page.cookies();

    fs.writeFileSync("./assets/cookies.json", JSON.stringify(currentCookies));

  }
}

module.exports = {playTest, startBrowser, closeBrowser}