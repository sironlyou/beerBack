import { useQuery } from "@apollo/client";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";
import { Break } from "./assets/Break";
import PostOperations from "./graphql/operations/post";
import { $user, User } from "./utils/store";
import { useStore } from "effector-react";
import { Box } from "@chakra-ui/react";
import { Comments } from "./Comments";
import { Dispatch, SetStateAction } from "react";
import { CommentForm } from "./CommentForm";

export interface IPost {
  id: string;
  author: string;
  origin: string;
  alcohol: string;
  value: string;
  price: string;
  taste: string;
  quality: string;
  alcoholHit: string;
  beerName: string;
  reviewBody: string;
  rating: string;
  image: string;
  likes: [string];
  createdAt: string;
  comments: [string];
}
interface PostProps {
  commentsOpen: boolean;
  setCommentsOpen: Dispatch<SetStateAction<boolean>>;
}
export const Post = ({ commentsOpen, setCommentsOpen }: PostProps) => {
  interface getPostsResponse {
    post: IPost;
    user: User;
  }
  interface IPostData {
    getPosts: getPostsResponse[];
  }

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
            bg="blackAlpha.300"
            borderRadius="10px"
            margin="auto"
            marginBottom={6}
            maxWidth="80%"
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
                <CommentForm author={account.username} postId={post.id} />
              </>
            )}
          </Box>
        ))}
    </>
  );
};
