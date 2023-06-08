import { BeerLikeBtn } from "../assets/BeerLikeBtn";
import styles from "../styles/styles.module.css";
import { useMutation } from "@apollo/client";
import { useStore } from "effector-react";
import { $user } from "../utils/store";
import { PostOperations } from "../graphql/operations/post";
import { PostFooterProps } from "../utils/types";

export const PostFooter = ({
  likes,
  id,
  comments,
  setCommentsOpen,
  commentsOpen,
}: PostFooterProps) => {
  const [likedPost] = useMutation(PostOperations.Mutations.likedPost);
  const [dislikedPost] = useMutation(PostOperations.Mutations.dislikedPost);
  const user = useStore($user);

  const likedByMe = likes.includes(user.username);
  const handleLike = async () => {
    if (!likedByMe) {
      await likedPost({
        variables: { postId: id },
        onCompleted: ({ newData }) => {},
      });
    } else {
      await dislikedPost({
        variables: { postId: id },
        onCompleted: ({ newData }) => {},
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
      <span onClick={(e) => setCommentsOpen(!commentsOpen)}>
        {comments.length}
      </span>
      {/* <ShareBtn /> */}
    </div>
  );
};
