const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ogs = require("open-graph-scraper");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/scrape", (req, res) => {
  console.log("In the scraper");
  const { body } = req;
  const { url } = body;
  const options = { url: url };
  console.log(options);
  try {
    console.log("Here 1");
    ogs(options).then((data) => {
      try {
        const { error, html, result, response } = data;
        console.log(error);
        console.log("result:", result); // This contains all of the Open Graph results
        res.status(200).json({ ...result });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log("Here");
    console.log(error);
  }
});

app.listen(3001, () => console.log("OG Scraper Listening..."));
