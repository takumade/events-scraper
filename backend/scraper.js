// scraper.js

import sites from "./sites.js";

import scrapeAllevents from "./scrappers/allevents.js";
import scrapeEventbrite from "./scrappers/eventbrite.js";

export const scrapeEvents = async (browser, retryCount) => {
  try {
    let allEvents = [];

    const page = await browser.newPage();

    for (const site of sites) {
      if (site.startsWith("https://www.eventbrite.com")) {
        let result = await scrapeEventbrite(page, retryCount);
        allEvents = allEvents.concat(result);
      } else if (site.startsWith("https://allevents.in")) {
        let result = await scrapeAllevents(page, retryCount);
        allEvents = allEvents.concat(result);
      } else {
        throw new Error(`Unsupported site: ${site}`);
      }

      console.log("All events: ", allEvents);
    }

    

    return allEvents;
  } catch (error) {
    console.log(error);
  }
};
