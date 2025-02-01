

const scrapeEventbrite = async (page, retryCount ) => {
    try {

        let eventCardSelector = '.search-results-panel-content__events section'
    
        try {
          await page.goto("https://www.eventbrite.com/d/zimbabwe--harare/all-events/", { waitUntil: "load" });
    
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
    
          return events
        } catch (pageError) {
          if (retryCount < 3) {
            console.log(`Retrying... (${retryCount + 1}/${3})`);
            return await scrapeEventbrite(retryCount + 1);
          } else {
            throw new Error(
              `Failed to scrape data after ${3} attempts: ${pageError.message}`
            );
          }
        }
      } catch (browserError) {
        throw new Error(`Failed to launch browser: ${browserError.message}`);
      }

  }


export default scrapeEventbrite;