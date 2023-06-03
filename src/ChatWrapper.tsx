import { Box } from "@chakra-ui/react";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import styles from "./styles/styles.module.css";
import PostOperations from "./graphql/operations/post";
import { $conversation, $user, User } from "./utils/store";
import { useStore } from "effector-react";
import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import { userInfo } from "os";
export interface SubscriptionData {
  subscriptionData: {
    data: {
      messageSent: IMessage;
    };
  };
}
export interface IMessage {
  body: string;
  conversation: string;
  createdAt: string;

  id: string;

  media: [string];
  readBy: [string];
  senderId: string;
  updatedAt: string;
  visibleFor: [string];
}
export const ChatWrapper = () => {
  const user = useStore($user);

  const conversationId = useStore($conversation);
  const {
    data: messageData,
    subscribeToMore,
    // loading: postLoading,
    // error: postError,
  } = useQuery<GetMessagesData>(PostOperations.Query.getMessages, {
    variables: {
      conversationid: conversationId.conversationid,
      participantId: conversationId.participantId,
    },
    onError: ({ message }) => {
      console.log(message);
    },
  });

  const subscribeToMoreMessages = (conversationId: string) => {
    return subscribeToMore({
      document: PostOperations.Subscription.messageSent,
      variables: {
        conversationId: conversationId,
      },

      updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
        if (!subscriptionData.data) return prev;

        const newMessage: IMessage = subscriptionData.data.messageSent;
        console.log(newMessage);
        return Object.assign({}, prev, {
          getMessages: {
            messages: [...prev.getMessages.messages, newMessage],
            userInfo: prev.getMessages.userInfo,
          },
        });
      },
    });
  };
  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages(conversationId.conversationid);

    return () => unsubscribe();
  }, [conversationId]);
  interface GetMessagesData {
    getMessages: IMessageData;
  }
  interface IMessageData {
    messages: IMessage[];
    userInfo: User;
  }
  return (
    <div className={styles.chatWrapper}>
      <ChatHeader userInfo={messageData?.getMessages.userInfo} />
      <ChatBody messages={messageData?.getMessages.messages} />
      <ChatFooter />
    </div>
  );
};
