import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "effector-react";
import { $conversation } from "../utils/store";
import { MessageOperations } from "../graphql/operations/message";

export const ChatFooter = () => {
  const conversationId = useStore($conversation);

  const [messageBody, setMessageBody] = useState("");
  const [createMessage] = useMutation(
    MessageOperations.Mutations.createMessage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage({
      variables: {
        conversationId: conversationId.conversationid,
        body: messageBody,
        media: [""],
        receiverId: conversationId.participantId,
      },
    });
    setMessageBody("");
  };
  return (
    <div>
      <form
        style={{ display: "flex" }}
        onSubmit={handleSubmit}>
        <Button>+</Button>
        <Input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}></Input>
        <Button
          type='submit'
          onClick={(e) => handleSubmit}>
          send
        </Button>
      </form>
    </div>
  );
};
