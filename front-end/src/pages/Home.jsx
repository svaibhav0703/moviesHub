import React from "react";
import Nav from "./auth/Nav";
import Header from "./movies/Header";
import MoviesContainerPage from "./movies/MoviesContainerPage";
const Home = () => {
  return (
    <>
      <Header />

      <MoviesContainerPage />
      <Nav />
    </>
  );
};

export default Home;
