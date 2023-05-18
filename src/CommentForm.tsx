import { Button, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import PostOperations from "./graphql/operations/post";
import { useMutation } from "@apollo/client";
import { useStore } from "effector-react";
import { $reply, $user, commentReply, updateComment } from "./utils/store";
interface CommentFormProps {
  postId: string;
  author: string;
}
export const CommentForm = ({ postId, author }: CommentFormProps) => {
  const [value, setValue] = useState("");
  const user = useStore($user);
  const reply = useStore($reply);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.setSelectionRange(reply.length, reply.length);
  }, [reply]);
  const [newComment] = useMutation(PostOperations.Mutations.createComment, {
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
