import React, { FC, useEffect, useState } from "react";
import Button from "../../../UI/button/Button";
import Input from "../../../UI/input-text/Input";
import TextArea from "../../../UI/textarea/TextArea";
import { useMutation } from "@apollo/client";
import { ADD_WISH } from "../../../mutation/AddWish";
import { GET_BUCKET_LIST } from "../../../query/BucketList";
import "../wishlist.css";

const AddWishForm: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(false);

  const [addWish, { data, loading, error, reset }] = useMutation(ADD_WISH, {
    refetchQueries: [
      { query: GET_BUCKET_LIST }, // DocumentNode object parsed with gql
    ],
    onCompleted: () => {
      console.log(data);
      reset();
      resetForm();
    },
    onError: () => {
      console.error(error);
      alert("Failed to add wish");
    },
  });

  useEffect(() => {
    validateForm();
  }, [title]);

  const validateForm = () => {
    let isValid = true;

    if (!title) {
      isValid = false;
    }

    setValid(isValid);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setValid(false);
  };

  return (
    <>
      <form>
        <Input
          label="Title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          id="add-wish"
          label="Add"
          onClick={() => {
            addWish({
              variables: {
                title,
                description,
              },
            });
          }}
          disabled={loading || !isValid}
        />
      </form>
    </>
  );
};

export default AddWishForm;
