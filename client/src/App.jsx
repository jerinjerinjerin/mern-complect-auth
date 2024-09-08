import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/email-verify" replace />;
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticateUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const {
    isCheckingAuth,
    checkAuth,
    isAuthenticated,
    user
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900
    to-emerald-900 flex items-center justify-center relative
    overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-green-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-green-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <RedirectAuthenticateUser>
              <SignUpPage />
            </RedirectAuthenticateUser>
          } />
          <Route path="/login" element={
            <RedirectAuthenticateUser>
              <LoginPage />
            </RedirectAuthenticateUser>
          } />
          <Route path="/email-verify" element={<EmailVerificationPage />} />
          <Route path="/forget-password" element={<RedirectAuthenticateUser>
            <ForgetPasswordPage/>
          </RedirectAuthenticateUser>}/>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
