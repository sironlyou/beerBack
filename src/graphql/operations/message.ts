/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export const MessageOperations = {
  Mutations: {
    deleteMessageForMe: gql`
      mutation DeleteConversationForOne($idArr: [String]) {
        deleteMessageForMe(idArr: $idArr)
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
  },
};
