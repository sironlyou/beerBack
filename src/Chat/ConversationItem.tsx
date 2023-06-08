import { Box, Flex, Image } from "@chakra-ui/react";
import styles from "../styles/styles.module.css";
import { $user, updateConversation } from "../utils/store";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { MessageOperations } from "../graphql/operations/message";
import {
  ConversationItemProps,
  getLatestMessage,
  IUnreadCount,
  SubscriptionData,
  IMessage,
} from "../utils/types";

export const ConversationItem = ({
  conversation,
  userItem,
}: ConversationItemProps) => {
  const {
    data: latestMessage,
    // loading: postLoading,
    // error: postError,
    subscribeToMore,
  } = useQuery<getLatestMessage>(MessageOperations.Query.getLatestMessage, {
    variables: { conversationId: conversation.id },
    onError: ({ message }) => {
      console.log(message);
    },
  });
  const { data: unreadCount } = useQuery<IUnreadCount>(
    MessageOperations.Query.getUnreadCount,
    {
      variables: { conversationId: conversation.id },
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );
  const subscribeToMoreMessages = (conversationId: string) => {
    return subscribeToMore({
      document: MessageOperations.Subscription.messageSent,
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
      cursor={"pointer"}
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
        <Flex maxWidth={"60px"}>
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
              {latestMessage?.getLatestMessage.senderId ===
              user.id ? null : latestMessage?.getLatestMessage.readBy.includes(
                  user.id
                ) ? (
                <div>includes</div>
              ) : (
                <div>not includes</div>
              )}
              <Box>
                {moment(
                  new Date(
                    parseInt(
                      typeof latestMessage !== "undefined"
                        ? latestMessage?.getLatestMessage.createdAt
                        : ""
                    )
                  )
                ).format("HH:mm ")}
              </Box>
            </Flex>
          </Flex>
          <div className={styles.messageBottom}>
            <div>
              <span className={styles.messageText}>
                {latestMessage?.getLatestMessage.body}
              </span>
            </div>
            <div>
              {latestMessage?.getLatestMessage.senderId === user.id &&
              latestMessage?.getLatestMessage.readBy.includes(userItem.id) ? (
                <span>read</span>
              ) : (
                <span>unread</span>
              )}
            </div>
          </div>
        </Flex>
      </Flex>
    </Box>
  );
};
