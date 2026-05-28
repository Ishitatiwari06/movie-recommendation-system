import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>
        <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/watchlist" element={<Watchlist />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;