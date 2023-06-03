import toast from "react-hot-toast";
import { updateUser } from "./utils/store";
import UserOperations from "./graphql/operations/post";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Input, Text } from "@chakra-ui/react";

export const SignIn = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ login: "", password: "" });
  const [loginUser] = useMutation(UserOperations.Mutations.loginUser);
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
      localStorage.setItem('userId',user.id)
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
      <Box margin="0 auto" marginTop="22vh" width="300px" maxWidth="50%">
        <form action="" onSubmit={onSubmit}>
          <Input
            mb={5}
            type="text"
            placeholder="login"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, login: event.target.value })
            }
          />
          <Input
            mb={5}
            placeholder="password"
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, password: event.target.value })
            }
          />
          <Button mb={4} width="100%" type="submit" onClick={onSubmit}>
            log in
          </Button>
        </form>

        <Box display="flex" margin="0 auto" justifyContent={"space-between"}>
          <Text fontSize={10} mr={8}>
            {" "}
            Already have an account?
          </Text>

          <Link to={"/signup"}>
            <Text color={"#2D3748"} fontSize={10}>
              sign up
            </Text>
          </Link>
        </Box>
      </Box>
    </>
  );
};
