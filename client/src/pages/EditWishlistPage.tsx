import React, { Component, ReactNode } from "react";
import EditWishForm from "../components/bucketlist/edit-wishlist/EditWishlistForm";

class EditWish extends Component {
  render(): ReactNode {
    return (
      <>
        <h2>Edit Wish</h2>
        <EditWishForm />
      </>
    );
  }
}

export default EditWish;
