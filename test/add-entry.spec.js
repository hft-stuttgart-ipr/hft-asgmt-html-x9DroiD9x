import puppeteer from 'puppeteer'
import path from 'path'

let page;
let browser;
const addEntryPage = `file://${path.resolve('add-entry.html')}`
const width = 1440;
const height = 900;

describe('add-entry HTML', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });
  afterAll(async () => {
    await page.screenshot({path: 'add-entry.png'});
    browser.close();
  });

  it('Should have a <h1> element', async () => {
    await page.goto(addEntryPage);
    const headline = await page.$('h1');
    expect(headline).not.toBeNull();
  });

  it('Should have a <form> element', async () => {
    await page.goto(addEntryPage);
    const form = await page.$('form');
    expect(form).not.toBeNull();
  });

  it('Should have an textarea and input', async () => {
    await page.goto(addEntryPage);
    const textarea = await page.$$('form > textarea');
    const inputs = await page.$$('form > input');
    expect(textarea.length).toBeGreaterThan(0);
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('Should have a link', async () => {
    await page.goto(addEntryPage);
    const links = await page.$$('a')
    expect(links.length).toBeGreaterThan(0);
  });

  it('Should have a button to send data', async () => {
    await page.goto(addEntryPage);
    const input = await page.$$('form > input[type=submit]')
    expect(input.length).toBeGreaterThan(0);
  });
});