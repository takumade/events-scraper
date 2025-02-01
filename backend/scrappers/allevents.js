
const scrapeAllevents = async ( page, retryCount ) => {
    try {
       

       let eventCardSelector = '.event-card-parent li.event-card'
       let showMoreButton = '#show_more_events'
   
       try {
         await page.goto("https://allevents.in/harare/all?ref=new-cityhome-popular", { waitUntil: "load" });
   
         await page.waitForSelector(eventCardSelector, {
           timeout: 20000,
         });

         // Click the show more button until it doesn't exist
          // while (await page.$(showMoreButton)){
          //      console.log("Clicking show more button");
          //      await page.click(showMoreButton);
          //      await page.waitForTimeout(1000);
          //  }
   
         const events = await page.$$eval(
          eventCardSelector,
           (elements) => {
             return elements.map((element) => {
               const link =  element.querySelector(".title a")?.href || "N/A";
               const image =  element.querySelector("img.banner-img")?.src || "N/A";
               const title = element.querySelector("h3")?.innerText || "N/A";
               const location = element.querySelector("div.subtitle")?.innerText || "N/A";
               const date =  element.querySelector("div.date")?.innerText || "N/A";

    
               return { link, image, title, date, location};
             });
           }
         );
   
         return events;
   
         return validEvents;
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
      console.log(browserError)
       throw new Error(`Failed to launch browser: ${browserError.message}`);
     }


 }

 export default scrapeAllevents;
