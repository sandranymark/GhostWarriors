import "./LazyLoader.css";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface LazyLoaderProps {
  targetPath: string;
  loadingTime?: number; // Simulerad laddningstid i millisekunder
}

const LazyLoader: React.FC<LazyLoaderProps> = ({ targetPath, loadingTime = 2000 }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulera en laddningstid innan navigering
    const timer = setTimeout(() => {
      setLoading(false);
      navigate(targetPath);
    }, loadingTime);

    return () => clearTimeout(timer); // Rensa timer vid unmount
  }, [navigate, targetPath, loadingTime]);

  return (
    <div className="lazy-loader-container">
      {loading && (
        <Oval
          height={80}
          width={80}
          color="rgb(247 144 8)"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="rgb(246, 143, 5)"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </div>
  );
};

export default LazyLoader;

// Författar Adréan
