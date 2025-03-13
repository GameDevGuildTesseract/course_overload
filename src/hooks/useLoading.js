import { useEffect, useState } from "react";

function useLoading() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setAssetsLoaded(true);
      // Remove auto-proceed so user must click "Proceed"
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return { 
    isLoaded, 
    assetsLoaded, 
    setIsLoaded // Expose the setter for manual "Proceed" click
  };
}

export default useLoading;