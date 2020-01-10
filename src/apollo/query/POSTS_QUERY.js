import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"
import { COMMENT_FIELDS } from "../fragments"

const POSTS_QUERY = gql`
  ${USER_FRAGMENT}
  ${COMMENT_FIELDS}
  query PostsQuery(
    $search: String
    $author: Int
    $categoryId: Int
    $categoryIn: [ID]
    $categoryNotIn: [ID]
    $categoryName: String
    $hasPassword: Boolean
    $password: String
  ) {
    posts(
      where: {
        search: $search
        author: $author
        categoryId: $categoryId
        categoryIn: $categoryIn
        categoryName: $categoryName
        categoryNotIn: $categoryNotIn
        hasPassword: $hasPassword
        password: $password
      }
    ) {
      nodes {
        title
        content
        postId
        date
        dateGmt
        author {
          ...UserFragment
        }
        commentCount
        comments {
          nodes {
            ...CommentFields
            children {
              nodes {
                ...CommentFields
                children {
                  nodes {
                    ...CommentFields
                    children {
                      nodes {
                        ...CommentFields
                        children {
                          nodes {
                            ...CommentFields
                            children {
                              nodes {
                                ...CommentFields
                                children {
                                  nodes {
                                    ...CommentFields
                                    children {
                                      nodes {
                                        ...CommentFields
                                        children {
                                          nodes {
                                            ...CommentFields
                                            children {
                                              nodes {
                                                ...CommentFields
                                                children {
                                                  nodes {
                                                    ...CommentFields
                                                    children {
                                                      nodes {
                                                        ...CommentFields
                                                        children {
                                                          nodes {
                                                            ...CommentFields
                                                            children {
                                                              nodes {
                                                                ...CommentFields
                                                                children {
                                                                  nodes {
                                                                    ...CommentFields
                                                                    children {
                                                                      nodes {
                                                                        ...CommentFields
                                                                        children {
                                                                          nodes {
                                                                            ...CommentFields
                                                                            children {
                                                                              nodes {
                                                                                ...CommentFields
                                                                                children {
                                                                                  nodes {
                                                                                    ...CommentFields
                                                                                    children {
                                                                                      nodes {
                                                                                        ...CommentFields
                                                                                        children {
                                                                                          nodes {
                                                                                            ...CommentFields
                                                                                            children {
                                                                                              nodes {
                                                                                                ...CommentFields
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default POSTS_QUERY
