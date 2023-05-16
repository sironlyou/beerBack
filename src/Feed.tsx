import { useStore } from "effector-react";
import { Post } from "./Post";
import { NewPost } from "./newPost";
import { $modal, updateModal } from "./utils/store";
import styles from "./styles/styles.module.css";
import { Button } from "@chakra-ui/react";
export const Feed = () => {
  const modal = useStore($modal);
  return (
    <>
      <div className={styles.buttonWrap}>
        <Button onClick={(e) => updateModal(true)}> new post</Button>
      </div>

      {modal && <NewPost />}
      <Post />
    </>
  );
};
