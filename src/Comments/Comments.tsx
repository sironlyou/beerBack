import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { CommentForm } from "./CommentForm";
import { $comment, commentReply, updateComment } from "../utils/store";
import styles from "../styles/styles.module.css";
import { useStore } from "effector-react";
import { format } from "../utils/functions";
import { CommentOperations } from "../graphql/operations/comment";
import { CommentsProps, ICommentData } from "../utils/types";

export const Comments = ({ postId }: CommentsProps) => {
  const {
    data: commentData,
    // loading: postLoading,
    // error: postError,
  } = useQuery<ICommentData>(CommentOperations.Query.getComments, {
    variables: {
      postId: postId,
    },
    onError: ({ message }) => {
      console.log(message);
    },
  });
  const openComment = useStore($comment);
  return (
    <div>
      {commentData?.getComments.map(({ comment, user }) => (
        <div
          key={comment.id}
          style={{ marginBottom: 5, backgroundColor: "green" }}>
          <div className={styles.postHeader}>
            <div className={styles.postInfo}>
              <img
                className={styles.avatar}
                src={user.avatar}
                alt={user.avatar}
              />
              <div className={styles.userPost}>
                <span>{user.username}</span>
                <span>created at{format(comment.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className={styles.commentBody}> comment body{comment.body}</div>
          <Button
            height={"19px"}
            onClick={(e) => {
              updateComment(comment.id);
              commentReply(user.username + ", ");
            }}>
            ответить
          </Button>
          {openComment === comment.id && (
            <CommentForm
              author={user.username}
              postId={postId}
            />
          )}
        </div>
      ))}
    </div>
  );
};
