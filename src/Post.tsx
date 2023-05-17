import { useQuery } from "@apollo/client";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";
import { Break } from "./assets/Break";
import { NewPost } from "./newPost";
import styles from "./styles/styles.module.css";
import PostOperations from "./graphql/operations/post";
import { $modal, updateModal } from "./utils/store";
import { useStore } from "effector-react";
import { Box } from "@chakra-ui/react";
import { Comments } from "./Comments";
import { useState } from "react";
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
export const Post = () => {
  interface IPostData {
    getPosts: IPost[];
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
  const [commentsOpen, setCommentsOpen] = useState(false);
  const modal = useStore($modal);
  //   const posts: IPost[] = postData.getPosts;
  return (
    <>
      {postData &&
        postData.getPosts.map(
          ({
            alcohol,
            alcoholHit,
            author,
            beerName,
            createdAt,
            image,
            price,
            quality,
            rating,
            reviewBody,
            taste,
            id,
            likes,
            origin,
            value,
            comments,
          }) => (
            <Box
              bg="blackAlpha.300"
              borderRadius="10px"
              margin="auto"
              marginBottom={6}
              maxWidth="80%"
              key={id}>
              <PostHeader createdAt={createdAt} author={author} />
              <Break />
              <PostBody
                reviewBody={reviewBody}
                alcohol={alcohol}
                alcoholHit={alcoholHit}
                beerName={beerName}
                image={image}
                price={price}
                quality={quality}
                rating={rating}
                taste={taste}
                origin={origin}
                value={value}
              />
              <Break />
              <PostFooter
                id={id}
                likes={likes}
                comments={comments}
                setCommentsOpen={setCommentsOpen}
                commentsOpen={commentsOpen}
              />
              {commentsOpen && (
                <>
                  <Comments postId={id} />
                  <CommentForm author={author} postId={id} />
                </>
              )}
            </Box>
          )
        )}
    </>
  );
};
