import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/layout/LoginPage";
import HomePage from "@/pages/layout/HomePage";
import ExamListPage from "@/pages/layout/ExamListPage";
import ExamDetailPage from "@/pages/layout/ExamDetailPage";
import { useExamStore } from "@/store/examStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useExamStore((state) => state.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home/exam-list" />} />
          <Route path="exam-list" element={<ExamListPage />} />
          <Route path="exam-detail/:id" element={<ExamDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}