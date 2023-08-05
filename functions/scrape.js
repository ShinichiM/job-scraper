"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var PROXY_USERNAME = process.env.PROXY_USERNAME;
var PROXY_PASSWORD = process.env.PROXY_PASSWORD;
var PROXY_SERVER_PORT = process.env.PROXY_SERVER_PORT;
var getDescriptions = function (jobLink, browser) { return __awaiter(void 0, void 0, void 0, function () {
    var url, page, pageSource, re, source, parseSource, data, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://indeed.com/".concat(jobLink.split("&")[0]);
                return [4 /*yield*/, browser.newPage()];
            case 1:
                page = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, 6, 8]);
                return [4 /*yield*/, page.goto(url, {
                        waitUntil: "load",
                        timeout: 180000
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, page.content()];
            case 4:
                pageSource = _b.sent();
                re = /window._initialData=(\{.+?\});/;
                source = (_a = pageSource === null || pageSource === void 0 ? void 0 : pageSource.match(re)) === null || _a === void 0 ? void 0 : _a[0].replace("window._initialData=", "").replace(/;/g, "");
                parseSource = source ? JSON.parse(source) : "N/A";
                if (parseSource === "N/A") {
                    console.error("Unable to parse page source");
                    return [2 /*return*/, "Unable to parse page source"];
                }
                data = parseSource["jobInfoWrapperModel"]["jobInfoModel"]["sanitizedJobDescription"];
                return [2 /*return*/, data];
            case 5:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, error_1];
            case 6: return [4 /*yield*/, browser.close()];
            case 7:
                _b.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var scrapeIndeed = function (title, location) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, url, pageSource, re, sourceToJson, results, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({
                    ignoreHttpsErrors: true,
                    headless: false,
                    args: [
                        "--proxy-server=http://".concat(PROXY_USERNAME, ".render=true:").concat(PROXY_SERVER_PORT),
                    ]
                })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.authenticate({
                        username: PROXY_USERNAME,
                        password: PROXY_PASSWORD
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 8, 9, 11]);
                return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36")];
            case 5:
                _a.sent();
                url = "https://www.indeed.com/jobs?q=".concat(title, "&l=").concat(location);
                return [4 /*yield*/, page.goto(url, {
                        waitUntil: "load",
                        timeout: 180000
                    })];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.content({
                        waitUntil: "domcontentloaded"
                    })];
            case 7:
                pageSource = _a.sent();
                re = /window.mosaic.providerData\["mosaic-provider-jobcards"\]=(\{.+?\});/;
                sourceToJson = JSON.parse(pageSource
                    .match(re)[0]
                    .replace('window.mosaic.providerData["mosaic-provider-jobcards"]=', "")
                    .replaceAll(";", ""));
                results = sourceToJson["metaData"]["mosaicProviderJobCardsModel"]["results"];
                data = results.map(function (job) {
                    var _a, _b, _c, _d, _e, _f;
                    return {
                        company: job.company,
                        title: job.normTitle,
                        displayTitle: job.displayTitle,
                        salary: {
                            max: ((_a = job.extractedSalary) === null || _a === void 0 ? void 0 : _a.max) ? (_b = job.extractedSalary) === null || _b === void 0 ? void 0 : _b.max : "N/A",
                            min: ((_c = job.extractedSalary) === null || _c === void 0 ? void 0 : _c.min) ? (_d = job.extractedSalary) === null || _d === void 0 ? void 0 : _d.min : "N/A",
                            type: ((_e = job.extractedSalary) === null || _e === void 0 ? void 0 : _e.type) ? (_f = job.extractedSalary) === null || _f === void 0 ? void 0 : _f.type : "N/A"
                        },
                        salarySnippet: (job === null || job === void 0 ? void 0 : job.salarySnippet) ? job === null || job === void 0 ? void 0 : job.salarySnippet : "N/A",
                        location: job.formattedLocation,
                        jobkey: job.jobkey,
                        remote: job.remoteLocation,
                        rating: job.companyRating,
                        numReviews: job.companyReviewCount,
                        linkToJob: job.viewJobLink,
                        description: ""
                    };
                });
                // data.forEach((job) => {
                //   job.description = getDescriptions(job.linkToJob, browser);
                // });
                return [2 /*return*/, data];
            case 8:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, error_2];
            case 9: return [4 /*yield*/, browser.close()];
            case 10:
                _a.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
module.exports = scrapeIndeed;
