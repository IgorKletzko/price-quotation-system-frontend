import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageModal from "./ImageModal";

interface ImageCarouselProps {
  images: string[];
  handleRemoveImage?: (index: number) => void;
  showDeleteButtons?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  handleRemoveImage,
  showDeleteButtons,
}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  
     const handleImageClick = () => {
         if (window.innerWidth <= 640) {
           setModalOpen(true);
         }
     };


  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-slick-prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>
          <ArrowRight />
        </span>
      </div>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-slick-next`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>
          <ArrowLeft />
        </span>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: images.length > 1, // Only allow infinite scroll if more than 1 image
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    rtl: true,
    nextArrow: images.length > 0 ? <CustomNextArrow /> : undefined,
    prevArrow: images.length > 0 ? <CustomPrevArrow /> : undefined,
  };

  return (
    <div className="carousel-container w-full px-4">
      <ImageModal
        isOpen={isModalOpen}
        imageSrc={images}
        onClose={() => setModalOpen(false)}
      />
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="rounded-md object-cover h-[250px] sm:h-[600px] w-full block"
                onClick={() => handleImageClick()}
              />
              {showDeleteButtons && handleRemoveImage && (
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No images to display</p>
      )}
    </div>
  );
};

export default ImageCarousel;
