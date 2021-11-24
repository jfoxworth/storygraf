/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
      id
      link
      title
      dateWritten
      dateCreated
      data
      approved
      admin
      creatorId
      creator {
        id
        userName
        userImage
        admin
        dateCreated
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
          dateCreated
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
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
      id
      link
      title
      dateWritten
      dateCreated
      data
      approved
      admin
      creatorId
      creator {
        id
        userName
        userImage
        admin
        dateCreated
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
          dateCreated
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
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
      id
      link
      title
      dateWritten
      dateCreated
      data
      approved
      admin
      creatorId
      creator {
        id
        userName
        userImage
        admin
        dateCreated
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
          dateCreated
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
      name
      dateCreated
      creatorId
      data
      frontpage
      official
      tagArtConns {
        items {
          id
          tagId
          articleId
          creatorId
          dateCreated
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
      name
      dateCreated
      creatorId
      data
      frontpage
      official
      tagArtConns {
        items {
          id
          tagId
          articleId
          creatorId
          dateCreated
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
      name
      dateCreated
      creatorId
      data
      frontpage
      official
      tagArtConns {
        items {
          id
          tagId
          articleId
          creatorId
          dateCreated
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
export const createTagArtCon = /* GraphQL */ `
  mutation CreateTagArtCon(
    $input: CreateTagArtConInput!
    $condition: ModelTagArtConConditionInput
  ) {
    createTagArtCon(input: $input, condition: $condition) {
      id
      tagId
      articleId
      creatorId
      dateCreated
      article {
        id
        link
        title
        dateWritten
        dateCreated
        data
        approved
        admin
        creatorId
        creator {
          id
          userName
          userImage
          admin
          dateCreated
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
        dateCreated
        creatorId
        data
        frontpage
        official
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
          dateCreated
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
          dateCreated
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
export const updateTagArtCon = /* GraphQL */ `
  mutation UpdateTagArtCon(
    $input: UpdateTagArtConInput!
    $condition: ModelTagArtConConditionInput
  ) {
    updateTagArtCon(input: $input, condition: $condition) {
      id
      tagId
      articleId
      creatorId
      dateCreated
      article {
        id
        link
        title
        dateWritten
        dateCreated
        data
        approved
        admin
        creatorId
        creator {
          id
          userName
          userImage
          admin
          dateCreated
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
        dateCreated
        creatorId
        data
        frontpage
        official
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
          dateCreated
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
          dateCreated
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
export const deleteTagArtCon = /* GraphQL */ `
  mutation DeleteTagArtCon(
    $input: DeleteTagArtConInput!
    $condition: ModelTagArtConConditionInput
  ) {
    deleteTagArtCon(input: $input, condition: $condition) {
      id
      tagId
      articleId
      creatorId
      dateCreated
      article {
        id
        link
        title
        dateWritten
        dateCreated
        data
        approved
        admin
        creatorId
        creator {
          id
          userName
          userImage
          admin
          dateCreated
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
        dateCreated
        creatorId
        data
        frontpage
        official
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
          dateCreated
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
          dateCreated
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
export const createTagRelation = /* GraphQL */ `
  mutation CreateTagRelation(
    $input: CreateTagRelationInput!
    $condition: ModelTagRelationConditionInput
  ) {
    createTagRelation(input: $input, condition: $condition) {
      id
      parentId
      childId
      creatorId
      dateCreated
      parentTag {
        id
        name
        dateCreated
        creatorId
        data
        frontpage
        official
        tagArtConns {
          nextToken
        }
        createdAt
        updatedAt
      }
      childTag {
        id
        name
        dateCreated
        creatorId
        data
        frontpage
        official
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
export const updateTagRelation = /* GraphQL */ `
  mutation UpdateTagRelation(
    $input: UpdateTagRelationInput!
    $condition: ModelTagRelationConditionInput
  ) {
    updateTagRelation(input: $input, condition: $condition) {
      id
      parentId
      childId
      creatorId
      dateCreated
      parentTag {
        id
        name
        dateCreated
        creatorId
        data
        frontpage
        official
        tagArtConns {
          nextToken
        }
        createdAt
        updatedAt
      }
      childTag {
        id
        name
        dateCreated
        creatorId
        data
        frontpage
        official
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
export const deleteTagRelation = /* GraphQL */ `
  mutation DeleteTagRelation(
    $input: DeleteTagRelationInput!
    $condition: ModelTagRelationConditionInput
  ) {
    deleteTagRelation(input: $input, condition: $condition) {
      id
      parentId
      childId
      creatorId
      dateCreated
      parentTag {
        id
        name
        dateCreated
        creatorId
        data
        frontpage
        official
        tagArtConns {
          nextToken
        }
        createdAt
        updatedAt
      }
      childTag {
        id
        name
        dateCreated
        creatorId
        data
        frontpage
        official
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
export const createSource = /* GraphQL */ `
  mutation CreateSource(
    $input: CreateSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    createSource(input: $input, condition: $condition) {
      id
      sourceName
      sourceUrl
      sourceImage
      creatorId
      articles {
        items {
          id
          link
          title
          dateWritten
          dateCreated
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
export const updateSource = /* GraphQL */ `
  mutation UpdateSource(
    $input: UpdateSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    updateSource(input: $input, condition: $condition) {
      id
      sourceName
      sourceUrl
      sourceImage
      creatorId
      articles {
        items {
          id
          link
          title
          dateWritten
          dateCreated
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
export const deleteSource = /* GraphQL */ `
  mutation DeleteSource(
    $input: DeleteSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    deleteSource(input: $input, condition: $condition) {
      id
      sourceName
      sourceUrl
      sourceImage
      creatorId
      articles {
        items {
          id
          link
          title
          dateWritten
          dateCreated
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      userName
      userImage
      admin
      dateCreated
      data
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      userName
      userImage
      admin
      dateCreated
      data
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      userName
      userImage
      admin
      dateCreated
      data
      createdAt
      updatedAt
    }
  }
`;
