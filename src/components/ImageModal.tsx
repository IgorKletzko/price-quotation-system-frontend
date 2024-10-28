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
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-full w-full h-full sm:max-w-4xl sm:h-4/5 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
        >
          X
        </button>
        <div className="w-full h-full p-2 sm:p-8 overflow-auto flex justify-center items-center">
          <ImageCarousel images={imageSrc} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
