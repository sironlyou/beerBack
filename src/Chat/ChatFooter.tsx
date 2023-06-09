import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { MessageOperations } from "../graphql/operations/message";
import { ChatFooterProps, User } from "../utils/types";

export const ChatFooter = ({ userData, conversationId }: ChatFooterProps) => {
  const [messageBody, setMessageBody] = useState("");
  const [createMessage] = useMutation(
    MessageOperations.Mutations.createMessage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage({
      variables: {
        conversationId: conversationId,
        body: messageBody,
        media: [""],
        receiverId: userData?.id,
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
