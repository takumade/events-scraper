import { validateEvent } from "../utils/general.js";


const scrapeEventbrite = async (browser, retryCount ) => {
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
                const image =  element.querySelector("img.event-card-image")?.src || "N/A";
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


export default scrapeEventbrite;