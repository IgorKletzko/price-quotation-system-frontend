import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <div className="flex justify-center items-center mb-10 hover:text-blue-500">
        <ArrowLeft />

        <Link to="/">
          <h1 className="text-2xl text-center">Go Back</h1>
        </Link>
      </div>
    );
}

export default Header;