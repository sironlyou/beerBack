import { Box } from "@chakra-ui/react";
import { ChatWrapper, IMessage, SubscriptionData } from "./ChatWrapper";
import {
  ConversationsWrapper,
  IConversationData,
} from "./ConversationsWrapper";
import { useQuery } from "@apollo/client";
import PostOperations from "./graphql/operations/post";
import { $conversation, updateConversation } from "./utils/store";
import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
interface IMessageData {}
export const Chat = () => {
  const conversation = useStore($conversation);
  const {
    data: conversationData,
    // loading: postLoading,
    // error: postError,
    subscribeToMore,
  } = useQuery<IConversationData>(PostOperations.Query.getConversations, {
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
    <Box
      display={"flex"}
      margin={"0 auto"}
      marginTop={"10vh"}
      width={"80vw"}
      height={"80vh"}
      border={"1px solid white"}>
      <ConversationsWrapper
        getConversations={conversationData?.getConversations}
      />

      <ChatWrapper />
    </Box>
  );
};
