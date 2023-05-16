import { BeerLikeBtn } from "./assets/BeerLikeBtn";
import { ShareBtn } from "./assets/ShareBtn";
import styles from "./styles/styles.module.css";
import PostOperations from "./graphql/operations/post";
import { useMutation } from "@apollo/client";
import { useStore } from "effector-react";
import { $user } from "./utils/store";
interface PostFooterProps {
  likes: [string];
  id: string;
}
export const PostFooter = ({ likes, id }: PostFooterProps) => {
  const [likedPost, { data: like }] = useMutation(
    PostOperations.Mutations.likedPost
  );
  const [dislikedPost, { data: dislike }] = useMutation(
    PostOperations.Mutations.dislikedPost
  );
  const user = useStore($user);

  const likedByMe = likes.includes(user.username);
  console.log(user.username);
  console.log(likedByMe);
  console.log(id);
  const handleLike = async () => {
    if (!likedByMe) {
      await likedPost({
        variables: { postId: id },
        onCompleted: ({ newData }) => {
          console.log(newData);
        },
      });
    } else {
      await dislikedPost({
        variables: { postId: id },
        onCompleted: ({ newData }) => {
          console.log(newData);
        },
      });
    }
  };
  return (
    <div className={styles.postFooter}>
      <span
        onClick={handleLike}
        className={likedByMe ? styles.likedBtn : styles.likeBtn}>
        <BeerLikeBtn />
        <span>{likes.length}</span>
      </span>
      <ShareBtn />
    </div>
  );
};
