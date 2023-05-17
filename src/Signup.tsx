import { useMutation } from "@apollo/client";
import { updateUser } from "./utils/store";
import { FormEvent, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserOperations from "./graphql/operations/post";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Input, Link as ChakraLink, Text } from "@chakra-ui/react";
import Dropzone, { useDropzone } from "react-dropzone";
import styles from "./styles/styles.module.css";
export const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file); // Do something with the files
    console.log(selectedFile);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [fields, setFields] = useState({
    username: "",
    password: "",
    email: "",
    avatar: "",
  });
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
      <Box
        width={300}
        maxWidth={"50%"}
        margin="0 auto"
        marginTop={"8vh"}
        marginBottom="8">
        <form action="" onSubmit={onSubmit}>
          <div
            className={isDragActive ? styles.dropzone : styles.dropzone}
            {...getRootProps()}>
            <input {...getInputProps()} />
            {typeof selectedFile === "undefined" ? (
              <span style={{ fontSize: "69px" }}>+</span>
            ) : (
              <img
                className={styles.selectedImg}
                src={URL.createObjectURL(selectedFile)}
                alt=""
              />
            )}
          </div>
          <Input
            mb={2}
            type="text"
            placeholder="email"
            value={fields.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, email: event.target.value })
            }
          />
          <Input
            mb={2}
            type="text"
            placeholder="username"
            value={fields.username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, username: event.target.value })
            }
          />
          <Input
            mb={2}
            type="text"
            placeholder="password"
            value={fields.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, password: event.target.value })
            }
          />
          {/* <Input type="file" onChange={handleFileSelect} /> */}
          <Button mb={2} width={"100%"} type="submit" onClick={onSubmit}>
            submit
          </Button>
        </form>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text fontSize={10}>Dont have an account? </Text>
          {/* <ChakraLink href="/signin"> */}
          <Link to={"/signin"}>
            <Text fontSize={10}>sign in</Text>
          </Link>
          {/* </ChakraLink> */}
        </Box>
      </Box>
    </>
  );
};
