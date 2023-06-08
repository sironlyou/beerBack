/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export const CommentOperations = {
  Mutations: {
    createComment: gql`
      mutation CreateComment($author: String, $body: String, $postId: String) {
        createComment(author: $author, body: $body, postId: $postId) {
          comment {
            author
            body
            createdAt
            id
            postId
          }
          user {
            avatar
            password
            id
            username
            email
          }
        }
      }
    `,
  },
  Query: {
    getComments: gql`
      query Query($postId: String) {
        getComments(postId: $postId) {
          comment {
            postId
            id
            createdAt
            author
            body
          }
          user {
            avatar
            id
            username
            password
            email
          }
        }
      }
    `,
  },
  Subscription: {},
};
