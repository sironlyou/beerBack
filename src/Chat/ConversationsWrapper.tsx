import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ConversationItem } from "./ConversationItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";
import { Search } from "./Search";
import { UserOperations } from "../graphql/operations/user";
import {
  IConversationData,
  getUsersData,
  IConversationResponse,
} from "../utils/types";

export const ConversationsWrapper = ({
  getConversations,
}: IConversationData) => {
  const [userQuery, { data, loading }] = useLazyQuery<getUsersData>(
    UserOperations.Query.getUsers
  );
  const [searchActive, setSearchActive] = useState(false);
  const filteredConversations: IConversationResponse[] =
    getConversations.filter((convo) => {
      return convo.latestMessage !== null;
    });
  return (
    <Box
      border={"1px solid white"}
      width={"30%"}>
      <Flex>
        {searchActive && (
          <Button onClick={(e) => setSearchActive(false)}>back</Button>
        )}
        <Input
          placeholder='search'
          onClick={(e) => setSearchActive(true)}
          onChange={(e) => {
            userQuery({
              variables: {
                username: e.target.value.length !== 0 ? e.target.value : null,
              },
            });
          }}></Input>
      </Flex>
      {searchActive ? (
        <Search data={data?.getUsers} />
      ) : (
        <>
          {filteredConversations?.map((item: IConversationResponse) => (
            <ConversationItem
              key={item.conversation.id}
              conversation={item.conversation}
              userItem={item.userItem}
              latestMessage={item.latestMessage}
            />
          ))}
        </>
      )}
    </Box>
  );
};
