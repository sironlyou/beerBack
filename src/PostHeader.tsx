import styles from "./styles/styles.module.css";
interface PostHeaderProps {
  avatar: string;
  username: string;
  createdAt: string;
}
export const PostHeader = ({
  avatar,
  username,
  createdAt,
}: PostHeaderProps) => {
  return (
    <div className={styles.postHeader}>
      <div className={styles.postInfo}>
        <img className={styles.avatar} src={avatar} alt="" />
        <div className={styles.userPost}>
          <span>{username}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      {/* <button>report</button> */}
    </div>
  );
};
