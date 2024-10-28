import instagramIcon from "../../assets/instagram-icon.webp"
import facebookIcon from "../../assets/facebookIcon.webp";

import whatsapIcon from "../../assets/whatsapIcon.jpg";

import logo from "../../assets/logo.jpeg"
import { Link } from "react-router-dom";

const ReadyBidsTopHeader = () => {
  return (
    <div className="flex justify-between sm:mx-12">
      <div className="flex">
        <Link to="#" className="hover:translate-y-1">
          <img src={instagramIcon} className="sm:h-20 h-12 my-4" />
        </Link>
        <Link to="#" className="hover:translate-y-1">
          <img src={facebookIcon} className="sm:h-20 h-12 my-4" />
        </Link>
        <Link to="#" className="hover:translate-y-1">
          <img src={whatsapIcon} className="sm:h-20 h-12 my-4" />
        </Link>
      </div>
      <img src={logo} className="sm:h-24 h-16 my-4 mr-4" />
    </div>
  );
};

export default ReadyBidsTopHeader;
