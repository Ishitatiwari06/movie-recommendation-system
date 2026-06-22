import {
  BrowserRouter, //main router for application
  Routes, //contains hold of all routes
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>
        <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/watchlist" element={<Watchlist />} />

        <Route
            path="/watchlist"
            element={
                <ProtectedRoute>
                    <Watchlist />
                </ProtectedRoute>
            }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;