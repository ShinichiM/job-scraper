const functions = require("firebase-functions");
const scrapeWebsiteForJobs = require("./pptr");
const scrapeIndeed = require("./scrape");

exports.scrapeIndeed = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "512MB" || "2GB",
  })
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    const jobTitle = req.query.q.replaceAll(" ", "+");
    const jobLocation = req.query.l.replaceAll(",", "%2C").replaceAll(" ", "+");
    console.log(jobTitle, jobLocation);
    scrapeIndeed(jobTitle, jobLocation)
      .then((jobResults) => {
        console.log(jobResults, " - - Job Results Console Log");
        // res.type("html").send(jobResults);
        res.json(jobResults);
      })
      .catch((error) => {
        console.log("Error Console Log - ", error);
        res.json(error);
      });
  });

exports.scrape = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "512MB" || "2GB",
  })
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    const jobTitle = req.query.q.replaceAll(" ", "+");
    const jobLocation = req.query.l.replaceAll(",", "%2C").replaceAll(" ", "+");
    console.log(jobTitle, jobLocation);
    scrapeWebsiteForJobs(jobTitle, jobLocation)
      .then((jobResults) => {
        console.log(jobResults, " - - Job Results Console Log");
        // res.type("html").send(jobResults);
        res.json(jobResults);
      })
      .catch((error) => {
        console.log("Error Console Log - ", error);
        res.json(error);
      });
  });

exports.scrapingSchedule = functions.pubsub
  .schedule("00 09 * * *")
  .timeZone("America/New_York")
  .onRun(async (context) => {
    scrapeWebsiteForJobs("Software Engineer", "Seattle, Washington")
      .then((jobResults) => {
        console.log(
          "Job Results of the First Page of Indeed.com: ",
          jobResults
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  });
