const functions = require("firebase-functions");
const scrapeWebsiteForJobs = require("./pptr");

exports.scrape = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "512MB" || "2GB",
  })
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    const jobTitle = req.query.title;
    const jobLocation = req.query.location;
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