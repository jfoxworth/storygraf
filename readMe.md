## Introduction

## Introduction

This is the root directory for the front end of Storygraf. Storygraf is a Next.js app built from the Materialize template. It has a DynammoDB backend as well as a scraper for pulling in articles and social media posts.

## Running locally

To run the front end, in the base directory ...

yarn dev
localhost:3000

To run the back end, remember that you may need to vi your credentials file to set the default to the proper credentials. In that directory, run ...

npm start

To run the scraper, in a separate terminal window in the root directory, run ...

node src/utils/scraper.js
