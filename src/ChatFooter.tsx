import { useMutation } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import PostOperations from "./graphql/operations/post";
import { useState } from "react";
import { useStore } from "effector-react";
import { $conversation } from "./utils/store";

export const ChatFooter = () => {
  const conversationId = useStore($conversation);

  const [messageBody, setMessageBody] = useState("");
  const [createMessage] = useMutation(PostOperations.Mutations.createMessage, {
    // optimisticResponse: {
    //   createMessage: true,
    // },
    // update(cache, mutationResult) {
    //   cache.modify({
    //     fields: {
    //       getMessages: (previous, { toReference }) => {
    //         return [
    //           ...previous.messages,
    //           toReference(mutationResult.data.createMessage.message),
    //         ];
    //       },
    //     },
    //   });
    // },
  }); // const newId = new ObjectID().toString();

  //   const { data, errors } = await createMessage({
  //     variables: {
  //       conversationId: conversationId.conversationid,
  //       body: messageBody,
  //       media: [''],
  //       receiverId: conversationId.participantId,
  //     },
  //     /**
  //      * Optimistically update UI
  //      */
  //     optimisticResponse: {
  //       sendMessage: true,
  //     },
  //     update: (cache) => {
  //       setMessageBody("");
  //       const existing = cache.readQuery({
  //         query: PostOperations.Query.getMessages,
  //         variables: { conversationId },
  //       })

  //       cache.writeQuery({
  //         query: MessageOperations.Query.messages,
  //         variables: { conversationId },
  //         data: {
  //           ...existing,
  //           messages: [
  //             {
  //               body: messageBody,
  //               senderId: session.user.id,
  //               conversationId,
  //               sender: {
  //                 id: session.user.id,
  //                 username: session.user.username,
  //               },
  //               createdAt: new Date(Date.now()),
  //               updatedAt: new Date(Date.now()),
  //             },
  //             ...existing.messages,
  //           ],
  //         },
  //       });
  //     },
  //   });

  //   if (!data?.sendMessage || errors) {
  //     throw new Error("Error sending message");
  //   }
  // } catch (error: any) {
  //   console.log("onSendMessage error", error);
  //   toast.error(error?.message);
  // }
  // };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Button>+</Button>
        <Input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}></Input>
        <Button
          onClick={(e) => {
            createMessage({
              variables: {
                conversationId: conversationId.conversationid,
                body: messageBody,
                media: [""],
                receiverId: conversationId.participantId,
              },
            });
          }}>
          send
        </Button>
      </div>
    </div>
  );
};
