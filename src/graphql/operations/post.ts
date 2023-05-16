/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export default {
  Mutations: {
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
          token
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
          token
          id
          username
        }
      }
    `,
    createPost: gql`
      mutation CreatePost(
        $author: String
        $origin: String
        $alcohol: String
        $value: String
        $price: String
        $taste: String
        $quality: String
        $beerName: String
        $authorImg: String
        $image: String
        $reviewBody: String
        $rating: String
        $alcoholHit: String
      ) {
        createPost(
          author: $author
          origin: $origin
          alcohol: $alcohol
          value: $value
          price: $price
          taste: $taste
          quality: $quality
          beerName: $beerName
          authorImg: $authorImg
          image: $image
          reviewBody: $reviewBody
          rating: $rating
          alcoholHit: $alcoholHit
        ) {
          alcohol
          alcoholHit
          author
          authorImg
          beerName
          createdAt
          id
          image
          value
          taste
          reviewBody
          rating
          likes
          origin
          price
          quality
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
    getUser: gql`
      query Query {
        getUser {
          avatar
          email
          id
          password
          token
          username
        }
      }
    `,

    getPosts: gql`
      query GetPosts($amount: Int) {
        getPosts(amount: $amount) {
          alcohol
          alcoholHit
          author
          beerName
          createdAt
          id
          image
          likes
          origin
          price
          reviewBody
          rating
          quality
          value
          taste
        }
      }
    `,
  },
};
