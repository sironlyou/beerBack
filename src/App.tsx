import React from "react";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { SignUp } from "./Signup";
import { SignIn } from "./SignIn";
import UserOperations from "./graphql/operations/post";
import { updateUser } from "./utils/store";
import { Navigate, Route, Routes } from "react-router-dom";
import { Feed } from "./Feed";

function App() {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: user,
    // loading: postLoading,
    // error: postError,
  } = useQuery(UserOperations.Query.getUser, {
    onError: ({ message }) => {
      console.log(message);
      // navigate("/signin");
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

  return (
    <div className="App">
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
