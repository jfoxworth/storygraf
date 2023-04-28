# Storygraf

Storygraf is a next/react app with an AWS DynamoDB back end. Styling was originally handled through styled components but this conflicted with server side rendering in next, so it was reverted to modules. React bootstrap is used for baseline components.

The site has two functions - a news feed, and a space for users to organize news into tags and aggregate data.

## A news feed

There is a list of "offical" tags that are accessible at /Tags. Think of these as top level folders. These are things like "Sports" or "Technology" or "Politics". As the user clicks on a tag, they move into the next level of tags. For "Sports" there are tags for Football, Baseball, Basketball, etc. This then drills down to teams, etc. At the deeper levels, there are articles within a tag.

For example, there is a Sports > NFL Football > Houston Texans > 2023 Draft tag. In that tag are a series of articles arranged by date that cover the known info on that subject. This series of articles is known as the story graf (graph). Similar tags exist for stories surroinding any given incident or subject. This is the first aspect of Storygraf - showing these stories in a timeline. Users can also add cumulatives and other items.

The second aspect of the news feed is that each time a story is added to a tag, it propagates up to every parent tag. So an article added to the tag above of Sports > NFL Football > Houston Texans > 2023 Draft tag would appear on all of those tags - as long as it is one of the most recent 5 articles.

Users can go to the base graf and see the latest stories for each of the official tag or they can subscribe to the tags of other users. In this manner, users can see the most recent articles for any subject.

## Telling a story

Within any tag, the articles will appear as a timeline. Sometimes, users want to show data instead of just showing a timeline. In this case, users can establish a cumulative for a tag. Cumulatives can then be set for each article. For example, in [this tag](http://localhost:3000/Tag/01GP2JCWM8CDN6GV06BAEJTNBY/01GP4MTAZ5VD19GR60F031YGR7) we show the total number of startups funded by YCombinator. The number in each cycle is shown and the article in question provides this information.

## Running locally

To run this code locally, use the following commands:

```
  npm i
  npm run dev
```

To do this, the back end must be running locally as well.

## CI/CD

Pushing this code to the main branch on github will prompt a build and deploy cycle.

## Running StoryBook

I am using Storybook to aid in documentation and development. I don't have all of the components built out yet. To run the storybook locally, run the following command:

```
npm i
npm run storybook
```
