/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      link
      title
      dateWritten
      data
      approved
      admin
      tagId
      creatorId
      creator {
        id
        userName
        userImage
        userId
        admin
        data
        createdAt
        updatedAt
      }
      sourceId
      source {
        id
        sourceName
        sourceUrl
        sourceImage
        creatorId
        creatorEmail
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        link
        title
        dateWritten
        data
        approved
        admin
        tagId
        creatorId
        creator {
          id
          userName
          userImage
          userId
          admin
          data
          createdAt
          updatedAt
        }
        sourceId
        source {
          id
          sourceName
          sourceUrl
          sourceImage
          creatorId
          creatorEmail
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      creatorId
      data
      frontpage
      official
      type
      articles {
        items {
          id
          link
          title
          dateWritten
          data
          approved
          admin
          tagId
          creatorId
          sourceId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        creatorId
        data
        frontpage
        official
        type
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTagRelation = /* GraphQL */ `
  query GetTagRelation($id: ID!) {
    getTagRelation(id: $id) {
      id
      parentId
      childId
      creatorId
      parentTag {
        id
        name
        creatorId
        data
        frontpage
        official
        type
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      childTag {
        id
        name
        creatorId
        data
        frontpage
        official
        type
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTagRelations = /* GraphQL */ `
  query ListTagRelations(
    $filter: ModelTagRelationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagRelations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        parentId
        childId
        creatorId
        parentTag {
          id
          name
          creatorId
          data
          frontpage
          official
          type
          createdAt
          updatedAt
        }
        childTag {
          id
          name
          creatorId
          data
          frontpage
          official
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSource = /* GraphQL */ `
  query GetSource($id: ID!) {
    getSource(id: $id) {
      id
      sourceName
      sourceUrl
      sourceImage
      creatorId
      creatorEmail
      description
      createdAt
      updatedAt
    }
  }
`;
export const listSources = /* GraphQL */ `
  query ListSources(
    $filter: ModelSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sourceName
        sourceUrl
        sourceImage
        creatorId
        creatorEmail
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userName
      userImage
      userId
      admin
      data
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        userImage
        userId
        admin
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStorygraf = /* GraphQL */ `
  query GetStorygraf($id: ID!) {
    getStorygraf(id: $id) {
      id
      creatorId
      approved
      data
      createdAt
      updatedAt
    }
  }
`;
export const listStorygrafs = /* GraphQL */ `
  query ListStorygrafs(
    $filter: ModelStorygrafFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStorygrafs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creatorId
        approved
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
