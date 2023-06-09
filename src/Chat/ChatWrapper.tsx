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
import { useLocation } from "react-router-dom";
import { UserOperations } from "../graphql/operations/user";

export const ChatWrapper = () => {
  const user = useStore($user);

  const location = useLocation();
  const conversationid = location.pathname.substring(6);

  const {
    data: messageData,
    loading,
    subscribeToMore,
    // loading: postLoading,
    // error: postError,
  } = useQuery<GetMessagesData>(MessageOperations.Query.getMessages, {
    variables: {
      conversationid: conversationid,
    },
    onError: ({ message }) => {
      console.log(message);
    },
  });

  const {
    data,
    error,
    loading: participantLoading,
  } = useQuery(UserOperations.Query.getChatParticipant, {
    variables: { conversationId: conversationid },
  });

  return (
    <>
      {conversationid !== "" ? (
        <div className={styles.chatWrapper}>
          <ChatHeader
            userData={data?.getChatParticipant}
            loading={participantLoading}
          />
          <ChatBody
            loading={loading}
            messages={messageData?.getMessages}
          />
          <ChatFooter
            conversationId={conversationid}
            userData={data?.getChatParticipant}
          />
        </div>
      ) : (
        <div>no conersation selected</div>
      )}
    </>
  );
};
