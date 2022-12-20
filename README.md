# Story graf

This repo is a project using React, React Bootstrap, and styled components for the front end. It uses a node express back end with DynammoDB on the back end. That is contained in another repo. An AWS user pool is used handle user sign up and login.

The project lets users organize news stories based upon tags that they create. This lets them organize news in a manner they see fit. It also presents those tags and stories in a formal manner to all users, allowing then to see the news as we do. There is also a set of official tags that arrange stories by tag (subject).

The code can be viewed <a href="https://storygraf-react.s3-website.us-east-2.amazonaws.com/">here</a>;

## Public Facing Pages

The app is fairly simple. There is a home page that explains the project as well as several supporting pages that explain the intricacies of the project. There are also the standard pages for register and login.

The main pages of the app are listed here:

### Profile page /Profile

This page shows a users bio, their selected profile image, as well as a list of tags that the user follows as well as a mechanism to view tags that the user has created.

### Official Tags page /Tags

A list of official top level tags and the following waterfalls.

### Tag /Tag/:tagId

This page shows the info for a tag (the description entered by the creator) as well as articles and child tags and its parent tags.

### Sources /Sources

A simple page that shows the user a list of acceptable sources. For someone with admin permissions, this includes a place to add a source.

## Development

To run the code locally, use

`npm run dev`

To build bundle to be deployed, use

`npm run build`

## Local server to scrape web pages

The app lets users add articles to create a story graf. To do this, users enter a url and the data for that URL needs to be scraped. Since that cannot be done in a browser, a server is provided as part of this code that can scape and return the article data.

To run the server, go to the src file and then run ...

`node server.js`

## User sign up and sign in

The register page gets a user name, email, and password. An AWS Amazon User Pool handles the account validity and holds the user email and password, sends a link to the user's account for validation, and handles login.

The user's name, and all other profile data is handled on my dynammoDB database. When a user enters a user name, it is checked for uniqueness within our database.
