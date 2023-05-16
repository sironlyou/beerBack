import { useMutation } from "@apollo/client";
import { updateUser } from "./utils/store";
import { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserOperations from "./graphql/operations/post";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    username: "",
    password: "",
    email: "",
    avatar: "",
  });
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setSelectedFile(event.target.files[0]);
  };

  const [createUsername, { loading }] = useMutation(
    UserOperations.Mutations.createUser
  );
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (typeof selectedFile === "undefined") {
        console.log("file error");
        return;
      }
      formData.append("selectedFile", selectedFile);
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/uploadFile",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const avatar = response.data.Location;
      console.log(avatar);

      const { data } = await createUsername({
        variables: {
          username: fields.username,
          email: fields.email,
          password: fields.password,
          avatar,
        },
      });
      const user = data.createUser;

      updateUser({
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        username: user.username,
      });
      navigate("/feed");
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Username successfully created");
    }
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="email"
          value={fields.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, email: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="username"
          value={fields.username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, username: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="password"
          value={fields.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, password: event.target.value })
          }
        />
        <input type="file" onChange={handleFileSelect} />
        <button type="submit" onClick={onSubmit}>
          submit
        </button>
      </form>
      <Link to={"/signin"}> signin?</Link>
    </>
  );
};
