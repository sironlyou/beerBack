import { Button } from "@chakra-ui/react";
import styles from "../styles/styles.module.css";
import { SkeletonLoader } from "../utils/SkeletonLoader";
import { ChatHeaderProps } from "../utils/types";

export const ChatHeader = ({ userInfo, loading }: ChatHeaderProps) => {
  return (
    <div className={styles.chatHeader}>
      <div style={{ display: "flex" }}>
        {/* <Button
          onClick={(e) =>
            updateConversation({ conversationid: "", participantId: "" })
          }>
          back
        </Button> */}
        {loading && (
          <SkeletonLoader
            count={1}
            height='40px'
            width='100%'
          />
        )}
        {!loading && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              className={styles.chatAvatar}
              src={userInfo?.avatar}
            />
            <div>{userInfo?.username}</div>
          </div>
        )}
      </div>
    </div>
  );
};
