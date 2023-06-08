import { Button, Input } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { useStore } from "effector-react";
import { $reply, $user, commentReply } from "../utils/store";
import { CommentOperations } from "../graphql/operations/comment";
import { CommentFormProps } from "../utils/types";

export const CommentForm = ({ postId, author }: CommentFormProps) => {
  const user = useStore($user);
  const reply = useStore($reply);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.setSelectionRange(reply.length, reply.length);
  }, [reply]);
  const [newComment] = useMutation(CommentOperations.Mutations.createComment, {
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          getComments: (previous, { toReference }) => {
            return [
              ...previous,
              toReference(mutationResult.data.createComment.comment),
            ];
          },
        },
      });
    },
  });
  const handleClick = async () => {
    await newComment({
      variables: {
        postId: postId,
        body: reply,
        author: user.id,
      },
    });
  };
  return (
    <div>
      <Input
        value={reply}
        ref={ref}
        onChange={(e) => commentReply(e.target.value)}
      />
      <Button onClick={handleClick}>reply</Button>
    </div>
  );
};
