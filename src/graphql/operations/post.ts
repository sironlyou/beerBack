/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export default {
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
    likedPost: gql`
      mutation LikedPost($postId: String) {
        likedPost(postId: $postId) {
          alcohol
          alcoholHit
          author
          authorImg
          beerName
          id
          createdAt
          image
          likes
          origin
          price
          quality
          rating
          reviewBody
          taste
          value
        }
      }
    `,
    dislikedPost: gql`
      mutation DislikedPost($postId: String) {
        dislikedPost(postId: $postId) {
          alcohol
          alcoholHit
          author
          authorImg
          beerName
          id
          createdAt
          image
          likes
          origin
          price
          quality
          rating
          reviewBody
          taste
          value
        }
      }
    `,
    loginUser: gql`
      mutation LoginUser($login: String!, $password: String!) {
        loginUser(login: $login, password: $password) {
          avatar
          email
          password
          username
          id
        }
      }
    `,
    createUser: gql`
      mutation CreateUser(
        $username: String!
        $password: String!
        $email: String!
        $avatar: String!
      ) {
        createUser(
          username: $username
          password: $password
          email: $email
          avatar: $avatar
        ) {
          avatar
          email
          password

          id
          username
        }
      }
    `,
    createPost: gql`
      mutation CreateComment(
        $author: String
        $origin: String
        $alcohol: String
        $value: String
        $price: String
        $quality: String
        $taste: String
        $alcoholHit: String
        $beerName: String
        $reviewBody: String
        $image: String
        $authorImg: String
        $rating: String
      ) {
        createPost(
          author: $author
          origin: $origin
          alcohol: $alcohol
          value: $value
          price: $price
          quality: $quality
          taste: $taste
          alcoholHit: $alcoholHit
          beerName: $beerName
          reviewBody: $reviewBody
          image: $image
          authorImg: $authorImg
          rating: $rating
        ) {
          post {
            alcohol
            alcoholHit
            authorImg
            author
            beerName
            createdAt
            comments
            image
            id
            likes
            origin
            price
            quality
            rating
            taste
            reviewBody
            value
          }
          user {
            avatar
            email
            password
            id
            username
          }
        }
      }
    `,
    logoutUser: gql`
      mutation Mutation {
        logoutUser
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
    getUser: gql`
      query Query {
        getUser {
          avatar
          email
          id
          password

          username
        }
      }
    `,

    getPosts: gql`
      query GetPosts($amount: Int) {
        getPosts(amount: $amount) {
          post {
            alcohol
            alcoholHit
            author
            authorImg
            beerName
            comments
            createdAt
            id
            image
            likes
            quality
            origin
            price
            rating
            reviewBody
            taste
            value
          }
          user {
            avatar
            email
            password
            id
            username
          }
        }
      }
    `,
  },
};
