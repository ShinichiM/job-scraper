const puppeteer = require("puppeteer");
import { Browser, Page } from "puppeteer";
import { jobData, scrapeProps } from "./interface";

const PROXY_USERNAME = process.env.PROXY_USERNAME;
const PROXY_PASSWORD = process.env.PROXY_PASSWORD;
const PROXY_SERVER_PORT = process.env.PROXY_SERVER_PORT;

const getDescriptions = async (jobLink: string, browser): Promise<string> => {
  const url = `https://indeed.com/${jobLink.split("&")[0]}`;

  const page = await browser.newPage();
  // await page.authenticate({
  //   username: PROXY_USERNAME,
  //   password: PROXY_PASSWORD,
  // });

  try {
    await page.goto(url, {
      waitUntil: "load",
      timeout: 180000,
    });
    const pageSource = await page.content();
    const re: RegExp = /window._initialData=(\{.+?\});/;
    const source = pageSource
      ?.match(re)?.[0]
      .replace("window._initialData=", "")
      .replace(/;/g, "");
    const parseSource = source ? JSON.parse(source) : "N/A";
    if (parseSource === "N/A") {
      console.error("Unable to parse page source");
      return "Unable to parse page source";
    }
    const data =
      parseSource["jobInfoWrapperModel"]["jobInfoModel"][
        "sanitizedJobDescription"
      ];
    return data;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    await browser.close();
  }
};

const scrapeIndeed = async (
  title: scrapeProps,
  location: scrapeProps
): Promise<[]> => {
  const browser = await puppeteer.launch({
    ignoreHttpsErrors: true,
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
    const url: string = `https://www.indeed.com/jobs?q=${title}&l=${location}`;
    await page.goto(url, {
      waitUntil: "load",
      timeout: 180000,
    });
    const pageSource = await page.content({
      waitUntil: "domcontentloaded",
    });
    const re: RegExp =
      /window.mosaic.providerData\["mosaic-provider-jobcards"\]=(\{.+?\});/;

    const sourceToJson: JSON = JSON.parse(
      pageSource
        .match(re)[0]
        .replace('window.mosaic.providerData["mosaic-provider-jobcards"]=', "")
        .replaceAll(";", "")
    );

    const results =
      sourceToJson["metaData"]["mosaicProviderJobCardsModel"]["results"];

    const data = results.map((job: jobData) => {
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
        description: "",
      };
    });
    // data.forEach((job) => {
    //   job.description = getDescriptions(job.linkToJob, browser);
    // });

    return data;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    await browser.close();
  }
};

module.exports = scrapeIndeed;
