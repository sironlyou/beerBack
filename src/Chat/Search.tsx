import { useMutation } from "@apollo/client";
import { $user, updateConversation } from "../utils/store";
import { UserItem } from "./UserItem";
import { useStore } from "effector-react";
import { ConversationOperations } from "../graphql/operations/conversation";
import { SearchProps, User, ConversationData } from "../utils/types";

export const Search = ({ data }: SearchProps) => {
  const user: User = useStore($user);
  const [createConversation, { data: conversationData }] =
    useMutation<ConversationData>(
      ConversationOperations.Mutations.createConversation
    );
  const onClick = (userId: string) => {
    createConversation({ variables: { receiver: userId } });
    conversationData &&
      updateConversation({
        conversationid: conversationData?.createConversation.id,
        participantId: userId,
      });
  };
  const filteredData = data?.filter((p) => p.id !== user.id);
  return (
    <div>
      {filteredData?.map((user) => (
        <UserItem
          onClick={onClick}
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
};
