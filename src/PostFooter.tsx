import { BeerLikeBtn } from "./assets/BeerLikeBtn";
import { ShareBtn } from "./assets/ShareBtn";
import styles from "./styles/styles.module.css";
interface PostFooterProps {
  likesCount: string;
}
export const PostFooter = ({ likesCount }: PostFooterProps) => {
  return (
    <div className={styles.postFooter}>
      <span className={styles.likeBtn}>
        <BeerLikeBtn />
        <span>{likesCount}</span>
      </span>
      <ShareBtn />
    </div>
  );
};
