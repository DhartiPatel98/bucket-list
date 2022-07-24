import React, { Component, ReactNode } from "react";
import AddWishForm from "../components/bucketlist/add-wishlist/AddWishlistForm";

class AddWish extends Component {
  render(): ReactNode {
    return (
      <>
        <h2>Add Wish</h2>
        <AddWishForm />
      </>
    );
  }
}

export default AddWish;
