import { useStore } from "effector-react";
import { Post } from "./Post";
import { NewPost } from "./newPost";
import { $modal, $user, updateModal, updateUser } from "./utils/store";
import styles from "./styles/styles.module.css";
import { Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import UserOperations from "./graphql/operations/post";
export const Feed = () => {
  const modal = useStore($modal);
  const me = useStore($user);
  const [logoutUser] = useMutation(UserOperations.Mutations.logoutUser);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logoutUser();
    navigate("/signup");
    updateUser({
      avatar: "",
      email: "",
      id: "",
      username: "",
    });
  };
  return (
    <>
      <header className={styles.header}>
        {me.username}
        <Button onClick={onLogout}>Logout</Button>
      </header>
      <div className={styles.buttonWrap}>
        <Button onClick={(e) => updateModal(true)}> new post</Button>
      </div>

      {modal && <NewPost />}
      <Post />
    </>
  );
};
