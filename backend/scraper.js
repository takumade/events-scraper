// scraper.js

import sites from "./sites.js";

import scrapeAllevents from "./scrappers/allevents.js";
import scrapeEventbrite from "./scrappers/eventbrite.js";

export const scrapeEvents = async (context, retryCount) => {
  try {
    let allEvents = [];

    for (const site of sites) {
      if (site.startsWith("https://www.eventbrite.com")) {
        let result = await scrapeEventbrite(context, retryCount);
        allEvents = allEvents.concat(result);
      } else if (site.startsWith("https://allevents.in")) {
        let result = await scrapeAllevents(context, retryCount);
        allEvents = allEvents.concat(result);
      } else {
        throw new Error(`Unsupported site: ${site}`);
      }

      console.log("All events: ", allEvents);
    }
  } catch (error) {
    console.log(error);
  }
};
