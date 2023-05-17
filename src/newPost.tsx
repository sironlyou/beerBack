import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useCallback, useState } from "react";
import styles from "./styles/styles.module.css";

import PostOperations from "./graphql/operations/post";
import axios from "axios";
import { useStore } from "effector-react";
import { $user, updateModal } from "./utils/store";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

export const NewPost = () => {
  const user = useStore($user);
  const [selectedFile, setSelectedFile] = React.useState<File>();
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file); // Do something with the files
    console.log(selectedFile);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [createPost, { data, loading, error }] = useMutation(
    PostOperations.Mutations.createPost
  );
  const [newPost] = useMutation(PostOperations.Mutations.createPost, {
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          getPosts: (previous, { toReference }) => {
            return [...previous, toReference(mutationResult.data.createPost)];
          },
        },
      });
    },
  });

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

      const { data } = await newPost({
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
    updateModal(false);
  };
  const node = document.querySelector("#modal_root");
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.backDrop} onClick={(e) => updateModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form action="" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="origin"
            value={fields.origin}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, origin: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="alcohol"
            value={fields.alcohol}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, alcohol: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="value"
            value={fields.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, value: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="price"
            value={fields.price}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, price: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="taste"
            value={fields.taste}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, taste: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="quality"
            value={fields.quality}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, quality: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="alcoholHit"
            value={fields.alcoholHit}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, alcoholHit: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="beerName"
            value={fields.beerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, beerName: event.target.value })
            }
          />
          <Textarea
            placeholder="reviewBody"
            value={fields.reviewBody}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFields({ ...fields, reviewBody: event.target.value })
            }
          />

          <div
            className={isDragActive ? styles.dropzone : styles.dropzone}
            {...getRootProps()}>
            <input {...getInputProps()} />
            {typeof selectedFile === "undefined" ? (
              <span style={{ fontSize: "69px" }}>+</span>
            ) : (
              <img
                className={styles.selectedImg}
                src={URL.createObjectURL(selectedFile)}
                alt=""
              />
            )}
          </div>
          <Button margin="0 auto" type="submit" onClick={onSubmit}>
            submit
          </Button>
        </form>
      </div>
    </div>,
    node
  );
};
