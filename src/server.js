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
  ogs(options).then((data) => {
    const { error, result, response } = data;
    console.log("result:", result); // This contains all of the Open Graph results
    res.status(200).json({ ...result });
  });
});

app.listen(3001, () => console.log("OG Scraper Listening..."));
