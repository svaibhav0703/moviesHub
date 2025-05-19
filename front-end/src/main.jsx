import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import Register from "./pages/auth/register.jsx";
import Login from "./pages/auth/Login.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx";
import Profile from "./pages/auth/Profile.jsx";
import AdminRoute from "./pages/admin/AdminRoute.jsx";
import GenreList from "./pages/admin/GenreList.jsx";
import CreateMovies from "./pages/admin/CreateMovies.jsx";
import AdminMoviesList from "./pages/admin/AdminMoviesList.jsx";
import UpdateMovies from "./pages/admin/UpdateMovies.jsx";
import AllMovies from "./pages/movies/AllMovies.jsx";
import MovieDetails from "./pages/movies/MovieDetails.jsx";
import Allcomments from "./pages/admin/Allcomments.jsx";
import AdminDash from "./pages/admin/dashboard/AdminDash.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path="admin/movies/allgenre" element={<GenreList />}></Route>
          <Route path="admin/movies/create" element={<CreateMovies />}></Route>
          <Route path="admin/movies-list" element={<AdminMoviesList />}></Route>
          <Route
            path="admin/movies/update/:id"
            element={<UpdateMovies />}
          ></Route>
          <Route path="/admin/movies/comment" element={<Allcomments />} />
          <Route path="/admin/movies/dashboard" element={<AdminDash />} />
        </Route>
      </Routes>
      <ToastContainer position="top"></ToastContainer>
    </BrowserRouter>
  </Provider>
);
