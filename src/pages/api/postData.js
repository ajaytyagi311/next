const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
import admin from '../../utils/firebase-admin';
const {uid} = require('uid');

const db = admin.firestore();
const myCollectionRef = db.collection('my_collection');

async function main(url) {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage();
    await page.goto(url);
    
    for(let i = 0; i < 10; ++i){
      await new Promise(resolve => setTimeout(resolve, 100));

      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    }

    const html = await page.content();
    const $ = cheerio.load(html);
    let obj = {company_name: 'kobe', jobs: []};

    const myDocumentRef = myCollectionRef.doc(uid(6));

    let cnt = 0;
    let str = $('a.job-card-container__company-name');
    let strtxtjq = $('a.job-card-container__company-name').textContent;
    let strtxtjs = str.textContent;
    let strjqtext = $('a.job-card-container__company-name').text();

    // console.info('str', str);
    console.info('strtxtjq', strtxtjq);
    console.info('strtxtjs', strtxtjs);
    console.info('strjqtext', strjqtext);

    // console.info('comp name', obj.company_name);
    $('a.base-card__full-link span').each((index, element) => {
        obj.jobs.push($(element).text().trim());
        ++cnt;
        if(cnt === 100) return false;
    });

    await browser.close();
    
    myDocumentRef.set(obj)
        .then(() => {
            console.log('Document written!');
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });

    return obj;
}

export default async function handler(req, res) {
  try {
    const {_url} = req.body;
    // console.info('req', req);
    console.info('_url', _url);
    const data = await main(_url);
    res.status(200).send(data);
  } catch (err) {
    console.error('Error parsing request body:', err);
    res.status(400).send('Invalid request body');
  }
}