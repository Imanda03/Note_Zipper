import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./Pages/LandingPage/Landing";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import MyNotes from "./Pages/MyNotes/MyNotes";
import Register from "./Pages/RegisterPage/Register";
import LoginPage from "./Pages/LoginPage/LoginPage";
import CreateNote from "./Pages/CreateNote/CreateNote";
import SingleNote from "./Pages/CreateNote/SingleNote";
import Profile from "./Pages/Profile/Profile";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createNote" element={<CreateNote />} />
          <Route path="/note/:noteId" element={<SingleNote />} />
          <Route path="/myNotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
