import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import PostOperations from "./graphql/operations/post";
import { useMutation } from "@apollo/client";
import { useStore } from "effector-react";
import { $user } from "./utils/store";
interface CommentFormProps {
  postId: string;
  author: string;
}
export const CommentForm = ({ postId, author }: CommentFormProps) => {
  const [value, setValue] = useState("");
  const user = useStore($user);

  const [newComment] = useMutation(PostOperations.Mutations.createComment, {
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          getComments: (previous, { toReference }) => {
            return [
              ...previous,
              toReference(mutationResult.data.createComment),
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
        body: value,
        author: user.username,
      },
    });
  };
  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleClick}>reply</Button>
    </div>
  );
};
