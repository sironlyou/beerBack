import { Box, Button } from "@chakra-ui/react";
import { ChatWrapper } from "./ChatWrapper";
import styles from "../styles/styles.module.css";

import { ConversationsWrapper } from "./ConversationsWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { $conversation, updateConversation, updateUser } from "../utils/store";
import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ConversationOperations } from "../graphql/operations/conversation";
import { UserOperations } from "../graphql/operations/user";
import { MessageOperations } from "../graphql/operations/message";
import { IConversationData, IMessage, SubscriptionData } from "../utils/types";
export const Chat = () => {
  const conversation = useStore($conversation);
  const {
    data: conversationData,
    // loading: postLoading,
    // error: postError,
    subscribeToMore,
  } = useQuery<IConversationData>(
    ConversationOperations.Query.getConversations,
    {
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );
  const [logoutUser] = useMutation(UserOperations.Mutations.logoutUser);
  const navigate = useNavigate();

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
        return conversationId === newMessage.conversation
          ? Object.assign({}, prev, {
              getConversations: {
                message: newMessage,
              },
            })
          : prev;
      },
    });
  };
  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages(conversation.conversationid);

    return () => unsubscribe();
  }, [conversation.conversationid]);
  const onClick = (id: string) => {
    console.log(id);
  };
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        display={"flex"}
        margin={"0 auto"}
        marginTop={"10vh"}
        width={"80vw"}
        height={"80vh"}
        border={"1px solid white"}>
        <ConversationsWrapper
          getConversations={conversationData?.getConversations || []}
        />

        <ChatWrapper />
      </Box>
    </>
  );
};
