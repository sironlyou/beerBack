import { FriendItemProps } from "../utils/types";
import styles from "../styles/styles.module.css";
import { useNavigate } from "react-router-dom";
export const FriendItem = ({ user }: FriendItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => navigate(`/user/${user.username}`)}
      className={styles.friendItemWrap}>
      <img
        className={styles.FriendItemAvatar}
        src={user.avatar}
      />
      <span className={styles.FriendItemName}>{user.username}</span>
    </div>
  );
};
