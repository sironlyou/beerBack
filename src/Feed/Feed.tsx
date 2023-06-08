import { useStore } from "effector-react";
import { NewPost } from "./newPost";
import { $modal, $user, updateModal, updateUser } from "../utils/store";
import styles from "../styles/styles.module.css";
import { Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Post } from "./Post";
export const Feed = () => {
  const modal = useStore($modal);
  const me = useStore($user);
  const navigate = useNavigate();
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <>
      <div className={styles.buttonWrap}>
        <Button onClick={(e) => updateModal(true)}> new post</Button>
      </div>

      {modal && <NewPost />}
      <Post
        commentsOpen={commentsOpen}
        setCommentsOpen={setCommentsOpen}
      />
    </>
  );
};
