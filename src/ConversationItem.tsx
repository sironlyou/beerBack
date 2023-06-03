import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { IConversation, IConversationResponse } from "./ConversationsWrapper";
import styles from "./styles/styles.module.css";
import PostOperations from "./graphql/operations/post";

import {
  $conversation,
  $user,
  Message,
  User,
  updateComment,
  updateConversation,
} from "./utils/store";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { IMessage, SubscriptionData } from "./ChatWrapper";
import { useQuery } from "@apollo/client";
interface getLatestMessage {
  getLatestMessage: IMessage;
}
interface IUnreadCount {
  getUnreadCount: number;
}
interface ConversationItemProps {
  conversation: IConversation;
  userItem: User;
}
export const ConversationItem = ({
  conversation,
  userItem,
}: ConversationItemProps) => {
  const {
    data: latestMessage,
    // loading: postLoading,
    // error: postError,
    subscribeToMore,
  } = useQuery<getLatestMessage>(PostOperations.Query.getLatestMessage, {
    variables: { conversationId: conversation.id },
    onError: ({ message }) => {
      console.log(message);
    },
  });
  const { data: unreadCount } = useQuery<IUnreadCount>(
    PostOperations.Query.getUnreadCount,
    {
      variables: { conversationId: conversation.id },
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );
  const subscribeToMoreMessages = (conversationId: string) => {
    return subscribeToMore({
      document: PostOperations.Subscription.messageSent,
      variables: {
        conversationId: conversation.id,
      },

      updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
        if (!subscriptionData.data) return prev;

        const newMessage: IMessage = subscriptionData.data.messageSent;
        console.log(newMessage);
        return Object.assign({}, prev, {
          getLatestMessage: newMessage,
        });
      },
    });
  };
  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages(conversation.id);

    return () => unsubscribe();
  }, [conversation.id]);
  const user = useStore($user);
  return (
    <Box
      height={70}
      onClick={(e) =>
        updateConversation({
          conversationid: conversation.id,
          participantId: userItem.id,
        })
      }>
      <Flex
        height={"100%"}
        padding={"5px"}>
        <Flex width={"29%"}>
          <Image
            borderRadius={50}
            src={userItem.avatar}></Image>
        </Flex>
        <Flex
          direction={"column"}
          width={"100%"}
          justifyContent={"space-between"}>
          <Flex justifyContent={"space-between"}>
            <div className={styles.usernameText}>{userItem.username}</div>
            <Flex>
              {/* <span>m</span> */}
              {/* <span>r</span> */}
              {latestMessage?.getLatestMessage.senderId === user.id ? (
                latestMessage?.getLatestMessage.readBy.includes(userItem.id) ? (
                  <span>read</span>
                ) : (
                  <span>unread</span>
                )
              ) : null}
              <Box>12-15</Box>
            </Flex>
          </Flex>
          <div className={styles.messageBottom}>
            <div>
              <span className={styles.messageText}>
                {latestMessage?.getLatestMessage.body}
              </span>
            </div>
            <div>
              {latestMessage?.getLatestMessage.senderId !== user.id &&
                !latestMessage?.getLatestMessage.readBy.includes(user.id) && (
                  <span>unread</span>
                )}
            </div>
          </div>
        </Flex>
      </Flex>

      {/* <div>id {conversation.id}</div>
           <div>messages{conversation.messages[conversation.messages.length-1]}</div>
           <div>participants{conversation.participants[conversation.participants.length-1]}</div>
           <div>visiblefor{conversation.visibleFor}</div> */}
    </Box>
  );
};
