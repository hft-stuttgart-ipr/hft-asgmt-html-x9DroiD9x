import puppeteer from 'puppeteer'
import path from 'path'

let page;
let browser;
const indexPage = `file://${path.resolve('index.html')}`
const width = 1440;
const height = 900;

describe('index HTML', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });
  afterAll(async () => {
    await page.screenshot({path: 'index.png'});
    browser.close();
  });

  it('Should have a <h1> element', async () => {
    await page.goto(indexPage);
    const headline = await page.$('h1');
    expect(headline).not.toBeNull();
  });

  it('Should have a <table> element', async () => {
    await page.goto(indexPage);
    const table = await page.$('table');
    expect(table).not.toBeNull();
  });

  it('Should have a two or more entries within the table', async () => {
    await page.goto(indexPage);
    const trElements = await page.$$('table tr');
    expect(trElements.length).toBeGreaterThan(1);
  });

  it('Should have a link', async () => {
    await page.goto(indexPage);
    const links = await page.$$('a')
    expect(links.length).toBeGreaterThan(0);
  });
});
