import { useEffect, useState } from "react";
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./css/App.css";
import Navbar from "./components/Navbar";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import useLoading from "./hooks/useLoading";
import Teaser from "./Pages/Teaser";
import CostumeCusor from "./components/CostumeCusor";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { isLoaded, assetsLoaded, setIsLoaded } = useLoading();
  const [showProceed, setShowProceed] = useState(false);

  useEffect(() => {
    if (assetsLoaded) {
      // Show "Proceed" button after 1 second
      const timer = setTimeout(() => setShowProceed(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [assetsLoaded]);

  // ✅ Ensure we return the LoadingScreen when not loaded
  if (!isLoaded) {
    return <LoadingScreen showProceed={showProceed} setIsLoaded={setIsLoaded} />;
  }

  return (
    <>
      <CostumeCusor />
      <div className="wrapper">
        <BrowserRouter basename="/course_overload/">
          <Navbar />
          <div className="container_main">
            <Routes>
              <Route path="/" element={<Teaser />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
