import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import BucketList from "./pages/BucketListPage";
import AddWish from "./pages/AddWishlistPage";
import EditWish from "./pages/EditWishlistPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BucketList />} />
        <Route path="/add-wish" element={<AddWish />} />
        <Route path="/wishes/:id" element={<EditWish />} />
      </Routes>
    </div>
  );
}

export default App;
