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
        articles {
          nextToken
        }
        createdAt
        updatedAt
      }
      tagArtCons {
        items {
          id
          tagId
          articleId
          creatorId
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
        tagArtCons {
          nextToken
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
      tagArtConns {
        items {
          id
          tagId
          articleId
          creatorId
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
        tagArtConns {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTagArtCon = /* GraphQL */ `
  query GetTagArtCon($id: ID!) {
    getTagArtCon(id: $id) {
      id
      tagId
      articleId
      creatorId
      article {
        id
        link
        title
        dateWritten
        data
        approved
        admin
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
        tagArtCons {
          nextToken
        }
        createdAt
        updatedAt
      }
      tag {
        id
        name
        creatorId
        data
        frontpage
        official
        type
        tagArtConns {
          nextToken
        }
        createdAt
        updatedAt
      }
      parentRelations {
        items {
          id
          parentId
          childId
          creatorId
          createdAt
          updatedAt
        }
        nextToken
      }
      childRelations {
        items {
          id
          parentId
          childId
          creatorId
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
export const listTagArtCons = /* GraphQL */ `
  query ListTagArtCons(
    $filter: ModelTagArtConFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagArtCons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tagId
        articleId
        creatorId
        article {
          id
          link
          title
          dateWritten
          data
          approved
          admin
          creatorId
          sourceId
          createdAt
          updatedAt
        }
        tag {
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
        parentRelations {
          nextToken
        }
        childRelations {
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
        tagArtConns {
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
        tagArtConns {
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
      articles {
        items {
          id
          link
          title
          dateWritten
          data
          approved
          admin
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
