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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
