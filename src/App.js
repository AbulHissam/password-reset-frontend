import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [url, setUrl] = useState("");

  return (
    <div className="app">
      <ToastContainer theme="colored" />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage setUrl={setUrl} url={url} />} />
          <Route
            path="/resetPassword"
            element={<ResetPasswordPage url={url} setUrl={setUrl} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
