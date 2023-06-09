import styles from "../styles/styles.module.css";
import { useStore } from "effector-react";
import moment from "moment";
import { $user } from "../utils/store";
import { MessageItemProps, LocalUser } from "../utils/types";

export const MessageItem = ({ messagesEndRef, message }: MessageItemProps) => {
  const user: LocalUser = useStore($user);

  return (
    <div
      ref={messagesEndRef}
      className={
        message.senderId === user.id ? styles.myMessageItem : styles.messageItem
      }
      key={message.id}>
      <div
        className={
          message.senderId === user.id
            ? styles.myMessage
            : styles.receivedMessage
        }>
        <div className={styles.messageBody}>{message.body}</div>
        {message.createdAt === message.updatedAt ? (
          <div className={styles.messageTime}>
            {moment(new Date(parseInt(message.createdAt))).format("HH:mm ")}
          </div>
        ) : (
          <div className={styles.messageTime}>
            {moment(new Date(parseInt(message.updatedAt))).format("HH:mm ")}
            (edited.)
          </div>
        )}
        {message.senderId === user.id && !message.readBy.includes(user.id) ? (
          <span>unread</span>
        ) : null}
      </div>
    </div>
  );
};
