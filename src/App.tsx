import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { SignUp } from "./Auth/Signup";
import { SignIn } from "./Auth/SignIn";
import { updateUser } from "./utils/store";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Feed } from "./Feed/Feed";
import { Chat } from "./Chat/Chat";
import { Button } from "@chakra-ui/react";
import styles from "./styles/styles.module.css";
import { UserPage } from "./UserPage/UserPage";
import { UserOperations } from "./graphql/operations/user";

function App() {
  const [logoutUser] = useMutation(UserOperations.Mutations.logoutUser);

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
  const onLogout = async () => {
    await logoutUser();
    navigate("/signin");
    updateUser({
      avatar: "",
      email: "",
      id: "",
      username: "",
    });
  };
  const navigate = useNavigate();
  return (
    <div className='App'>
      <header
        // style={{ position: "fixed" }}
        className={styles.header}>
        <Button onClick={(e) => navigate("/chat")}>chat</Button>
        <Button onClick={(e) => navigate("/feed")}>feed</Button>
        <Button onClick={onLogout}>Logout</Button>
      </header>
      <Routes>
        <Route
          path='/signin'
          element={<SignIn />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/user/*'
          element={<UserPage />}
        />
        <Route
          path='/'
          element={<Navigate to={"/feed"} />}
        />
        <Route
          path='/feed'
          element={<Feed />}
        />
        <Route
          path='/chat'
          element={<Chat />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
