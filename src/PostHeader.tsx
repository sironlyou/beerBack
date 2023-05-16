import styles from "./styles/styles.module.css";
interface PostHeaderProps {
  author: string;
  createdAt: string;
}
export const PostHeader = ({ author, createdAt }: PostHeaderProps) => {
  return (
    <div className={styles.postHeader}>
      <div className={styles.postInfo}>
        <img
          className={styles.avatar}
          src="https://storage.yandexcloud.net/boost.img/avatars/651b846d-1df6-4d3e-9694-2d81cd18c642.png"
          alt=""
        />
        <div className={styles.userPost}>
          <span>{author}</span>
          <span>5ч назад</span>
        </div>
      </div>
      <button>report</button>
    </div>
  );
};
