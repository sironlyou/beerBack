import { useQuery } from "@apollo/client";
import PostOperations from "./graphql/operations/post";
import { Button } from "@chakra-ui/react";
import { CommentForm } from "./CommentForm";
import { useState } from "react";
interface CommentsProps {
  postId: string;
}
export const Comments = ({ postId }: CommentsProps) => {
  interface IComment {
    id: string;
    postId: string;
    body: string;
    createdAt: string;
    author: string;
  }
  interface ICommentData {
    getComments: IComment[];
  }
  const {
    data: commentData,
    // loading: postLoading,
    // error: postError,
  } = useQuery<ICommentData>(PostOperations.Query.getComments, {
    variables: {
      postId: postId,
    },
    onError: ({ message }) => {
      console.log(message);
    },
  });
  const [openForm, setOpenForm] = useState(false);
  return (
    <div>
      {commentData?.getComments.map(({ id, body, createdAt, author }) => (
        <div style={{ marginBottom: 5, backgroundColor: "green" }}>
          <div>{id}</div>
          <div>{body}</div>
          <div>{createdAt}</div>
          <div>{author}</div>
          <Button onClick={(e) => setOpenForm(true)}>reply</Button>
          {openForm && <CommentForm author={author} postId={postId} />}
        </div>
      ))}
    </div>
  );
};
