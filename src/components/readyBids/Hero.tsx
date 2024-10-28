

import hero from "../../assets/HeroToursSite2.png"
import logo from "../../assets/logo-thailand-sababa1.png"


const Hero = () => {
  return (
    <div className=" sm:-mx-8 -mx-2">
      <img src={hero} className="w-full h-[500px] sm:h-[600px] object-cover" />
      <img
        src={logo}
        className="absolute sm:w-[500px] sm:h-[500px] w-[350px] top-[220px] sm:top-[250px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Hero;
