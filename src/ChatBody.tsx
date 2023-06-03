import { useStore } from "effector-react";
import { IMessage } from "./ChatWrapper";
import styles from "./styles/styles.module.css";
import { User, $user } from "./utils/store";
interface props {
  messages?: IMessage[];
}
export const ChatBody = ({ messages }: props) => {
  const user: User = useStore($user);

  return (
    <div className={styles.feed}>
      {messages?.map((message) => (
        <div
          className={
            message.senderId === user.id ? styles.messageItem : styles.myMessage
          }
          key={message.id}>
          <div className={styles.innerMessage}>
            <div>{message.body}</div>
            {message.createdAt === message.updatedAt ? (
              <div>{message.createdAt}</div>
            ) : (
              <div> {message.updatedAt}(edited.)</div>
            )}
            {message.senderId === user.id &&
            !message.readBy.includes(user.id) ? (
              <span>unread</span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
