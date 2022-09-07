import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home/Home";
import NotFound from "./pages/Error/NotFound";
import StoredCourse from "./pages/Me/StoredCourse/StoredCourse";
import { AuthContext } from "./contexts/AuthContext";
import Auth from "./pages/views/Auth";

function App() {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/signup" element={<Auth authRoute="signup" />} />
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
