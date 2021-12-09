/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle {
    onCreateArticle {
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
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle {
    onUpdateArticle {
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
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle {
    onDeleteArticle {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateTagArtCon = /* GraphQL */ `
  subscription OnCreateTagArtCon {
    onCreateTagArtCon {
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
export const onUpdateTagArtCon = /* GraphQL */ `
  subscription OnUpdateTagArtCon {
    onUpdateTagArtCon {
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
export const onDeleteTagArtCon = /* GraphQL */ `
  subscription OnDeleteTagArtCon {
    onDeleteTagArtCon {
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
export const onCreateTagRelation = /* GraphQL */ `
  subscription OnCreateTagRelation {
    onCreateTagRelation {
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
export const onUpdateTagRelation = /* GraphQL */ `
  subscription OnUpdateTagRelation {
    onUpdateTagRelation {
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
export const onDeleteTagRelation = /* GraphQL */ `
  subscription OnDeleteTagRelation {
    onDeleteTagRelation {
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
export const onCreateSource = /* GraphQL */ `
  subscription OnCreateSource {
    onCreateSource {
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
export const onUpdateSource = /* GraphQL */ `
  subscription OnUpdateSource {
    onUpdateSource {
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
export const onDeleteSource = /* GraphQL */ `
  subscription OnDeleteSource {
    onDeleteSource {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      userName
      userImage
      admin
      data
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      userName
      userImage
      admin
      data
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      userName
      userImage
      admin
      data
      createdAt
      updatedAt
    }
  }
`;
