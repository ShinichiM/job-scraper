const puppeteer = require("puppeteer");

const scrapeWebsiteForJobs = async (jobTitle, jobLocation) => {
  // let jobResults = [];
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
    );

    await page.goto("https://www.indeed.com", {
      waitUntil: "networkidle0",
    });

    // html input element selectors by ID and class
    const jobInputSelector = "#text-input-what";
    const locationInputSelector = "#text-input-where";

    // input job title into HTML Input Element
    await page.type(jobInputSelector, jobTitle);

    // remove any pre-filled text in location input element;
    await page.click(locationInputSelector);
    await page.click(locationInputSelector, { clickCount: 3, delay: 100 });
    await page.keyboard.press("Backspace");

    // input location into HTML Input Element
    await page.type(locationInputSelector, jobLocation);

    // press Enter to initiate search
    await page.keyboard.press("Enter");

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Wait for the results page to load and display the results.
    const resultsSelector = ".job_seen_beacon";
    await page.waitForSelector(resultsSelector);

    const searchResults = await page.evaluate((resultsSelector) => {
      const testResultsList = [...document.querySelectorAll(resultsSelector)];

      return testResultsList.map((jobData) => {
        const jobTitle = jobData.querySelector("span").textContent;
        const jobCompany = jobData.querySelector(".companyName").textContent;
        const jobLocation =
          jobData.querySelector(".companyLocation").textContent;
        const jobSnippet = jobData.querySelector(
          ".job-snippet > ul > li"
        ).textContent;
        let experience = false;
        if (jobTitle.includes("Senior")) {
          experience = true;
        }
        if (jobSnippet.includes("experience")) {
          experience = true;
        }
        return {
          title: jobTitle,
          company: jobCompany,
          location: jobLocation,
          experience: experience,
        };
      });
    }, resultsSelector);

    return searchResults;
  } catch (error) {
    console.log(error, " 00 - Error Log");
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeWebsiteForJobs;
