import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/dashboard" />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
