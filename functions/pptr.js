const puppeteer = require("puppeteer");

const scrapeWebsiteForJobs = async (jobTitle, jobLocation) => {
  const PROXY_USERNAME = process.env.PROXY_USERNAME;
  const PROXY_PASSWORD = process.env.PROXY_PASSWORD;
  const PROXY_SERVER_PORT = process.env.PROXY_SERVER_PORT;

  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    args: [
      `--proxy-server=http://${PROXY_USERNAME}.render=true:${PROXY_SERVER_PORT}`,
    ],
  });

  const page = await browser.newPage();
  await page.authenticate({
    username: PROXY_USERNAME,
    password: PROXY_PASSWORD,
  });

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
    );
    const url = `https://www.indeed.com/jobs?q=${jobTitle}&l=${jobLocation}`;
    console.log(url);
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, {
      waitUntil: "load",
      timeout: 180000,
    });

    const pageSource = await page.content({ waitUntil: "domcontentloaded" });
    const re =
      /window.mosaic.providerData\["mosaic-provider-jobcards"\]=(\{.+?\});/;

    const jobData = JSON.parse(
      pageSource
        .match(re)[0]
        .replace('window.mosaic.providerData["mosaic-provider-jobcards"]=', "")
        .replaceAll(";", "")
    );
    // console.log(jobData);
    // returns [{ company: "company name", normTitle: "job title", displayTitle: "job title", companyRatin: "rating", companyReviewCount: "number of reviews", extractedSalary: {max: max salary, min: min Salary, type: "yearly/hourly"}, jobkey: "job key for posting", urgentlyHiring: "true/false", newJob: "true/false", formattedLocation: "job location", salarySnippet: {currency: "$$", text: "salary in text form ", title: "job title", viewJobLink: "search parameters" <---> will need to .split("&") since we only need /viewjob?jk=xyz which we replace in the url after indeed.com/ <--> gets us to singular job page and description} }]
    const jobResults =
      jobData["metaData"]["mosaicProviderJobCardsModel"]["results"];

    const data = jobResults.map((job) => {
      return {
        company: job.company,
        title: job.normTitle,
        displayTitle: job.displayTitle,
        salary: {
          max: job.extractedSalary?.max ? job.extractedSalary?.max : "N/A",
          min: job.extractedSalary?.min ? job.extractedSalary?.min : "N/A",
          type: job.extractedSalary?.type ? job.extractedSalary?.type : "N/A",
        },
        salarySnippet: job?.salarySnippet ? job?.salarySnippet : "N/A",
        location: job.formattedLocation,
        jobkey: job.jobkey,
        remote: job.remoteLocation,
        rating: job.companyRating,
        numReviews: job.companyReviewCount,
        linkToJob: job.viewJobLink,
      };
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeWebsiteForJobs;
