import express from "express";
import { chromium, firefox } from "playwright";
import cors from "cors";
import { scrapeEvents } from "./scraper.js";


const app = express();
const PORT = 5001;

app.use(cors());

app.get("/scrape", async (req, res) => {
  let browser;
  try {
    let  retryCount = 3
    browser = await firefox.launch();

   
    const events = await scrapeEvents(browser, retryCount);

    if  (browser){
      await browser.close();
      }

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Scraper server running on http://localhost:${PORT}`);
});