import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { SignUp } from "./Signup";
import { SignIn } from "./SignIn";
import UserOperations from "./graphql/operations/post";
import { $user, updateUser } from "./utils/store";
import { useStore } from "effector-react";
import styles from "./styles/styles.module.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Feed } from "./Feed";
import { Button } from "@chakra-ui/react";

function App() {
  const me = useStore($user);
  const {
    data: user,
    // loading: postLoading,
    // error: postError,
  } = useQuery(UserOperations.Query.getUser, {
    onError: ({ message }) => {
      console.log(message);
      navigate("/signin");
    },
    onCompleted: (data) => {
      console.log(data);
      updateUser({
        avatar: data.getUser.avatar,
        email: data.getUser.email,
        id: data.getUser.id,
        username: data.getUser.username,
      });
    },
  });
  const navigate = useNavigate();
  const [logoutUser] = useMutation(UserOperations.Mutations.logoutUser);
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
    <div className="App">
      <header className={styles.header}>
        {me.username}
        <Button onClick={onLogout}>Logout</Button>
      </header>
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<Navigate to={"/feed"} />}></Route>

        <Route path="/feed" element={<Feed />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
