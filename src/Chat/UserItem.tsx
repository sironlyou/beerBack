import styles from "../styles/styles.module.css";
import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import { UserItemProps } from "../utils/types";

export const UserItem = ({ user, onClick }: UserItemProps) => {
  return (
    <Flex
      onClick={(e) => onClick(user.id)}
      padding={1}
      height={"70px"}>
      <Box maxWidth={"60px"}>
        <Image
          borderRadius={50}
          height={"100%"}
          src={user.avatar}
          alt=''
        />
      </Box>
      <Stack
        justifyContent={"center"}
        paddingLeft={2}>
        <span>{user.username}</span>
        <span style={{ margin: 0 }}>activity status</span>
      </Stack>
    </Flex>
  );
};
