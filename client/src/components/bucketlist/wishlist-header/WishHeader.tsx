import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../UI/button/Button";
import "../wishlist.css";

const WishList: FC = (props) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h2>My Bucket List</h2>
      <Button
        label={
          <>
            <i className="fa fa-plus" aria-hidden="true" /> Wish
          </>
        }
        onClick={() => {
          navigate("/add-wish");
        }}
        id="add_wish"
      />
    </div>
  );
};

export default WishList;
