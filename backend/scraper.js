// scraper.js

import sites from "./sites.js"


import scrapeAllevents from "./scrappers/allevents.js";
import scrapeEventbrite from "./scrappers/eventbrite.js";



export const scrapeEvents = async ({ browser, retryCount }) => {
    try {

        allEvents = []

        for (const site of sites){
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



