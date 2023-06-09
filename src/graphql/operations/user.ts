/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export const UserOperations = {
  Mutations: {
    removeFromFriends: gql`
      mutation RemoveFromFriends($recieverUserId: String) {
        removeFromFriends(recieverUserId: $recieverUserId) {
          friends
          incomingRequests
          sentRequests
          avatar
          birthdate
          email
          id
          karma
          password
          username
        }
      }
    `,
    sendFriendRequest: gql`
      mutation Mutation($recieverUserId: String) {
        sendFriendRequest(recieverUserId: $recieverUserId) {
          friends
          incomingRequests
          sentRequests
          avatar
          birthdate
          email
          id
          karma
          password
          username
        }
      }
    `,
    acceptFriendRequest: gql`
      mutation AcceptFriendRequest($senderUserId: String) {
        acceptFriendRequest(senderUserId: $senderUserId) {
          friends
          incomingRequests
          sentRequests
          avatar
          birthdate
          email
          id
          karma
          password
          username
        }
      }
    `,
    cancelFriendRequest: gql`
      mutation CancelFriendRequest($recieverUserId: String) {
        cancelFriendRequest(recieverUserId: $recieverUserId) {
          friends
          incomingRequests
          sentRequests
          avatar
          birthdate
          email
          id
          karma
          password
          username
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

    logoutUser: gql`
      mutation Mutation {
        logoutUser
      }
    `,
  },
  Query: {
    getChatParticipant: gql`
      query GetChatParticipant($conversationId: String) {
        getChatParticipant(conversationId: $conversationId) {
          avatar
          birthdate
          email
          friends
          incomingRequests
          karma
          id
          password
          sentRequests
          username
        }
      }
    `,
    getFriends: gql`
      query GetFriends($userId: String) {
        getFriends(userId: $userId) {
          avatar
          birthdate
          friends
          id
          incomingRequests
          password
          karma
          sentRequests
          username
          email
        }
      }
    `,
    getUsers: gql`
      query GetUsers($username: String) {
        getUsers(username: $username) {
          avatar
          birthdate
          email
          friends
          incomingRequests
          karma
          id
          password
          sentRequests
          username
        }
      }
    `,

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
    getUserInfo: gql`
      query GetUserInfo($userId: String) {
        getUserInfo(userId: $userId) {
          avatar
          birthdate
          email
          friends
          incomingRequests
          id
          password
          karma
          sentRequests
          username
        }
      }
    `,

    getUser: gql`
      query Query {
        getUser {
          avatar
          email
          id

          username
        }
      }
    `,
  },
  Subscription: {
    removeFriend: gql`
      subscription RemoveFriend($removeFriendId: String) {
        removeFriend(id: $removeFriendId) {
          avatar
          birthdate
          email
          friends
          id
          incomingRequests
          karma
          password
          username
          sentRequests
        }
      }
    `,
    requestAcquired: gql`
      subscription RequestAcquired($recieverUserId: String) {
        requestAcquired(recieverUserId: $recieverUserId) {
          avatar
          birthdate
          email
          friends
          id
          incomingRequests
          karma
          password
          sentRequests
          username
        }
      }
    `,
    requestApproved: gql`
      subscription RequestApproved($senderUserId: String) {
        requestApproved(senderUserId: $senderUserId) {
          avatar
          birthdate
          email
          friends
          id
          incomingRequests
          karma
          password
          sentRequests
          username
        }
      }
    `,
    requestSent: gql`
      subscription RequestSent($recieverUserId: String) {
        requestSent(recieverUserId: $recieverUserId) {
          avatar
          birthdate
          friends
          email
          id
          incomingRequests
          karma
          password
          sentRequests
          username
        }
      }
    `,
    setRequestCanceled: gql`
      subscription SentRequestCanceled($sentRequestCanceledId: String) {
        sentRequestCanceled(id: $sentRequestCanceledId) {
          avatar
          friends
          email
          birthdate
          id
          incomingRequests
          karma
          password
          sentRequests
          username
        }
      }
    `,
    getRemovedFromFriends: gql`
      subscription GetRemovedFromFriends($getRemovedFromFriendsId: String) {
        getRemovedFromFriends(id: $getRemovedFromFriendsId) {
          avatar
          birthdate
          email
          friends
          id
          incomingRequests
          karma
          password
          sentRequests
          username
        }
      }
    `,
    incomingRequestApproved: gql`
      subscription IncomingRequestApproved($senderUserId: String) {
        incomingRequestApproved(senderUserId: $senderUserId) {
          avatar
          birthdate
          email
          friends
          id
          incomingRequests
          karma
          password
          sentRequests
          username
        }
      }
    `,
    incomingRequestCanceled: gql`
      subscription IncomingRequestCanceled($incomingRequestCanceledId: String) {
        incomingRequestCanceled(id: $incomingRequestCanceledId) {
          avatar
          birthdate
          incomingRequests
          id
          friends
          email
          karma
          password
          sentRequests
          username
        }
      }
    `,
  },
};
