import { Button } from "@chakra-ui/react";
import styles from "./styles/styles.module.css";
import { useQuery } from "@apollo/client";
import { User } from "./utils/store";
interface props {
  userInfo?: User;
}
export const ChatHeader = ({ userInfo }: props) => {
  return (
    <div className={styles.chatHeader}>
      <div style={{ display: "flex" }}>
        <Button>back</Button>
        <img
          className={styles.chatAvatar}
          src={userInfo?.avatar}
        />
        <div>{userInfo?.username}</div>
      </div>
    </div>
  );
};
