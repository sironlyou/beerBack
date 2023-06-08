import { Link } from "react-router-dom";
import styles from "../styles/styles.module.css";
import { format } from "../utils/functions";
import { PostHeaderProps } from "../utils/types";

export const PostHeader = ({
  avatar,
  username,
  createdAt,
}: PostHeaderProps) => {
  return (
    <div className={styles.postHeader}>
      <div className={styles.postInfo}>
        <img
          className={styles.avatar}
          src={avatar}
          alt=''
        />
        <div className={styles.userPost}>
          <Link to={`/user/${username}`}>{username}</Link>
          <span>{format(createdAt)}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      {/* <button>report</button> */}
    </div>
  );
};
