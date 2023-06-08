/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export const PostOperations = {
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
  },
  Query: {
    getUserPosts: gql`
      query ExampleQuery($userId: String) {
        getUserPosts(userId: $userId) {
          post {
            beerName
            alcohol
            alcoholHit
            author
            authorImg
            comments
            id
            createdAt
            image
            likes
            origin
            price
            quality
            rating
            taste
            value
            reviewBody
          }
          user {
            avatar
            email
            birthdate
            friends
            incomingRequests
            karma
            sentRequests
            password
            username
            id
          }
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
  Subscription: {},
};
