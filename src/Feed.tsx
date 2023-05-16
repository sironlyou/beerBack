import { useStore } from "effector-react";
import { Post } from "./Post";
import { NewPost } from "./newPost";
import { $modal, updateModal } from "./utils/store";

export const Feed = () => {
  const modal = useStore($modal);
  return (
    <>
      <button onClick={(e) => updateModal(true)}>new post</button>
      {modal && <NewPost />}
      <Post />
    </>
  );
};
