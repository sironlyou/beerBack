import { Box } from "@chakra-ui/react";
import { ConversationItem } from "./ConversationItem";
import { useQuery } from "@apollo/client";
import { User, Message } from "./utils/store";
import { IMessage } from "./ChatWrapper";

export interface IConversation {
  id: string;
  messages: string[];
  participants: string[];
  visibleFor: string[];
}
export interface IConversationResponse {
  conversation: IConversation;
  userItem: User;
  message: Message;
  unreadCount: number;
}
export interface IConversationData {
  getConversations: IConversationResponse[];
}
interface IConversationData1 {
  getConversations?: IConversationResponse[];
}

export const ConversationsWrapper = ({
  getConversations,
}: IConversationData1) => {
  return (
    <Box
      border={"1px solid white"}
      width={"30%"}>
      {/* {JSON.stringify(conversationData)} */}
      {getConversations?.map((item: IConversationResponse) => (
        <ConversationItem
          key={item.conversation.id}
          conversation={item.conversation}
          userItem={item.userItem}
        />
      ))}
    </Box>
  );
};
