import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import styles from "./styles/styles.module.css";
// {
//   /* <form className={styles.post}>
//   <input
//     type="text"
//     onChange={(e) => setReview({ ...review, name: e.target.value })}
//     placeholder="название пива"
//   />
//   <input
//     type="text"
//     onChange={(e) => setReview({ ...review, rating: e.target.value })}
//     min={1}
//     max={5}
//     placeholder="рейтинг"
//   />
//   <input
//     type="text"
//     onChange={(e) => setReview({ ...review, price: e.target.value })}
//     placeholder="цена"
//   />
//   <input
//     type="text"
//     onChange={(e) => setReview({ ...review, shop: e.target.value })}
//     placeholder="магазин"
//   />
//   <input
//     type="text"
//     onChange={(e) => setReview({ ...review, availability: e.target.value })}
//     placeholder="доступность"
//   />
//   <input
//     type="text"
//     onChange={(e) => setReview({ ...review, comment: e.target.value })}
//     placeholder="отзыв"
//   />
// </form>; */
// }

import PostOperations from "./graphql/operations/post";
import axios from "axios";
import { useStore } from "effector-react";
import { $user, updateModal } from "./utils/store";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";

export const NewPost = () => {
  const user = useStore($user);
  const [selectedFile, setSelectedFile] = React.useState<Blob>();
  const [fields, setFields] = useState({
    origin: "",
    alcohol: "",
    value: "",
    price: "",
    taste: "",
    quality: "",
    alcoholHit: "",
    beerName: "",
    reviewBody: "",
    rating: "",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setSelectedFile(event.target.files[0]);
  };

  const [createPost, { data, loading, error }] = useMutation(
    PostOperations.Mutations.createPost
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (typeof selectedFile === "undefined") {
        console.log("file error");
        return;
      }
      formData.append("selectedFile", selectedFile);
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/uploadFile",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const avatar = response.data.Location;
      console.log(avatar);

      const { data } = await createPost({
        variables: {
          author: user.username,
          authorImg: user.avatar,
          beerName: fields.beerName,
          reviewBody: fields.reviewBody,
          alcohol: fields.alcohol,
          rating: fields.rating,
          price: fields.price,
          alcoholHit: fields.alcoholHit,
          quality: fields.quality,
          taste: fields.taste,
          image: avatar,
          origin: fields.origin,
          value: fields.value,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Username successfully created");
    }
  };
  const node = document.querySelector("#modal_root");
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.backDrop} onClick={(e) => updateModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="origin"
            value={fields.origin}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, origin: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="alcohol"
            value={fields.alcohol}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, alcohol: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="value"
            value={fields.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, value: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="price"
            value={fields.price}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, price: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="taste"
            value={fields.taste}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, taste: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="quality"
            value={fields.quality}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, quality: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="alcoholHit"
            value={fields.alcoholHit}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, alcoholHit: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="beerName"
            value={fields.beerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, beerName: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="reviewBody"
            value={fields.reviewBody}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, reviewBody: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="rating"
            value={fields.rating}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, rating: event.target.value })
            }
          />
          <input type="file" onChange={handleFileSelect} />
          <button type="submit" onClick={onSubmit}>
            submit
          </button>
        </form>
      </div>
    </div>,
    node
  );
};
