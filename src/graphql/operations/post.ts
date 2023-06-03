/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export default {
  Mutations: {
    deleteMessageForMe: gql`
      mutation DeleteConversationForOne($idArr: [String]) {
        deleteMessageForMe(idArr: $idArr)
      }
    `,
    deleteConversationForOne: gql`
      mutation DeleteConversationForOne($conversationId: String) {
        deleteConversationForOne(conversationId: $conversationId)
      }
    `,
    deleteMessageCompletely: gql`
      mutation DeleteConversationForOne(
        $conversationId: String
        $idArr: [String]
      ) {
        deleteMessageCompletely(conversationId: $conversationId, idArr: $idArr)
      }
    `,
    editMessage: gql`
      mutation EditMessage(
        $editMessageId: String
        $body: String
        $media: [String]
      ) {
        editMessage(id: $editMessageId, body: $body, media: $media)
      }
    `,
    deleteConversationForEveryone: gql`
      mutation DeleteConversationForEveryone($conversationId: String) {
        deleteConversationForEveryone(conversationId: $conversationId)
      }
    `,
    createConversation: gql`
      mutation CreateConversation($receiver: String) {
        createConversation(receiver: $receiver) {
          id
          messages
          participants
          visibleFor
        }
      }
    `,
    createMessage: gql`
      mutation CreateMessage(
        $conversationId: String
        $body: String
        $media: [String]
        $receiverId: String
      ) {
        createMessage(
          conversationId: $conversationId
          body: $body
          media: $media
          receiverId: $receiverId
        ) {
          conversation {
            id
            messages
            participants
            visibleFor
          }
          message {
            body
            conversation
            createdAt
            id
            media
            readBy
            senderId
            updatedAt
            visibleFor
          }
        }
      }
    `,
    removeFromFriends: gql`
      mutation RemoveFromFriends($recieverUserId: String) {
        removeFromFriends(recieverUserId: $recieverUserId)
      }
    `,
    sendFriendRequest: gql`
      mutation SendFriendRequest($recieverUserId: String) {
        sendFriendRequest(recieverUserId: $recieverUserId)
      }
    `,
    acceptFriendRequest: gql`
      mutation AcceptFriendRequest($senderUserId: String) {
        acceptFriendRequest(senderUserId: $senderUserId)
      }
    `,
    cancelFriendRequest: gql`
      mutation CancelFriendRequest($recieverUserId: String) {
        cancelFriendRequest(recieverUserId: $recieverUserId)
      }
    `,
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
    getUnreadCount: gql`
      query Query($conversationId: String) {
        getUnreadCount(conversationId: $conversationId)
      }
    `,
    getLatestMessage: gql`
      query Query($conversationId: String) {
        getLatestMessage(conversationId: $conversationId) {
          body
          conversation
          createdAt
          id
          media
          readBy
          senderId
          visibleFor
          updatedAt
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
    getConversations: gql`
      query Query {
        getConversations {
          conversation {
            id
            participants
            visibleFor
            messages
          }
          userItem {
            avatar
            birthdate
            email
            incomingRequests
            id
            password
            sentRequests
            username
            karma
            friends
          }
        }
      }
    `,
    getMessages: gql`
      query GetMessages($conversationid: String, $participantId: String) {
        getMessages(
          conversationid: $conversationid
          participantId: $participantId
        ) {
          messages {
            body
            conversation
            createdAt
            id
            media
            readBy
            senderId
            updatedAt
            visibleFor
          }
          userInfo {
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
    getConversation: gql`
      query Query($conversationParticipants: [String]) {
        getConversation(conversationParticipants: $conversationParticipants) {
          id
          messages
          participants
          visibleFor
        }
      }
    `,
  },
  Subscription: {
    messageSent: gql`
      subscription MessageSent($conversationId: String) {
        messageSent(conversationId: $conversationId) {
          body
          conversation
          createdAt
          id
          media
          readBy
          senderId
          updatedAt
          visibleFor
        }
      }
    `,
    messagesDeleted: gql`
      subscription MessagesDeleted {
        messagesDeleted {
          conversation {
            messages
            id
            participants
            visibleFor
          }
          messages
        }
      }
    `,
    messagesDeletedForMe: gql`
      subscription MessagesDeletedForMe {
        messagesDeletedForMe {
          messages
          userId
        }
      }
    `,
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
    ncomingRequestCanceled: gql`
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
    messageEdited: gql`
      subscription MessageEdited {
        messageEdited {
          body
          conversation
          createdAt
          senderId
          readBy
          id
          media
          updatedAt
          visibleFor
        }
      }
    `,
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          id
          messages
          participants
          visibleFor
        }
      }
    `,
    conversationDeletedForEveryone: gql`
      subscription ConversationDeletedForEveryone {
        conversationDeletedForEveryone {
          conversation
          conversationId
        }
      }
    `,
    conversationDeletedForOne: gql`
      subscription ConversationDeletedForOne {
        conversationDeletedForOne {
          conversation
          userId
        }
      }
    `,
  },
};
