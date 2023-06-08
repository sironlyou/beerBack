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
          id
          messages
          participants
          visibleFor
        }
      }
    `,
  },
  Query: {
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
