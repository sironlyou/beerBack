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
export const Chat = ({ getConversations }: IConversationData) => {
  return (
    <>
      <Box
        display={"flex"}
        margin={"0 auto"}
        marginTop={"10vh"}
        width={"80vw"}
        height={"80vh"}
        border={"1px solid white"}>
        <ConversationsWrapper getConversations={getConversations} />

        <ChatWrapper />
      </Box>
    </>
  );
};
