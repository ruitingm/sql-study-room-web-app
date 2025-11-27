import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../Nagivation/Navigation";
import Profile from "../Profile/Profile";
import Setting from "../Setting/Setting";
import AIChat from "../AIChat/AIChat";
import Report from "../Report/Report";
import AllProblems from "../Problem/AllProblems";
import ProblemEdit from "../Problem/ProblemEdit";
import AdminControl from "../AdminControl/AdminControl";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function MainPage() {
  const currentUser = useSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[5rem_1fr] gap-4 p-2 overflow-hidden">
      <div className="hidden md:block">
        <NavigationBar />
      </div>
      <div className="bg-stone-100 rounded-xl m-2 flex flex-col min-h-0 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="allproblems" />} />
          <Route path="settings" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="report" element={<Report />} />
          <Route path="allproblems" element={<AllProblems />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="problems/:pId" element={<ProblemEdit />} />
          {currentUser?.isAdmin && (
            <Route path="admin-control/*" element={<AdminControl />} />
          )}
        </Routes>
      </div>
    </div>
  );
}
