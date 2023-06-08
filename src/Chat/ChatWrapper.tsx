import { Box } from "@chakra-ui/react";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import styles from "../styles/styles.module.css";
import { $conversation, $user } from "../utils/store";
import { useStore } from "effector-react";
import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import { MessageOperations } from "../graphql/operations/message";
import { GetMessagesData, IMessage, SubscriptionData } from "../utils/types";

export const ChatWrapper = () => {
  const user = useStore($user);

  const conversationId = useStore($conversation);
  const {
    data: messageData,
    loading,
    subscribeToMore,
    // loading: postLoading,
    // error: postError,
  } = useQuery<GetMessagesData>(MessageOperations.Query.getMessages, {
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
      document: MessageOperations.Subscription.messageSent,
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

  const conversation = useStore($conversation);
  return (
    <>
      {conversation.conversationid !== "" ? (
        <div className={styles.chatWrapper}>
          <ChatHeader
            loading={loading}
            userInfo={messageData?.getMessages.userInfo}
          />
          <ChatBody
            loading={loading}
            messages={messageData?.getMessages.messages}
          />
          <ChatFooter />
        </div>
      ) : (
        <div>no chat selected</div>
      )}
    </>
  );
};
