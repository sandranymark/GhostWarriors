import "./LazyLoader.css";
import { Oval } from "react-loader-spinner";

const LazyLoader: React.FC = () => {
  return (
    <div className="lazy-loader-container">
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
    </div>
  );
};

export default LazyLoader;

// Författar Adréan
