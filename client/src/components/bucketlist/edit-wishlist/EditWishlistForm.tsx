import React, { FC, useEffect, useState } from "react";
import Button from "../../../UI/button/Button";
import Input from "../../../UI/input-text/Input";
import TextArea from "../../../UI/textarea/TextArea";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_WISH } from "../../../mutation/EditWish";
import { GET_WISH } from "../../../query/Wish";
import { useNavigate, useParams } from "react-router-dom";
import "../wishlist.css";

interface ChecklistType {
  id: string;
  item: string;
  isFullfilled: boolean;
}

const EditWishlistForm: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checklist, setChecklist] = useState<Array<ChecklistType>>([]);
  const [deletedIds, setDeletedId] = useState<Array<string>>([]);

  const navigate = useNavigate();
  const params = useParams();

  const { loading: fetching } = useQuery(GET_WISH, {
    onCompleted(data) {
      setTitle(data?.wish?.title || "");
      setDescription(data?.wish?.description || "");
      setChecklist(
        data?.wish?.checklist?.map((item: ChecklistType) => ({
          id: item.id,
          item: item.item,
          isFullfilled: item.isFullfilled,
        })) || []
      );
    },
    variables: {
      id: params.id,
    },
    onError(error) {
      console.log(error);
      navigate("/");
    },
  });

  const [editWish, { data, error, loading }] = useMutation(EDIT_WISH, {
    onCompleted: () => {
      console.log(data);
      navigate("/");
    },
    onError: () => {
      console.error(error);
      alert("Failed to update wish");
    },
  });

  useEffect(() => {
    validateForm();
  }, [title]);

  const handleForm = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log(checklist);
      editWish({
        variables: {
          id: params.id,
          title,
          description,
          deletedIds,
          checklist,
        },
      });
    }
  };

  const validateForm = () => {
    return !!title;
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

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
        <>
          <label>Checklist</label>
          <ul>
            {checklist.map((item, index) => (
              <li
                key={item.id}
                className={"wish" + (index !== 0 ? " margin-top" : "")}
              >
                <div className="check-item">{item.item}</div>
                <i
                  className="fa fa-trash-o delete"
                  aria-hidden="true"
                  onClick={() => {
                    const arr = [...deletedIds];
                    arr.push(item.id);
                    setDeletedId(arr);

                    const list = [...checklist];
                    list.splice(index, 1);
                    setChecklist(list);
                  }}
                ></i>
              </li>
            ))}
          </ul>
        </>
        <Button
          id="edit-wish"
          label="Update"
          onClick={handleForm}
          disabled={loading}
        />
      </form>
    </>
  );
};

export default EditWishlistForm;
