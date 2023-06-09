import { Box, Flex, Image } from "@chakra-ui/react";
import styles from "../styles/styles.module.css";
import { $user } from "../utils/store";
import { useStore } from "effector-react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { MessageOperations } from "../graphql/operations/message";
import { ConversationItemProps, IUnreadCount } from "../utils/types";
import { Navigate, useNavigate } from "react-router-dom";

export const ConversationItem = ({
  conversation,
  latestMessage,
  userItem,
}: ConversationItemProps) => {
  const { data: unreadCount } = useQuery<IUnreadCount>(
    MessageOperations.Query.getUnreadCount,
    {
      variables: { conversationId: conversation.id },
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  const navigate = useNavigate();

  const user = useStore($user);
  return (
    <Box
      cursor={"pointer"}
      height={70}
      onClick={(e) => navigate(`/chat/${conversation.id}`)}>
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
              {latestMessage?.senderId ===
              user.id ? null : latestMessage?.readBy.includes(user.id) ? (
                <div>includes</div>
              ) : (
                <div>not includes</div>
              )}
              {
                <Box>
                  {moment(
                    new Date(
                      parseInt(
                        typeof latestMessage !== "undefined"
                          ? latestMessage.createdAt
                          : ""
                      )
                    )
                  ).format("HH:mm ")}
                </Box>
              }
            </Flex>
          </Flex>
          <div className={styles.messageBottom}>
            <div>
              <span className={styles.messageText}>{latestMessage?.body}</span>
            </div>
            <div>
              {latestMessage?.senderId === user.id &&
              latestMessage?.readBy.includes(userItem.id) ? (
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
