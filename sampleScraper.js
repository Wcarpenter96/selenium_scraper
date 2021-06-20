const {  
    Browser,
    Builder,
    until,
  } = require('selenium-webdriver');
  const {  
    Options,
    ServiceBuilder,
  } = require('selenium-webdriver/chrome');
  
  let options = new Options();
  
  // This tells Selenium where to find your Chrome browser executable
  options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
  
  // These options are necessary if you'd like to deploy to Heroku
  options.addArguments("--headless");
  options.addArguments("--disable-gpu");
  options.addArguments("--no-sandbox");
  
  (async function run() {
    // Necessary to tell Selenium where to find your newly-installed chromedriver executable
    let serviceBuilder = new ServiceBuilder(process.env.CHROME_DRIVER_PATH);
  
    // Create a new "driver", which controls the browser and does all the actual scraping
    let driver = new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .setChromeService(serviceBuilder)
      .build();
  
    try {
      // Open up google.com in the browser
      const res1 = await driver.get('https://www.google.com');
      // Wait on this page until this condition is met
      const res2 = await driver.wait(until.titleMatches(/Google/));
      // Get the full HTML of the page and log it
      const html = await driver.getPageSource();
      console.log(`HTML is:\n\n{}\n\n`, html);
    } finally {
      await driver.quit();
    }
  })();