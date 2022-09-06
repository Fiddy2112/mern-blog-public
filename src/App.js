import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home/Home";
import NotFound from "./pages/Error/NotFound";
import StoredCourse from "./pages/Me/StoredCourse/StoredCourse";
import { AuthContext } from "./contexts/AuthContext";
import Auth from "./pages/views/Auth";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated, authLoading } = authState;

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route
          path="/me/stored-course"
          element={
            isAuthenticated ? (
              <StoredCourse />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
