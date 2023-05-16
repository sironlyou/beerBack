/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export default {
  Mutations: {
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
        $alcohol: String
        $origin: String
        $value: String
        $price: String
        $taste: String
        $quality: String
        $alcoholHit: String
        $beerName: String
        $rating: String
        $reviewBody: String
        $image: String
        $authorImg: String
      ) {
        createPost(
          author: $author
          alcohol: $alcohol
          origin: $origin
          value: $value
          price: $price
          taste: $taste
          quality: $quality
          alcoholHit: $alcoholHit
          beerName: $beerName
          rating: $rating
          reviewBody: $reviewBody
          image: $image
          authorImg: $authorImg
        ) {
          value
          taste
          reviewBody
          rating
          price
          origin
          quality
          likesCount
          image
          createdAt
          id
          beerName
          author
          alcoholHit
          alcohol
          authorImg
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
          likesCount
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
