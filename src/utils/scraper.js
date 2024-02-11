const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const getMetaData = require('metadata-scraper')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/scrape', (req, res) => {
  console.log('Scraping data')
  try {
    axios.get(req?.body?.url).then(html => {
      const $ = cheerio.load(html.data)
      const returnItem = {
        title:
          $('title').text() ||
          $('meta[property="og:title"]').attr('content') ||
          $('meta[name="og:title"]').attr('content') ||
          $('meta[property="twitter:title"]').attr('content') ||
          $('meta[name="twitter:title"]').attr('content') ||
          $('meta[property="parsely-title"]').attr('content') ||
          $('meta[name="parsely-title"]').attr('content') ||
          $('meta[property="sailthru.title"]').attr('content') ||
          $('meta[name="sailthru.title"]').attr('content') ||
          '',
        description:
          $('meta[property="og:description"]').attr('content') ||
          $('meta[name="og:description"]').attr('content') ||
          $('meta[property="description"]').attr('content') ||
          $('meta[name="description"]').attr('content') ||
          $('meta[property="sailthru.description"]').attr('content') ||
          $('meta[name="sailthru.description"]').attr('content') ||
          $('meta[property="twitter:description"]').attr('content') ||
          $('meta[name="twitter:description"]').attr('content') ||
          '',
        published_time:
          $('meta[property="og:published_time"]').attr('content') ||
          $('meta[property="article:published_time"]').attr('content') ||
          $('meta[name="article:published_time"]').attr('content') ||
          $('meta[property="published_time"]').attr('content') ||
          $('meta[name="published_time"]').attr('content') ||
          $('meta[property="parsely-pub-date"]').attr('content') ||
          $('meta[property="sailthru.date"]').attr('content') ||
          $('meta[name="sailthru.date"]').attr('content') ||
          $('meta[property="date"]').attr('content') ||
          $('meta[name="date"]').attr('content') ||
          $('meta[property="release_date"]').attr('content') ||
          $('meta[name="release_date"]').attr('content') ||
          $('time[datetime]').attr('datetime') ||
          $('time[datetime][pubdate]').attr('datetime') ||
          '',
        modified_time:
          $('meta[property="og:modified_time"]').attr('content') ||
          $('meta[property="og:updated_time"]').attr('content') ||
          $('meta[name="og:updated_time"]').attr('content') ||
          $('meta[property="article:modified_time"]').attr('content') ||
          $('meta[property="updated_time"]').attr('content') ||
          $('meta[name="updated_time"]').attr('content') ||
          $('meta[property="modified_time"]').attr('content') ||
          $('meta[name="modified_time"]').attr('content') ||
          $('meta[property="revised"]').attr('content') ||
          $('meta[name="revised"]').attr('content') ||
          '',
        image:
          $('meta[property="og:image"]').attr('content') ||
          $('meta[property="og:image:secure_url"]').attr('content') ||
          $('meta[property="og:image:url"]').attr('content') ||
          $('meta[name="og:image:url"]').attr('content') ||
          $('meta[name="og:image"]').attr('content') ||
          $('meta[property="twitter:image"]').attr('content') ||
          $('meta[name="twitter:image"]').attr('content') ||
          '',
        image_type: $('meta[property="og:image:type"]').attr('content') || '',
        site_name: $('meta[property="og:site_name"]').attr('content') || '',
        url: $('meta[property="og:url"]').attr('content') || '',
        type: $('meta[property="og:type"]').attr('content') || '',
        locale: $('meta[property="og:locale"]').attr('content') || '',
        author:
          $('meta[property="og:author"]').attr('content') ||
          $('meta[property="author"]').attr('content') ||
          $('meta[name="author"]').attr('content') ||
          $('meta[property="book:author"]').attr('content') ||
          $('meta[name="book:author"]').attr('content') ||
          $('meta[property="parsely-author"]').attr('content') ||
          $('meta[name="parsely-author"]').attr('content') ||
          $('meta[property="sailthru-author"]').attr('content') ||
          $('meta[name="sailthru.author"]').attr('content') ||
          $('meta[property="twitter:creator"]').attr('content') ||
          $('meta[name="twitter:creator"]').attr('content') ||
          $('meta[property="profile:username"]').attr('content') ||
          $('meta[name="profile:username"]').attr('content') ||
          ''
      }
      console.log('I should be returning')
      console.log(returnItem)
      res.status(200).json(returnItem)
      return returnItem
    })
  } catch (error) {
    console.log(error)
  }
})

app.listen(3001, () => console.log('OG Scraper Listening...'))
