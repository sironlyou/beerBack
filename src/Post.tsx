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
}
export const Post = () => {
  interface IPostData {
    getPosts: IPost[];
  }
  // interface PostV2 {
  //   author: string;
  //   origin: string;
  //   alcohol: string;
  //   value: string;
  //   price: string;
  //   taste: string;
  //   quality: string;
  //   alcoholHit: string;
  //   beerName: string;
  //   reviewBody: string;
  //   rating: string;
  //   image: string;
  //   likesCount: string;
  //   createdAt: string;
  // }
  const {
    data: postData,
    // loading: postLoading,
    // error: postError,
  } = useQuery<IPostData>(PostOperations.Query.getPosts, {
    onError: ({ message }) => {
      console.log(message);
    },
  });
  console.log(postData);
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
          }) => (
            <div className={styles.post} key={id}>
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
              <PostFooter id={id} likes={likes} />
            </div>
          )
        )}
    </>
  );
};
