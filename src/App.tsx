import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import MainPage from "./MainPage/MainPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProblems } from "./Problem/problemSlice";
import { parseProblems } from "./Problem/problemParser";
import { setSolutions } from "./Problem/solutionSlice";
import solutionJson from "./Database/solution.json";
import { setUsers } from "./Profile/userSlice";
import userJson from "./Database/user.json";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProblems(parseProblems()));
    dispatch(setSolutions(solutionJson));
    dispatch(setUsers(userJson));
  }, []);
  return (
    <div id="sql-study-room" className="bg-stone-50 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/main/*" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
