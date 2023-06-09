import { useStore } from "effector-react";
import styles from "../styles/styles.module.css";
import { $user, $conversation } from "../utils/store";
import { useEffect, useRef } from "react";
import { SkeletonLoader } from "../utils/SkeletonLoader";
import { Stack } from "@chakra-ui/react";
import { MessageItem } from "./MessageItem";
import { ChatBodyProps, LocalUser } from "../utils/types";

export const ChatBody = ({ messages, loading }: ChatBodyProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!messagesEndRef.current || !messages) return;
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef.current, messages]);

  return (
    <div className={styles.feed}>
      {loading && (
        <Stack
          spacing={4}
          px={4}>
          <SkeletonLoader
            count={8}
            height='60px'
            width='100%'
          />
        </Stack>
      )}
      <div>
        {messages?.map((message) => (
          <MessageItem
            messagesEndRef={messagesEndRef}
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </div>
  );
};
