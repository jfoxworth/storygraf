# Story graf

This repo is a project using React, React Bootstrap, and styled components to create the front end for a site called Storygraf. It uses a node express back end with DynammoDB, which is contained in another repo. An AWS user pool is used handle user sign up and login.

The project lets users organize news stories based upon tags that they create. This lets them organize news in a manner they see fit. It also presents those tags and stories in a formal manner to all users, allowing then to see the news as we do. There is also a set of official tags that arrange stories by tag (subject).

The app can be viewed <a href="http://storygraf-005373810151-website-dev.s3-website.us-east-2.amazonaws.com/">here</a>;

## AWS CI/CD

A cloud formation setup builds and deploys the front end into production whenever the master branch is updated.

## Other AWS aspects

A node back end is also deployed via CI/CD in AWS. It interacts with the dynamoDB table that contains the data. An additional AWS lambda function is used to scrape data from a URL whenever a user adds an article.

## Development

To build bundle to be deployed, use

`npm run build`

To run the code locally, you need to run the front end, a node server to interact with the database. You can also run a local server to capture website data instead of using the lambda function.

To do this, run this repo locally using :

`npm run dev`

In a separate console window, navigate to the local version of the node back end and run

`npm start`

To run the server to scrape website data, go to the src file and then run ...

`node server.js`

## Data Plan

This app uses DynamoDB as a single table database. There are 7 different types of entities:

- Tags
- Items
- Cumulative Items
- Sources
- Users
- Profiles
- FollowedTag
- EmbeddedTag
- ImportedTag
