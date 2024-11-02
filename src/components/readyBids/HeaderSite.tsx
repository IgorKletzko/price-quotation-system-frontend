
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/תאילנד סבבה.png"



const Header = ( ) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Adjust scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      dir="rtl"
      className={`py-2 fixed top-0 left-0 w-full z-20 shadow-lg transition-all duration-300 ${
        scrolled ? "opacity-90 pointer-events-auto bg-white" : "bg-white"
      }`}
    >
      <div
        className="container mx-auto flex justify-start"


      >
        <Link to="/#hero">
          <img
            src={logo}
            alt="logo"
            className="w-32 md:w-44  my-2 md:my-0"
          />
        </Link>

      
       
      </div>
    </div>
  );
};

export default Header;
