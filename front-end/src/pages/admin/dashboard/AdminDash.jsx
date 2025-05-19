import React from "react";
import TopBar from "./TopBar";
import Main from "./Main";
import Nav from "../../auth/Nav.jsx";
const AdminDash = () => {
  return (
    <div>
      <TopBar />
      <Main />
      <Nav />
    </div>
  );
};

export default AdminDash;
