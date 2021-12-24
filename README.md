# Story graf

This repo is a project using React, AWS Amplify, React Bootstrap, and graphql. It lets users organize news stories based upon tags that they create. This lets them organize news in a manner they see fit. It also presents those tags and stories in a formal manner to all users, allowing then to see the news as we do.

There may be a top level tag called "Donald Trump". Child tags may include "Jan 6", "Russia Gate", "The Wall" or similar subjects or events. Each of these tags can have child tags and articles attached to them. The articles are displayed in a timeline of when they were written and the user is allowed to enter a small description of the article to denote what that article adds to the story.

There are "official" tags that we display on the home page and officially maintain and there are tags created and used by the users.

## Public Facing Pages

### Home page

The home page displays a "Drudge Report" type list of stories. Those stories are organized with tags. Which tags appear on that page depends upon input that we set on a separate page. The idea is that users will click on the tags to see other stories and come back to see updates on those tags and subtags.

### Profile page /Profile

This page shows a users bio, their selected profile image.

A list of the users top level tags and the following waterfalls. A button is present that lets them create a new top level tag. Next to each tag are buttons to add a child tag or attach an article. When the user creates a tag, it is done through a modal. This modal lets the user enter a name for the tag, a color, font color, and a description of the tag.

### Official Tags page /Tags

A list of official top level tags and the following waterfalls.

### Tag /Tag/:tagId

This page shows the info for a tag (the description entered by the creator) as well as articles and child tags and its parent tags.

### Sources /Sources

A simple page that shows the user a list of acceptable sources. For someone with admin permissions, this includes a place to add a source.

## Admin Pages

### Front Page Creator /createFrontPage

Three columns of inputs where I can enter a tag ID for any place in a column.
A place where I can enter a tag name and get the ids for that tag.
A copy of the front page display so that I can see what I am generating.

### Source creator /createSource

A page where I can enter a source and its info and have it stored in the table. I also have to upload the image separately

## Database Tables

Articles - the articles submitted by the users
Tags - Official tags
Users - More info for the users
Source - An official source
TagRelation - A relationship between two tags that tells where that tag lives. A parentId of 0 means that it is a top level tag.

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

GraphQL endpoint: https://yzfpxl2pgjbpjpihfvvagmrmpe.appsync-api.us-east-2.amazonaws.com/graphql
GraphQL API KEY: da2-uic5vwxjz5dpfmq5tdftbutn3a
