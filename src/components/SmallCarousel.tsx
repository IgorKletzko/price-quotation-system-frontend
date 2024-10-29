import React, { useState } from "react";
import Slider from "react-slick";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "./carousel.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselProps {
  images: string[] | undefined;
  slidesToShow?: number;
  responsive?: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll?: number;
    };
  }[];
}

const SmallCarousel: React.FC<CarouselProps> = ({
  images = [],
  slidesToShow = 1,
  responsive = [],
}) => {
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
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: true,
    nextArrow: images.length > 0 ? <CustomNextArrow /> : undefined,
    prevArrow: images.length > 0 ? <CustomPrevArrow /> : undefined,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      ...responsive,
    ],
  };

  return (
    <PhotoProvider>
      <div className="carousel-container mx-auto my-4 w-full max-w-7xl px-6">
        {images.length > 0 ? (
          <Slider {...settings}>
            {images.map((image, index) => (
              <div
                key={index}
                className="carousel-slide flex items-center px-1 justify-center h-[240px] bg-gray-200 rounded-lg shadow-lg"
              >
                <PhotoView src={image}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </PhotoView>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center">No images to display</p>
        )}
      </div>
    </PhotoProvider>
  );
};

export default SmallCarousel;
