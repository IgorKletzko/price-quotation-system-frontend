import React from "react";
import ImageCarousel from "./ImageCarousel";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string[];
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose(); // close modal if the overlay (current target) was clicked
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-2 rounded-lg shadow-lg max-w-4xl max-h-full w-full h-4/5 sm:h-auto overflow-auto sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
        >
          X
        </button>
        <ImageCarousel images={imageSrc}/>
        {/* <img
          src={imageSrc}
          alt="Enlarged view"
          className="w-full h-full object-cover sm:object-contain"
        /> */}
      </div>
    </div>
  );
};

export default ImageModal;
