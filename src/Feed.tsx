import { useStore } from "effector-react";
import { Post } from "./Post";
import { NewPost } from "./newPost";
import { $modal, updateModal } from "./utils/store";
import styles from "./styles/styles.module.css";
export const Feed = () => {
  const modal = useStore($modal);
  return (
    <>
      <div className={styles.buttonWrap}>
        {" "}
        <button className={styles.newPost} onClick={(e) => updateModal(true)}>
          new post
        </button>
      </div>

      {modal && <NewPost />}
      <Post />
    </>
  );
};
