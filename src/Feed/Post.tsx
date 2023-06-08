import { useQuery } from "@apollo/client";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";
import { Break } from "../assets/Break";
import { $user } from "../utils/store";
import { useStore } from "effector-react";
import { Box } from "@chakra-ui/react";
import { Comments } from "../Comments/Comments";
import { Dispatch, SetStateAction } from "react";
import { CommentForm } from "../Comments/CommentForm";
import { PostOperations } from "../graphql/operations/post";
import { IPostData, PostProps } from "../utils/types";

export const Post = ({ commentsOpen, setCommentsOpen }: PostProps) => {
  const {
    data: postData,
    // loading: postLoading,
    // error: postError,
  } = useQuery<IPostData>(PostOperations.Query.getPosts, {
    onError: ({ message }) => {
      console.log(message);
    },
  });
  const account = useStore($user);
  return (
    <>
      {postData &&
        postData.getPosts.map(({ post, user }) => (
          <Box
            bg='blackAlpha.300'
            borderRadius='10px'
            margin='auto'
            marginBottom={6}
            maxWidth='80%'
            key={post.id}>
            <PostHeader
              createdAt={post.createdAt}
              avatar={user.avatar}
              username={user.username}
            />
            <Break />
            <PostBody
              reviewBody={post.reviewBody}
              alcohol={post.alcohol}
              alcoholHit={post.alcoholHit}
              beerName={post.beerName}
              image={post.image}
              price={post.price}
              quality={post.quality}
              rating={post.rating}
              taste={post.taste}
              origin={post.origin}
              value={post.value}
            />
            <Break />
            <PostFooter
              id={post.id}
              likes={post.likes}
              comments={post.comments}
              setCommentsOpen={setCommentsOpen}
              commentsOpen={commentsOpen}
            />
            {commentsOpen && (
              <>
                <Comments postId={post.id} />
                <CommentForm
                  author={account.username}
                  postId={post.id}
                />
              </>
            )}
          </Box>
        ))}
    </>
  );
};
