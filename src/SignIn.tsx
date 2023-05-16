import toast from "react-hot-toast";
import { updateUser } from "./utils/store";
import UserOperations from "./graphql/operations/post";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
export const SignIn = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ login: "", password: "" });
  const [loginUser, { loading }] = useMutation(
    UserOperations.Mutations.loginUser
  );
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          login: fields.login,
          password: fields.password,
        },
      });
      const user = data.loginUser;
      updateUser({
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        username: user.username,
      });
      navigate("/feed");
      if (!data?.loginUser) {
        throw new Error();
      }

      toast.success("Username successfully created");
    } catch (error: any) {
      toast.error("There was an error");
    }
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="login"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, login: event.target.value })
          }
        />
        <input
          placeholder="password"
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, password: event.target.value })
          }
        />
        <button type="submit" onClick={onSubmit}>
          {" "}
          log in
        </button>
      </form>
      <Link to={"/signup"}>signup?</Link>
    </>
  );
};
