import React, { FC } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BUCKET_LIST } from "../../../query/BucketList";
import WishHeader from "../wishlist-header/WishHeader";
import { DELETE_WISH } from "../../../mutation/DeleteWish";
import { useNavigate } from "react-router-dom";
import "../wishlist.css";

interface Wish {
  id: string;
  title?: string;
}

interface Props {}

const WishList: FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_BUCKET_LIST);

  const navigate = useNavigate();

  const [deleteWish, { error: errorInDeleting, loading: deleteInProgress }] =
    useMutation(DELETE_WISH, {
      refetchQueries: [
        { query: GET_BUCKET_LIST }, // DocumentNode object parsed with gql
      ],
      onCompleted: () => {
        setTimeout(() => {
          alert("Wish deleted succesfully");
        }, 300);
      },
      onError: () => {
        console.error(errorInDeleting);
        alert("Failed to delete wish");
      },
    });

  const handleDelete = (id: string) => {
    if (!deleteInProgress) {
      deleteWish({
        variables: {
          id,
        },
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <>
      <WishHeader />
      <ul>
        {data.wishes?.map((wish: Wish, index: number) => (
          <li
            key={wish.id}
            className={"wish" + (index !== 0 ? " margin-top" : "")}
          >
            <p className="item" onClick={() => navigate(`/wishes/${wish.id}`)}>
              {wish.title}
            </p>
            <i
              className="fa fa-trash-o delete"
              aria-hidden="true"
              onClick={() => handleDelete(wish.id)}
            ></i>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WishList;
