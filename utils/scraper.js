// scraper.js

import sitesConfig from "../sites.config";

const validateEvent = (event) => {
    return (
      typeof event.title === "string" &&
      typeof event.date === "string" &&
      typeof event.image === "string" &&
      typeof event.location === "string"
    );
};


export const scrapeEvents = async ({ browser, retryCount }) => {
    try {

        allEvents = []

        for (const site of sitesConfig){
            if (site.startsWith("https://www.eventbrite.com")){
                let result = await scrapeEventbrite({ browser, retryCount });
                allEvents = allEvents.concat(result);
            }else if (site.startsWith("https://allevents.in")){
                let result = await scrapeAllevents({ browser, retryCount });
                allEvents = allEvents.concat(result);
            }else{
                throw new Error(`Unsupported site: ${site}`);
            }
        }

    }catch(error){
        console.log(error);
    }

};




  const scrapeEventbrite = async ({ browser, retryCount }) => {
    try {
        const page = await browser.newPage();

        let eventCardSelector = '[data-event-bucket-label="Events near Harare in Harare"] .discover-vertical-event-card'
    
        try {
          await page.goto("https://www.eventbrite.com/d/zimbabwe--harare/events/", { waitUntil: "load" });
    
          await page.waitForSelector(eventCardSelector, {
            timeout: 10000,
          });
    
          const events = await page.$$eval(
           eventCardSelector,
            (elements) => {
              return elements.map((element) => {
                const link =  element.querySelector("a.event-card-link")?.href || "N/A";
                const image =  element.querySelector("a.event-card-image")?.src || "N/A";
                const title = element.querySelector("h3")?.innerText || "N/A";
                const location = element.querySelector("p.event-card__clamp-line--one")?.innerText || "N/A";
                const date =  element.querySelector(".event-card-details p")?.innerText || "N/A";

     
                return { link, image, title, date, location};
              });
            }
          );
    
          const validEvents = events.filter(validateEvent);
    
          if (validEvents.length === 0) {
            throw new Error("No events found");
          }
    
          return validEvents;
        } catch (pageError) {
          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
            return await scrapeEventbrite(retryCount + 1);
          } else {
            throw new Error(
              `Failed to scrape data after ${MAX_RETRIES} attempts: ${pageError.message}`
            );
          }
        } finally {
          await page.close();
        }
      } catch (browserError) {
        throw new Error(`Failed to launch browser: ${browserError.message}`);
      } finally {
        if (browser) {
          await browser.close();
        }
      }

  }


  const scrapeAllevents = async ({ browser, retryCount }) => {
    try {
        const page = await browser.newPage();
    
        try {
          await page.goto("https://www.airbnb.com/", { waitUntil: "load" });
    
          await page.waitForSelector('[itemprop="itemListElement"]', {
            timeout: 10000,
          });
    
          const listings = await page.$$eval(
            '[itemprop="itemListElement"]',
            (elements) => {
              return elements.slice(0, 10).map((element) => {
                const title =
                  element.querySelector(".t1jojoys")?.innerText || "N/A";
                const price =
                  element.querySelector("._11jcbg2")?.innerText || "N/A";
                const link = element.querySelector("a")?.href || "N/A";
                return { title, price, link };
              });
            }
          );
    
          const validListings = listings.filter(validateListing);
    
          if (validListings.length === 0) {
            throw new Error("No listings found");
          }
    
          return validListings;
        } catch (pageError) {
          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
            return await scrapeListings(retryCount + 1);
          } else {
            throw new Error(
              `Failed to scrape data after ${MAX_RETRIES} attempts: ${pageError.message}`
            );
          }
        } finally {
          await page.close();
        }
      } catch (browserError) {
        throw new Error(`Failed to launch browser: ${browserError.message}`);
      } finally {
        if (browser) {
          await browser.close();
        }
      }

  }

