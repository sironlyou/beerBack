/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export const ConversationOperations = {
  Mutations: {
    deleteConversationForEveryone: gql`
      mutation DeleteConversationForEveryone($conversationId: String) {
        deleteConversationForEveryone(conversationId: $conversationId)
      }
    `,
    createConversation: gql`
      mutation CreateConversation($receiver: String) {
        createConversation(receiver: $receiver) {
          conversation {
            visibleFor
            id
            messages
            participants
          }

          userItem {
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
  },
  Query: {
    getAllConversationIds: gql`
      query Query {
        getAllConversationIds
      }
    `,
    getConversationId: gql`
      query GetConversationId($participantId: String) {
        getConversationId(participantId: $participantId) {
          id
          messages
          participants
          visibleFor
        }
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

    getConversations: gql`
      query GetConversations {
        getConversations {
          conversation {
            id
            messages
            participants
            visibleFor
          }
          latestMessage {
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
          userItem {
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
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          conversation {
            id
            messages
            participants
            visibleFor
          }

          userItem {
            avatar
            birthdate
            email
            friends
            id
            karma
            password
            sentRequests
            username
            incomingRequests
          }
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
