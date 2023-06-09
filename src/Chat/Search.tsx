import { useMutation } from "@apollo/client";
import { $user, updateConversation } from "../utils/store";
import { UserItem } from "../User/UserItem";
import { useStore } from "effector-react";
import { ConversationOperations } from "../graphql/operations/conversation";
import { SearchProps, LocalUser, ConversationData } from "../utils/types";
import { useNavigate } from "react-router-dom";

export const Search = ({ data }: SearchProps) => {
  const user: LocalUser = useStore($user);
  const [createConversation] = useMutation<ConversationData>(
    ConversationOperations.Mutations.createConversation
  );
  const navigate = useNavigate();
  const onClick = async (userId: string) => {
    const { data: conversationData } = await createConversation({
      variables: { receiver: userId },
    });
    console.log(conversationData);
    conversationData &&
      navigate(`/chat/${conversationData.createConversation.conversation.id}`);
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
